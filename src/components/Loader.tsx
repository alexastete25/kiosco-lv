export function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-2xl font-black shadow-lg backdrop-blur">
        K
      </div>
      <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/20">
        <div className="loader-bar h-full w-1/2 rounded-full bg-white" />
      </div>
      <p className="mt-4 text-sm font-medium tracking-wide text-white/90">Cargando Kiosco.lv</p>
    </div>
  )
}
