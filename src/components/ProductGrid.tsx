import type { Product } from '../types'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  emptyText?: string
}

export function ProductGrid({ products, emptyText = 'No hay productos para mostrar.' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
        {emptyText}
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${index * 40}ms` }}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
