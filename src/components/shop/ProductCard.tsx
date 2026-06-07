'use client'

import { useCartStore } from '@/lib/cart-store'

type Product = {
  id: string
  slug: string
  name: string
  brand: string
  description: string
  price_cents: number
  stock: number
  tags: string[]
  images: string[]
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore(state => state.addItem)
  const items = useCartStore(state => state.items)
  const cartItem = items.find(i => i.id === product.id)

  const price = (product.price_cents / 100).toFixed(2).replace('.', ',')
  const inStock = product.stock > 0

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price_cents: product.price_cents,
      quantity: 1,
      image: product.images?.[0],
    })
  }

  return (
    <article style={{
      background: '#FDFAF5',
      border: '0.5px solid rgba(92,51,23,0.15)',
      borderRadius: '10px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Imagen placeholder */}
      <div style={{
        background: '#F5ECD8',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '0.5px solid rgba(92,51,23,0.1)',
      }}>
        <span style={{
          fontFamily: 'Georgia, serif',
          fontSize: '14px',
          color: '#8A7D6B',
          fontStyle: 'italic',
        }}>
          {product.brand}
        </span>
      </div>

      {/* Contenido */}
      <div style={{
        padding: '1.25rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>

        <p style={{
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#8A7D6B',
        }}>
          {product.brand}
        </p>

        <h2 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '18px',
          color: '#5C3317',
          lineHeight: 1.2,
        }}>
          {product.name}
        </h2>

        <p style={{
          fontSize: '12px',
          color: '#8A7D6B',
          lineHeight: 1.6,
          flex: 1,
        }}>
          {product.description?.slice(0, 100)}...
        </p>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {product.tags?.map(tag => (
            <span key={tag} style={{
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '2px 8px',
              borderRadius: '20px',
              background: '#F5ECD8',
              color: '#5C3317',
              border: '0.5px solid rgba(92,51,23,0.2)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '8px',
          paddingTop: '12px',
          borderTop: '0.5px solid rgba(92,51,23,0.1)',
        }}>
          <span style={{
            fontFamily: 'Georgia, serif',
            fontSize: '22px',
            color: '#5C3317',
          }}>
            {price} €
          </span>

          {cartItem ? (
            <span style={{
              fontSize: '12px',
              color: '#C4722A',
              fontWeight: 500,
            }}>
              ✓ En carrito ({cartItem.quantity})
            </span>
          ) : (
            <button
              onClick={handleAdd}
              disabled={!inStock}
              style={{
                background: inStock ? '#5C3317' : '#8A7D6B',
                color: '#F5ECD8',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.06em',
                cursor: inStock ? 'pointer' : 'not-allowed',
              }}
            >
              {inStock ? 'Añadir al carrito' : 'Sin stock'}
            </button>
          )}
        </div>

      </div>
    </article>
  )
}