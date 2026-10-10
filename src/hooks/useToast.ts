import { useCallback, useState } from 'react'

export interface ToastMessage {
  id: number
  text: string
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback((text: string) => {
    const id = Date.now() + Math.random()
    setToasts((current) => [...current, { id, text }])
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 2200)
  }, [])

  return { toasts, showToast }
}
