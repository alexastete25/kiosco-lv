import { createContext, useContext, type ReactNode } from 'react'
import { useCart } from '../hooks/useCart'
import { useTheme } from '../hooks/useTheme'
import { useToast } from '../hooks/useToast'
import type { Product } from '../types'

type CartApi = ReturnType<typeof useCart>
type ThemeApi = ReturnType<typeof useTheme>
type ToastApi = ReturnType<typeof useToast>

interface AppContextValue {
  cart: CartApi
  theme: ThemeApi
  toast: ToastApi
  addToCart: (product: Product, quantity?: number) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const cart = useCart()
  const theme = useTheme()
  const toast = useToast()

  const addToCart = (product: Product, quantity = 1) => {
    cart.addItem(product, quantity)
    toast.showToast(`${product.name} agregado al carrito`)
  }

  return (
    <AppContext.Provider value={{ cart, theme, toast, addToCart }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const value = useContext(AppContext)
  if (!value) {
    throw new Error('useApp debe usarse dentro de AppProvider')
  }
  return value
}
