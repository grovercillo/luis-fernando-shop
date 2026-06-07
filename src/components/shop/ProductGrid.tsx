'use client'

import ProductCard from './ProductCard'

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

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.5rem',
    }}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}