import type { CSSProperties } from 'react'

export interface SignatureModalProps {
  // Value & Display Value
  id?: string
  value?: string
  // Status
  open?: boolean
  // Style
  modalClassName?: string
  modalStyle?: CSSProperties
  // Elements
  portal?: Element
  color?: string
  backgroundColor?: string
  // Events
  onChange?: (base64: string | null) => void
  onOpen?: () => void
  onClose?: () => void
}

export interface SignatureModalRef {
  modalElement: HTMLElement | null
}
