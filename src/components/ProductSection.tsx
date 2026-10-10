import type { Product } from '../types'
import { ProductGrid } from './ProductGrid'

interface ProductSectionProps {
  id?: string
  title: string
  subtitle?: string
  products: Product[]
}

export function ProductSection({ id, title, subtitle, products }: ProductSectionProps) {
  if (products.length === 0) return null

  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-4">
        <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      <ProductGrid products={products} />
    </section>
  )
}
