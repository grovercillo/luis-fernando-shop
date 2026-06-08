import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/shop/AddToCartButton'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (!product) notFound()

  const price = (product.price_cents / 100).toFixed(2).replace('.', ',')

  return (
    <main style={{ minHeight: '100vh', background: '#FAF6EE' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>

        {/* Breadcrumb */}
        <p style={{
          fontSize: '11px',
          color: '#8A7D6B',
          marginBottom: '2rem',
          letterSpacing: '0.08em',
        }}>
          <a href="/" style={{ color: '#C4722A', textDecoration: 'none' }}>Inicio</a>
          {' · '}
          {product.name}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'start',
        }}>

          {/* Imagen */}
          <div style={{
            background: '#F5ECD8',
            borderRadius: '10px',
            overflow: 'hidden',
            aspectRatio: '1',
          }}>
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                color: '#8A7D6B',
                fontStyle: 'italic',
              }}>
                {product.brand}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#8A7D6B',
              marginBottom: '8px',
            }}>
              {product.brand}
            </p>

            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '32px',
              color: '#5C3317',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}>
              {product.name}
            </h1>

            <div style={{
              width: '40px',
              height: '1px',
              background: '#C4722A',
              marginBottom: '16px',
            }} />

            <p style={{
              fontSize: '13px',
              color: '#8A7D6B',
              lineHeight: 1.8,
              marginBottom: '1.5rem',
            }}>
              {product.description}
            </p>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {product.tags?.map((tag: string) => (
                <span key={tag} style={{
                  fontSize: '9px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '3px 10px',
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
              paddingTop: '1.5rem',
              borderTop: '0.5px solid rgba(92,51,23,0.1)',
            }}>
              <span style={{
                fontFamily: 'Georgia, serif',
                fontSize: '36px',
                color: '#5C3317',
              }}>
                {price} €
              </span>

              <AddToCartButton product={product} />
            </div>

            {product.stock <= 5 && product.stock > 0 && (
              <p style={{
                fontSize: '11px',
                color: '#C4722A',
                marginTop: '8px',
                textAlign: 'right',
              }}>
                Solo quedan {product.stock} unidades
              </p>
            )}
          </div>

        </div>
      </div>
    </main>
  )
}