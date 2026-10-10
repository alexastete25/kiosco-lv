import { useMemo, useRef, useState } from 'react'
import { Trash2, X } from 'lucide-react'
import type { CheckoutFormData, StoreConfig } from '../types'
import { formatPrice } from '../lib/format'
import { buildWhatsAppMessage, getWhatsAppUrl, openWhatsApp } from '../lib/whatsapp'
import { useApp } from '../context/AppContext'
import { CheckoutForm } from './CheckoutForm'
import { QuantitySelector } from './QuantitySelector'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  store: StoreConfig
}

const emptyForm: CheckoutFormData = {
  fullName: '',
  phone: '',
  orderType: '',
  address: '',
  neighborhood: '',
  reference: '',
  paymentMethod: '',
  cashAmount: '',
  notes: '',
}

export function CartDrawer({ open, onClose, store }: CartDrawerProps) {
  const { cart, toast } = useApp()
  const [form, setForm] = useState<CheckoutFormData>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({})
  const formRef = useRef<HTMLDivElement>(null)

  const delivery = form.orderType === 'delivery' ? store.deliveryCost : 0
  const total = cart.subtotal + delivery

  const validate = () => {
    const next: Partial<Record<keyof CheckoutFormData, string>> = {}
    if (!form.fullName.trim()) next.fullName = 'Ingresá tu nombre'
    if (!form.phone.trim()) next.phone = 'Ingresá tu teléfono'
    if (!form.orderType) next.orderType = 'Seleccioná el tipo de pedido'
    if (form.orderType === 'delivery' && !form.address.trim()) {
      next.address = 'Ingresá la dirección'
    }
    if (store.minimumOrder > 0 && cart.subtotal < store.minimumOrder) {
      next.fullName = `El pedido mínimo es ${formatPrice(store.minimumOrder)}`
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSend = () => {
    if (cart.items.length === 0) {
      toast.showToast('El carrito está vacío')
      return
    }
    if (!validate()) {
      toast.showToast('Completá los datos del pedido')
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    const message = buildWhatsAppMessage(cart.items, form, store)
    openWhatsApp(store.whatsapp, message)
  }

  const summary = useMemo(
    () => (
      <div className="space-y-2 rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-800">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold">{formatPrice(cart.subtotal)}</span>
        </div>
        {form.orderType === 'delivery' && (
          <div className="flex justify-between text-slate-600 dark:text-slate-300">
            <span>Envío</span>
            <span>{formatPrice(store.deliveryCost)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-black dark:border-slate-700">
          <span>Total</span>
          <span className="text-blue-600 dark:text-blue-400">{formatPrice(total)}</span>
        </div>
      </div>
    ),
    [cart.subtotal, form.orderType, store.deliveryCost, total],
  )

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={onClose} />
      <aside className="absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col rounded-t-3xl bg-white shadow-2xl sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:w-full sm:max-w-md sm:rounded-none dark:bg-slate-950">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-black">Tu carrito</h2>
            <p className="text-xs text-slate-500">{cart.itemCount} artículo(s)</p>
          </div>
          <div className="flex items-center gap-2">
            {cart.items.length > 0 && (
              <button
                type="button"
                onClick={cart.clearCart}
                className="rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
              >
                Vaciar
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar carrito"
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
          {cart.items.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-500">Tu carrito está vacío.</p>
          ) : (
            <ul className="space-y-3">
              {cart.items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex gap-3 rounded-2xl border border-slate-100 p-3 dark:border-slate-800"
                >
                  <img
                    src={item.product.image}
                    alt=""
                    className="h-16 w-16 rounded-xl object-cover"
                    onError={(event) => {
                      event.currentTarget.src = '/images/placeholder.svg'
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{item.product.name}</p>
                    <p className="text-xs text-slate-500">{formatPrice(item.product.price)}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <QuantitySelector
                        compact
                        min={0}
                        value={item.quantity}
                        onChange={(value) => cart.setQuantity(item.product.id, value)}
                      />
                      <span className="text-sm font-bold">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Eliminar producto"
                    onClick={() => cart.removeItem(item.product.id)}
                    className="self-start rounded-xl p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {summary}

          <div ref={formRef}>
            <h3 className="mb-3 text-sm font-black">Datos del pedido</h3>
            <CheckoutForm form={form} onChange={setForm} errors={errors} />
          </div>
        </div>

        <div className="border-t border-slate-100 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:border-slate-800">
          <a
            href={
              cart.items.length > 0
                ? getWhatsAppUrl(store.whatsapp, buildWhatsAppMessage(cart.items, form, store))
                : undefined
            }
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              event.preventDefault()
              handleSend()
            }}
            className="flex w-full items-center justify-center rounded-2xl bg-whatsapp py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-whatsapp-dark"
          >
            Enviar Pedido por WhatsApp
          </a>
        </div>
      </aside>
    </div>
  )
}
