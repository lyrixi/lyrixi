import type { CSSProperties } from 'react'

export interface ToastCloseParams {
  onClose?: () => void
}

export type ToastPlacement = 'top' | 'middle' | 'bottom'

export interface ToastProps {
  // Value & Display Value
  id?: string
  duration?: number
  maskClickable?: boolean
  placement?: ToastPlacement
  content?: string
  // Style
  maskClassName?: string
  maskStyle?: CSSProperties
  modalClassName?: string
  modalStyle?: CSSProperties
  // Elements
  portal?: HTMLElement
  // Events
  onClose?: () => void
}

export interface ToastRef {
  element: HTMLDivElement | null
}
