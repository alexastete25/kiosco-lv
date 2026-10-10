import categoriesJson from './categories.json'
import productsJson from './products.json'
import storeJson from './store.json'
import type { Category, Product, StoreConfig } from '../types'

export const products: Product[] = productsJson
export const categories: Category[] = categoriesJson
export const store: StoreConfig = storeJson
