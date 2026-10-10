import type { Category } from '../types'

interface CategoryScrollerProps {
  categories: Category[]
  selected: string | null
  onSelect: (name: string | null) => void
}

export function CategoryScroller({ categories, selected, onSelect }: CategoryScrollerProps) {
  return (
    <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`flex h-20 w-24 shrink-0 flex-col items-center justify-center rounded-2xl border text-sm font-semibold transition ${
          selected === null
            ? 'border-transparent bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/25'
            : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
        }`}
      >
        <span className="text-lg">✨</span>
        Todas
      </button>
      {categories.map((category) => {
        const active = selected === category.name
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(active ? null : category.name)}
            className={`flex h-20 w-24 shrink-0 flex-col items-center justify-center rounded-2xl border px-2 text-center text-xs font-semibold transition ${
              active
                ? 'border-transparent bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/25'
                : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
            }`}
          >
            <span className="text-lg">{category.emoji}</span>
            <span className="mt-1 line-clamp-2 leading-tight">{category.name}</span>
          </button>
        )
      })}
    </div>
  )
}
