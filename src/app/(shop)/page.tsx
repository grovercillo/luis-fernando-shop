import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/shop/ProductCard'

export default async function HomePage() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('created_at')

  if (error) console.error(error)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--pergamino)' }}>

      {/* Hero */}
      <section style={{
        background: 'var(--tierra)',
        padding: '4rem 2rem',
        textAlign: 'center',
        position: 'relative',
      }}>
        <p style={{
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--miel)',
          marginBottom: '12px',
        }}>
          Puente Genil · Córdoba · España
        </p>

        <h1 style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: 'var(--crema)',
          lineHeight: 1.1,
          marginBottom: '12px',
        }}>
          Luis Fernando
        </h1>

        <p style={{
          fontFamily: 'Playfair Display, serif',
          fontStyle: 'italic',
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          color: 'var(--miel)',
          marginBottom: '1.5rem',
        }}>
          Sabores de Puente Genil
        </p>

        <div style={{
          width: '40px',
          height: '1px',
          background: 'var(--membrillo)',
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
            color: 'var(--piedra)',
            marginBottom: '6px',
          }}>
            Selección
          </p>
          <h2 style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: '28px',
            color: 'var(--tierra)',
          }}>
            Nuestros productos
          </h2>
        </div>

        {products && products.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--piedra)' }}>Cargando productos…</p>
        )}

      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '0.5px solid rgba(92,51,23,0.15)',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: '16px',
          color: 'var(--tierra)',
          marginBottom: '4px',
        }}>
          Luis Fernando
        </p>
        <p style={{
          fontSize: '11px',
          color: 'var(--piedra)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Sabores de Puente Genil · Instagram @confiteriamiragenil
        </p>
      </footer>

    </main>
  )
}