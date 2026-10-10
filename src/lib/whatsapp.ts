import type { CartItem, CheckoutFormData, StoreConfig } from '../types'
import { formatPlainPrice } from './format'

export function buildWhatsAppMessage(
  items: CartItem[],
  form: CheckoutFormData,
  store: StoreConfig,
): string {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const delivery = form.orderType === 'delivery' ? store.deliveryCost : 0
  const total = subtotal + delivery

  const lines: string[] = [
    '🛒 NUEVO PEDIDO - KIOSCO.LV',
    '',
    `Cliente: ${form.fullName.trim()}`,
    `Teléfono: ${form.phone.trim()}`,
    '',
    'Tipo de pedido:',
    form.orderType === 'delivery' ? 'Envío a domicilio' : 'Retiro en local',
  ]

  if (form.orderType === 'delivery') {
    const addressParts = [form.address.trim(), form.neighborhood.trim()].filter(Boolean)
    lines.push('', 'Dirección:', addressParts.join(' - '))
    if (form.reference.trim()) {
      lines.push(`Referencia: ${form.reference.trim()}`)
    }
  }

  lines.push('', 'Productos:', '')
  for (const item of items) {
    lines.push(`✅ ${item.quantity} x ${item.product.name}`)
  }

  lines.push('', `Subtotal: $${formatPlainPrice(subtotal)}`)
  if (delivery > 0) {
    lines.push(`Envío: $${formatPlainPrice(delivery)}`)
  }
  lines.push(`Total: $${formatPlainPrice(total)}`)

  if (form.paymentMethod) {
    lines.push(
      '',
      'Método de pago:',
      form.paymentMethod === 'cash' ? 'Efectivo' : 'Transferencia',
    )
  }

  if (form.paymentMethod === 'cash' && form.cashAmount.trim()) {
    lines.push('', 'Abona con:', `$${form.cashAmount.trim()}`)
  }

  if (form.notes.trim()) {
    lines.push('', 'Observaciones:', form.notes.trim())
  }

  lines.push('', 'Gracias por elegir Kiosco.lv.')

  return lines.join('\n')
}

export function getWhatsAppUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function openWhatsApp(phone: string, message: string) {
  const url = getWhatsAppUrl(phone, message)
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

  if (isMobile) {
    window.location.href = url
    return
  }

  const popup = window.open(url, '_blank')
  if (!popup) {
    window.location.href = url
  }
}
