'use client'
import { useRouter } from 'next/navigation'

export default function PedidoConfirmadoPage() {
  const router = useRouter()

  return (
    <main style={{ minHeight: '100vh', background: '#FAF6EE' }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '6rem 2rem',
        textAlign: 'center',
      }}>

        {/* Icono */}
        <div style={{
          width: '64px',
          height: '64px',
          background: '#3D5A30',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '28px',
          color: '#fff',
        }}>
          ✓
        </div>

        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '36px',
          color: '#5C3317',
          marginBottom: '12px',
          lineHeight: 1.1,
        }}>
          ¡Pedido confirmado!
        </h1>

        <p style={{
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontSize: '18px',
          color: '#C4722A',
          marginBottom: '1.5rem',
        }}>
          Sabores de Puente Genil en camino
        </p>

        <div style={{
          width: '40px',
          height: '1px',
          background: '#C4722A',
          margin: '0 auto 1.5rem',
        }} />

        <p style={{
          fontSize: '14px',
          color: '#8A7D6B',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
        }}>
          Gracias por tu pedido. Recibirás un email de confirmación
          con los detalles y el seguimiento del envío.
        </p>

        <button
          onClick={() => router.push('/')}
          style={{
            background: '#5C3317',
            color: '#F5ECD8',
            border: 'none',
            padding: '12px 28px',
            borderRadius: '4px',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            cursor: 'pointer',
          }}
        >
          Volver a la tienda
        </button>

      </div>
    </main>
  )
}