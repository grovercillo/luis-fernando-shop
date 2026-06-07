'use client'

import { useCartStore } from '@/lib/cart-store'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) return null

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            id: i.id,
            quantity: i.quantity,
            price_cents: i.price_cents,
          })),
        }),
      })

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error en checkout:', error)
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <main style={{ minHeight: '100vh', background: '#FAF6EE' }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '4rem 2rem',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '28px',
            color: '#5C3317',
            marginBottom: '12px',
          }}>
            Tu carrito está vacío
          </h1>
          <p style={{ color: '#8A7D6B', marginBottom: '2rem' }}>
            Añade algún producto para continuar
          </p>
          <button
            onClick={() => router.push('/')}
            style={{
              background: '#5C3317',
              color: '#F5ECD8',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 24px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Ver productos
          </button>
        </div>
      </main>
    )
  }

  const totalEur = (total() / 100).toFixed(2).replace('.', ',')

  return (
    <main style={{ minHeight: '100vh', background: '#FAF6EE' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 2rem' }}>

        <div style={{ marginBottom: '2rem' }}>
          <p style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#8A7D6B',
            marginBottom: '6px',
          }}>
            Tu selección
          </p>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '32px',
            color: '#5C3317',
          }}>
            Carrito
          </h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
          {items.map(item => {
            const itemPrice = (item.price_cents / 100).toFixed(2).replace('.', ',')
            const itemTotal = ((item.price_cents * item.quantity) / 100).toFixed(2).replace('.', ',')

            return (
              <div key={item.id} style={{
                background: '#FDFAF5',
                border: '0.5px solid rgba(92,51,23,0.15)',
                borderRadius: '10px',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>

                <div style={{
                  width: '64px',
                  height: '64px',
                  background: '#F5ECD8',
                  borderRadius: '6px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: '#8A7D6B',
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}>
                  {item.brand.split(' ')[0]}
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#8A7D6B',
                    marginBottom: '2px',
                  }}>
                    {item.brand}
                  </p>
                  <p style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '16px',
                    color: '#5C3317',
                  }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: '12px', color: '#8A7D6B', marginTop: '2px' }}>
                    {itemPrice} € × {item.quantity} = {itemTotal} €
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      width: '28px', height: '28px',
                      border: '0.5px solid rgba(92,51,23,0.3)',
                      borderRadius: '4px',
                      background: 'transparent',
                      color: '#5C3317',
                      fontSize: '16px',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    −
                  </button>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1209', minWidth: '20px', textAlign: 'center' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      width: '28px', height: '28px',
                      border: '0.5px solid rgba(92,51,23,0.3)',
                      borderRadius: '4px',
                      background: 'transparent',
                      color: '#5C3317',
                      fontSize: '16px',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#8A7D6B',
                    cursor: 'pointer',
                    fontSize: '18px',
                    padding: '4px',
                  }}
                >
                  ×
                </button>

              </div>
            )
          })}
        </div>

        <div style={{
          background: '#FDFAF5',
          border: '0.5px solid rgba(92,51,23,0.15)',
          borderRadius: '10px',
          padding: '1.5rem',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            paddingBottom: '1rem',
            borderBottom: '0.5px solid rgba(92,51,23,0.1)',
          }}>
            <span style={{ fontSize: '13px', color: '#8A7D6B' }}>Subtotal</span>
            <span style={{
              fontFamily: 'Georgia, serif',
              fontSize: '24px',
              color: '#5C3317',
            }}>
              {totalEur} €
            </span>
          </div>

          <p style={{ fontSize: '11px', color: '#8A7D6B', marginBottom: '1rem' }}>
            Los gastos de envío se calculan en el siguiente paso
          </p>

          <button
            onClick={handleCheckout}
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#8A7D6B' : '#5C3317',
              color: '#F5ECD8',
              border: 'none',
              borderRadius: '4px',
              padding: '14px',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.06em',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Redirigiendo a Stripe…' : 'Proceder al pago →'}
          </button>

          <button
            onClick={() => router.push('/')}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: '#C4722A',
              fontSize: '12px',
              cursor: 'pointer',
              padding: '10px',
              marginTop: '8px',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            ← Seguir comprando
          </button>
        </div>

      </div>
    </main>
  )
}