import { useMemo, useState } from 'react'
import { categories, products } from '../data/catalog'
import { useStore } from '../hooks/useStore'
import { Banner } from '../components/Banner'
import { CartDrawer } from '../components/CartDrawer'
import { CategoryScroller } from '../components/CategoryScroller'
import { FloatingCartButton } from '../components/FloatingCartButton'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { ProductGrid } from '../components/ProductGrid'
import { ProductSection } from '../components/ProductSection'

export function HomePage() {
  const store = useStore()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const [cartOpen, setCartOpen] = useState(false)

  const available = useMemo(() => products.filter((product) => product.available !== false), [])

  const query = search.trim().toLowerCase()

  const searched = useMemo(() => {
    if (!query) return available
    return available.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query),
    )
  }, [available, query])

  const catalog = useMemo(() => {
    if (!category) return searched
    return searched.filter((product) => product.category === category)
  }, [category, searched])

  const featured = available.filter((product) => product.featured)
  const offers = available.filter((product) => product.badge === 'OFERTA')
  const bestSellers = available.filter((product) => product.bestSeller)

  const browsing = !query && !category

  return (
    <div className="min-h-dvh pb-24">
      <Header
        store={store}
        search={search}
        onSearch={setSearch}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="mx-auto max-w-6xl space-y-10 px-4 py-6">
        {browsing && <Banner banners={store.banners ?? []} />}

        <section>
          <h2 className="mb-3 text-xl font-black tracking-tight">Categorías</h2>
          <CategoryScroller categories={categories} selected={category} onSelect={setCategory} />
        </section>

        {query && (
          <section>
            <h2 className="mb-4 text-xl font-black tracking-tight">Resultados para “{search.trim()}”</h2>
            <ProductGrid products={catalog} emptyText="No encontramos productos con esa búsqueda." />
          </section>
        )}

        {!query && browsing && (
          <>
            <ProductSection title="Destacados" subtitle="Lo más pedido de la semana" products={featured} />
            <ProductSection title="Ofertas" subtitle="Precios especiales por tiempo limitado" products={offers} />
            <ProductSection title="Más vendidos" subtitle="Los favoritos del kiosco" products={bestSellers} />
          </>
        )}

        {!query && (
          <section id="catalogo" className="scroll-mt-28">
            <h2 className="mb-1 text-xl font-black tracking-tight">
              {category ? category : 'Catálogo completo'}
            </h2>
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
              {category ? 'Productos de la categoría seleccionada' : 'Todos los productos disponibles'}
            </p>
            <ProductGrid products={catalog} emptyText="No hay productos en esta categoría." />
          </section>
        )}
      </main>

      <Footer store={store} />
      <FloatingCartButton onOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} store={store} />
    </div>
  )
}
