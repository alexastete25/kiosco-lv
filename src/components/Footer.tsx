import type { StoreConfig } from '../types'

export function Footer({ store }: { store: StoreConfig }) {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="text-sm font-black text-slate-900 dark:text-white">{store.storeName}</p>
        <p className="mt-1 text-xs text-slate-500">{store.businessHours}</p>
        <p className="mt-1 text-xs text-slate-500">{store.address}</p>
        <p className="mt-4 text-xs text-slate-400">Pedidos por WhatsApp · Sin registro</p>
      </div>
    </footer>
  )
}
