import type { CheckoutFormData } from '../types'

interface CheckoutFormProps {
  form: CheckoutFormData
  onChange: (form: CheckoutFormData) => void
  errors: Partial<Record<keyof CheckoutFormData, string>>
}

export function CheckoutForm({ form, onChange, errors }: CheckoutFormProps) {
  const update = <K extends keyof CheckoutFormData>(key: K, value: CheckoutFormData[K]) => {
    onChange({ ...form, [key]: value })
  }

  const fieldClass =
    'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800'

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
          Nombre completo
        </label>
        <input
          value={form.fullName}
          onChange={(event) => update('fullName', event.target.value)}
          className={fieldClass}
          placeholder="Ej: Ana Pérez"
        />
        {errors.fullName && <p className="mt-1 text-xs text-rose-500">{errors.fullName}</p>}
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">Teléfono</label>
        <input
          value={form.phone}
          onChange={(event) => update('phone', event.target.value)}
          className={fieldClass}
          placeholder="Ej: 11 5555 5555"
          inputMode="tel"
        />
        {errors.phone && <p className="mt-1 text-xs text-rose-500">{errors.phone}</p>}
      </div>

      <fieldset>
        <legend className="mb-2 text-xs font-semibold text-slate-600 dark:text-slate-300">Tipo de pedido</legend>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'pickup', label: 'Retiro en local' },
            { value: 'delivery', label: 'Envío a domicilio' },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center gap-2 rounded-2xl border px-3 py-3 text-sm font-medium ${
                form.orderType === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                  : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
              }`}
            >
              <input
                type="radio"
                name="orderType"
                checked={form.orderType === option.value}
                onChange={() => update('orderType', option.value as CheckoutFormData['orderType'])}
              />
              {option.label}
            </label>
          ))}
        </div>
        {errors.orderType && <p className="mt-1 text-xs text-rose-500">{errors.orderType}</p>}
      </fieldset>

      {form.orderType === 'delivery' && (
        <div className="space-y-3 rounded-2xl border border-blue-100 bg-blue-50/50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
          <div>
            <label className="mb-1 block text-xs font-semibold">Dirección</label>
            <input
              value={form.address}
              onChange={(event) => update('address', event.target.value)}
              className={fieldClass}
              placeholder="Calle y número"
            />
            {errors.address && <p className="mt-1 text-xs text-rose-500">{errors.address}</p>}
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold">Barrio</label>
            <input
              value={form.neighborhood}
              onChange={(event) => update('neighborhood', event.target.value)}
              className={fieldClass}
              placeholder="Barrio"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold">Referencia (opcional)</label>
            <input
              value={form.reference}
              onChange={(event) => update('reference', event.target.value)}
              className={fieldClass}
              placeholder="Timbre, piso, color de la casa"
            />
          </div>
        </div>
      )}

      <fieldset>
        <legend className="mb-2 text-xs font-semibold text-slate-600 dark:text-slate-300">Método de pago</legend>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'cash', label: 'Efectivo' },
            { value: 'transfer', label: 'Transferencia' },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center gap-2 rounded-2xl border px-3 py-3 text-sm font-medium ${
                form.paymentMethod === option.value
                  ? 'border-whatsapp bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300'
                  : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={form.paymentMethod === option.value}
                onChange={() => update('paymentMethod', option.value as CheckoutFormData['paymentMethod'])}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      {form.paymentMethod === 'cash' && (
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">Abono con</label>
          <input
            value={form.cashAmount}
            onChange={(event) => update('cashAmount', event.target.value)}
            className={fieldClass}
            placeholder="Ej: 10000"
            inputMode="numeric"
          />
        </div>
      )}

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
          Observaciones
        </label>
        <textarea
          value={form.notes}
          onChange={(event) => update('notes', event.target.value)}
          className={`${fieldClass} min-h-24 resize-none`}
          placeholder="Preparar para las 20 hs, llamar al llegar, no reemplazar productos..."
        />
      </div>
    </div>
  )
}
