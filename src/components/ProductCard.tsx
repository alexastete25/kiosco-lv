import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import type { Product } from '../types'
import { formatPrice } from '../lib/format'
import { useApp } from '../context/AppContext'
import { QuantitySelector } from './QuantitySelector'

const badgeStyles: Record<string, string> = {
  OFERTA: 'bg-rose-500 text-white',
  NUEVO: 'bg-blue-500 text-white',
  DESTACADO: 'bg-violet-500 text-white',
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useApp()
  const [quantity, setQuantity] = useState(1)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.src = '/images/placeholder.svg'
          }}
        />
        {product.badge && (
          <span
            className={`absolute left-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-wide ${
              badgeStyles[product.badge] ?? 'bg-slate-900 text-white'
            }`}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-sm font-bold text-slate-900 dark:text-white">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">{product.description}</p>
        <p className="mt-2 text-lg font-black text-blue-600 dark:text-blue-400">{formatPrice(product.price)}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
          <QuantitySelector compact value={quantity} onChange={setQuantity} />
          <button
            type="button"
            onClick={() => addToCart(product, quantity)}
            className="inline-flex items-center justify-center gap-1 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition hover:brightness-110"
          >
            <ShoppingBag className="h-4 w-4" />
            Agregar
          </button>
        </div>
      </div>
    </article>
  )
}
