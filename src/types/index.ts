export type ProductBadge = 'OFERTA' | 'NUEVO' | 'DESTACADO'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  available: boolean
  featured?: boolean
  bestSeller?: boolean
  badge?: ProductBadge | string
}

export interface Category {
  id: string
  name: string
  emoji: string
}

export interface StoreBanner {
  id: number
  title: string
  subtitle: string
  badge: string
}

export interface StoreConfig {
  storeName: string
  tagline?: string
  whatsapp: string
  address: string
  deliveryCost: number
  minimumOrder: number
  businessHours: string
  banners?: StoreBanner[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export type OrderType = 'pickup' | 'delivery'
export type PaymentMethod = 'cash' | 'transfer'

export interface CheckoutFormData {
  fullName: string
  phone: string
  orderType: OrderType | ''
  address: string
  neighborhood: string
  reference: string
  paymentMethod: PaymentMethod | ''
  cashAmount: string
  notes: string
}
