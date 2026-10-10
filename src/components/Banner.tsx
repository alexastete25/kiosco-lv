import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { StoreBanner } from '../types'

interface BannerProps {
  banners: StoreBanner[]
}

export function Banner({ banners }: BannerProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (banners.length <= 1) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % banners.length)
    }, 4500)
    return () => window.clearInterval(timer)
  }, [banners.length])

  if (banners.length === 0) return null

  const banner = banners[index]
  const gradients = [
    'from-blue-600 via-indigo-600 to-violet-600',
    'from-violet-600 via-fuchsia-600 to-blue-600',
    'from-sky-500 via-blue-600 to-indigo-700',
  ]

  return (
    <section className="relative overflow-hidden rounded-3xl text-white shadow-xl shadow-blue-500/20">
      <div className={`bg-gradient-to-br ${gradients[index % gradients.length]} px-6 py-10 sm:px-10 sm:py-14`}>
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-violet-300/20 blur-2xl" />
        <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-wide backdrop-blur">
          {banner.badge}
        </span>
        <h2 className="mt-3 max-w-lg text-3xl font-black leading-tight sm:text-4xl">{banner.title}</h2>
        <p className="mt-2 max-w-md text-sm text-white/85 sm:text-base">{banner.subtitle}</p>
      </div>

      {banners.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Banner anterior"
            onClick={() => setIndex((current) => (current - 1 + banners.length) % banners.length)}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur hover:bg-white/30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Banner siguiente"
            onClick={() => setIndex((current) => (current + 1) % banners.length)}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur hover:bg-white/30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {banners.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Ir al banner ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
