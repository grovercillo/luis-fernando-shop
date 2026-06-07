import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/shop/NavBar'

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
        <NavBar />
        {children}
      </body>
    </html>
  )
}