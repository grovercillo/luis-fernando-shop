import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature error:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const supabase = await createClient()

    try {
      const items = JSON.parse(session.metadata?.items || '[]')
      const shipping = session.shipping_cost?.amount_total || 0
      const address = session.customer_details?.address

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          status: 'paid',
          stripe_payment_id: session.payment_intent as string,
          total_cents: session.amount_total!,
          shipping_cost_cents: shipping,
          shipping_address: {
            name: session.customer_details?.name,
            line1: address?.line1,
            city: address?.city,
            country: address?.country,
            postal_code: address?.postal_code,
          },
        })
        .select()
        .single()

      if (orderError || !order) throw orderError

      for (const item of items) {
        await supabase.from('order_items').insert({
          order_id: order.id,
          product_id: item.id,
          quantity: item.quantity,
          unit_price_cents: item.price_cents,
        })
        await supabase.rpc('decrement_stock', {
          product_id: item.id,
          amount: item.quantity,
        })
      }

      console.log('Pedido creado:', order.id)
    } catch (error) {
      console.error('Error procesando pedido:', error)
      return NextResponse.json({ error: 'Error procesando pedido' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}