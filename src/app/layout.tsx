import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Luis Fernando · Sabores de Puente Genil',
  description: 'Productos artesanales de pequeños productores de Puente Genil, Córdoba. Aceite, membrillo y aceitunas enviados a todo el mundo.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}

function Nav() {
  return (
    <nav style={{
      background: 'var(--pergamino)',
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
        fontFamily: 'DM Serif Display, serif',
        fontSize: '18px',
        color: 'var(--tierra)',
        textDecoration: 'none',
      }}>
        Luis Fernando
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <a href="/" style={{
          fontSize: '13px',
          color: 'var(--piedra)',
          textDecoration: 'none',
          fontWeight: 500,
        }}>
          Productos
        </a>
        <a href="/carrito" style={{
          fontSize: '13px',
          color: 'var(--tierra)',
          textDecoration: 'none',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          Carrito
        </a>
      </div>
    </nav>
  )
}
