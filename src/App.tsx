import { useEffect, useState } from 'react'
import { AppProvider } from './context/AppContext'
import { Loader } from './components/Loader'
import { BannerSkeleton, CategorySkeleton, ProductSkeleton } from './components/Skeleton'
import { Toast } from './components/Toast'
import { HomePage } from './pages/HomePage'

function BootScreen() {
  const [phase, setPhase] = useState<'loader' | 'skeleton' | 'ready'>('loader')

  useEffect(() => {
    const first = window.setTimeout(() => setPhase('skeleton'), 700)
    const second = window.setTimeout(() => setPhase('ready'), 1300)
    return () => {
      window.clearTimeout(first)
      window.clearTimeout(second)
    }
  }, [])

  if (phase === 'loader') return <Loader />

  if (phase === 'skeleton') {
    return (
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-6">
        <BannerSkeleton />
        <CategorySkeleton />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  return <HomePage />
}

export default function App() {
  return (
    <AppProvider>
      <BootScreen />
      <Toast />
    </AppProvider>
  )
}
