import { Check } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function Toast() {
  const { toast } = useApp()

  if (toast.toasts.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 top-20 z-[70] flex flex-col items-center gap-2 px-4">
      {toast.toasts.map((item) => (
        <div
          key={item.id}
          className="animate-toast flex items-center gap-2 rounded-2xl bg-slate-900/95 px-4 py-3 text-sm font-medium text-white shadow-xl backdrop-blur dark:bg-white dark:text-slate-900"
        >
          <Check className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />
          {item.text}
        </div>
      ))}
    </div>
  )
}
