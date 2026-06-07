import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  try {
    const { items } = await request.json()
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No hay productos' }, { status: 400 })
    }

    const supabase = await createClient()
    const ids = items.map((i: { id: string }) => i.id)
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, price_cents, stock, images')
      .in('id', ids)

    if (error || !products) {
      return NextResponse.json({ error: 'Error obteniendo productos' }, { status: 500 })
    }

    const line_items = items.map((item: { id: string; quantity: number }) => {
      const product = products.find(p => p.id === item.id)
      if (!product) throw new Error(`Producto ${item.id} no encontrado`)
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.name,
            images: product.images?.length > 0 ? [product.images[0]] : [],
          },
          unit_amount: product.price_cents,
        },
        quantity: item.quantity,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/pedido-confirmado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/carrito`,
      shipping_address_collection: {
        allowed_countries: [
          'ES', 'FR', 'DE', 'IT', 'PT', 'GB', 'NL', 'BE',
          'US', 'MX', 'AR', 'CO', 'CL', 'PE',
        ],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 595, currency: 'eur' },
            display_name: 'Envío estándar España',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 1490, currency: 'eur' },
            display_name: 'Envío internacional',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 10 },
            },
          },
        },
      ],
      metadata: {
        items: JSON.stringify(items),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Error creando el pago' }, { status: 500 })
  }
}