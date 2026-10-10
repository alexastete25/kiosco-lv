import { ShoppingBag } from 'lucide-react'
import { formatPrice } from '../lib/format'
import { useApp } from '../context/AppContext'

interface FloatingCartButtonProps {
  onOpen: () => void
}

export function FloatingCartButton({ onOpen }: FloatingCartButtonProps) {
  const { cart } = useApp()

  if (cart.itemCount === 0) return null

  return (
    <button
      type="button"
      onClick={onOpen}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-white shadow-2xl shadow-blue-500/40 sm:left-auto sm:right-6 sm:translate-x-0"
    >
      <span className="relative">
        <ShoppingBag className="h-5 w-5" />
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-whatsapp text-[10px] font-bold">
          {cart.itemCount}
        </span>
      </span>
      <span className="text-sm font-bold">Ver carrito</span>
      <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-black">{formatPrice(cart.subtotal)}</span>
    </button>
  )
}
