import { Minus, Plus } from 'lucide-react'

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  compact?: boolean
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  compact = false,
}: QuantitySelectorProps) {
  const size = compact ? 'h-8 w-8' : 'h-9 w-9'

  return (
    <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
      <button
        type="button"
        aria-label="Disminuir cantidad"
        className={`${size} flex items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600`}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-6 text-center text-sm font-semibold">{value}</span>
      <button
        type="button"
        aria-label="Aumentar cantidad"
        className={`${size} flex items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600`}
        onClick={() => onChange(value + 1)}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
