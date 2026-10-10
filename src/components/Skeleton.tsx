export function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="skeleton aspect-square rounded-2xl" />
      <div className="mt-3 space-y-2">
        <div className="skeleton h-4 w-3/4 rounded-full" />
        <div className="skeleton h-3 w-1/2 rounded-full" />
        <div className="skeleton h-5 w-1/3 rounded-full" />
        <div className="skeleton mt-3 h-10 w-full rounded-2xl" />
      </div>
    </div>
  )
}

export function BannerSkeleton() {
  return <div className="skeleton h-40 w-full rounded-3xl sm:h-52" />
}

export function CategorySkeleton() {
  return (
    <div className="flex gap-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="skeleton h-20 w-24 shrink-0 rounded-2xl" />
      ))}
    </div>
  )
}
