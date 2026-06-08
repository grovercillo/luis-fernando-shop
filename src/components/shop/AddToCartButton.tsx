'use client'

import { useCartStore } from '@/lib/cart-store'

type Product = {
  id: string
  name: string
  brand: string
  price_cents: number
  stock: number
  images: string[]
}

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore(state => state.addItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const items = useCartStore(state => state.items)
  const cartItem = items.find(i => i.id === product.id)

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

  if (!inStock) {
    return (
      <button disabled style={{
        background: '#8A7D6B',
        color: '#F5ECD8',
        border: 'none',
        borderRadius: '4px',
        padding: '12px 24px',
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'not-allowed',
      }}>
        Sin stock
      </button>
    )
  }

  if (cartItem) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
          style={{
            width: '36px', height: '36px',
            border: '0.5px solid rgba(92,51,23,0.3)',
            borderRadius: '4px',
            background: 'transparent',
            color: '#5C3317',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >−</button>
        <span style={{
          fontFamily: 'Georgia, serif',
          fontSize: '20px',
          fontWeight: 500,
          color: '#5C3317',
          minWidth: '24px',
          textAlign: 'center',
        }}>
          {cartItem.quantity}
        </span>
        <button
          onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
          style={{
            width: '36px', height: '36px',
            border: '0.5px solid rgba(92,51,23,0.3)',
            borderRadius: '4px',
            background: 'transparent',
            color: '#5C3317',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >+</button>
        <a href="/carrito" style={{
          background: '#C4722A',
          color: '#F5ECD8',
          border: 'none',
          borderRadius: '4px',
          padding: '12px 20px',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.06em',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          Ver carrito →
        </a>
      </div>
    )
  }

  return (
    <button
      onClick={handleAdd}
      style={{
        background: '#5C3317',
        color: '#F5ECD8',
        border: 'none',
        borderRadius: '4px',
        padding: '12px 24px',
        fontSize: '13px',
        fontWeight: 500,
        letterSpacing: '0.06em',
        cursor: 'pointer',
      }}
    >
      Añadir al carrito
    </button>
  )
}