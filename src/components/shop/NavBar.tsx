'use client'
import { useCartStore } from '@/lib/cart-store'

export default function NavBar() {
  const items = useCartStore(state => state.items)
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <nav style={{
      background: '#FAF6EE',
      borderBottom: '0.5px solid rgba(92,51,23,0.15)',
      padding: '0 2rem',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <a href="/" style={{
        fontFamily: 'Georgia, serif',
        fontSize: '18px',
        color: '#5C3317',
        textDecoration: 'none',
      }}>
        Luis Fernando
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <a href="/" style={{
          fontSize: '13px',
          color: '#8A7D6B',
          textDecoration: 'none',
          fontWeight: 500,
        }}>
          Productos
        </a>
        <a href="/carrito" style={{
          fontSize: '13px',
          color: '#5C3317',
          textDecoration: 'none',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          Carrito
          {totalItems > 0 && (
            <span style={{
              background: '#C4722A',
              color: '#fff',
              fontSize: '10px',
              fontWeight: 600,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {totalItems}
            </span>
          )}
        </a>
      </div>
    </nav>
  )
}