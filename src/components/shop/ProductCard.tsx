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

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const price = (product.price_cents / 100).toFixed(2).replace('.', ',')
  const inStock = product.stock > 0

  return (
    <article style={{
      background: 'var(--blanco)',
      border: '0.5px solid rgba(92,51,23,0.15)',
      borderRadius: '10px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Imagen placeholder */}
      <div style={{
        background: 'var(--crema)',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '0.5px solid rgba(92,51,23,0.1)',
      }}>
        <span style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: '14px',
          color: 'var(--piedra)',
          fontStyle: 'italic',
        }}>
          {product.brand}
        </span>
      </div>

      {/* Contenido */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>

        {/* Marca */}
        <p style={{
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--piedra)',
        }}>
          {product.brand}
        </p>

        {/* Nombre */}
        <h2 style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: '18px',
          color: 'var(--tierra)',
          lineHeight: 1.2,
        }}>
          {product.name}
        </h2>

        {/* Descripción */}
        <p style={{
          fontSize: '12px',
          color: 'var(--piedra)',
          lineHeight: 1.6,
          flex: 1,
        }}>
          {product.description?.slice(0, 100)}…
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {product.tags?.map(tag => (
            <span key={tag} style={{
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '2px 8px',
              borderRadius: '20px',
              background: 'var(--crema)',
              color: 'var(--tierra)',
              border: '0.5px solid rgba(92,51,23,0.2)',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Precio y botón */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '8px',
          paddingTop: '12px',
          borderTop: '0.5px solid rgba(92,51,23,0.1)',
        }}>
          <span style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: '22px',
            color: 'var(--tierra)',
          }}>
            {price} €
          </span>

          <button
            disabled={!inStock}
            style={{
              background: inStock ? 'var(--tierra)' : 'var(--piedra)',
              color: 'var(--crema)',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.06em',
              cursor: inStock ? 'pointer' : 'not-allowed',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            {inStock ? 'Añadir al carrito' : 'Sin stock'}
          </button>
        </div>

      </div>
    </article>
  )
}