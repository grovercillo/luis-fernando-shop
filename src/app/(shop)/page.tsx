import { createClient } from '@/lib/supabase/server'
import ProductGrid from '@/components/shop/ProductGrid'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('created_at')

  if (error) console.error(error)

  return (
    <main style={{ minHeight: '100vh', background: '#FAF6EE' }}>

      {/* Hero */}
      <section style={{
        background: '#5C3317',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#E8A84C',
          marginBottom: '12px',
        }}>
          Puente Genil · Córdoba · España
        </p>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: '#F5ECD8',
          lineHeight: 1.1,
          marginBottom: '12px',
        }}>
          Luis Fernando
        </h1>
        <p style={{
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          color: '#E8A84C',
          marginBottom: '1.5rem',
        }}>
          Sabores de Puente Genil
        </p>
        <div style={{
          width: '40px',
          height: '1px',
          background: '#C4722A',
          margin: '0 auto 1.5rem',
        }} />
        <p style={{
          fontSize: '14px',
          color: 'rgba(245,236,216,0.75)',
          maxWidth: '480px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Productos artesanales de pequeños productores locales.
          Seleccionados con criterio, enviados a cualquier rincón del mundo.
        </p>
      </section>

      {/* Catálogo */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <p style={{
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#8A7D6B',
            marginBottom: '6px',
          }}>
            Selección
          </p>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '28px',
            color: '#5C3317',
          }}>
            Nuestros productos
          </h2>
        </div>
        {products && products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p style={{ color: '#8A7D6B' }}>No hay productos disponibles.</p>
        )}
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '0.5px solid rgba(92,51,23,0.15)',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'Georgia, serif',
          fontSize: '16px',
          color: '#5C3317',
          marginBottom: '4px',
        }}>
          Luis Fernando
        </p>
        <p style={{
          fontSize: '11px',
          color: '#8A7D6B',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Sabores de Puente Genil · Instagram @confiteriamiragenil
        </p>
      </footer>

    </main>
  )
}