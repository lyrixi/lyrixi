import type { CSSProperties } from 'react'

export interface SignatureComboAddProps {
  // Value & Display Value
  value?: string
  // Style
  className?: string
  style?: CSSProperties
  modalClassName?: string
  modalStyle?: CSSProperties
  // Elements
  color?: string
  backgroundColor?: string
  // Events
  onChange?: (base64: string | null) => void
}

export interface SignatureComboAddRef {
  element: HTMLDivElement | null
}
