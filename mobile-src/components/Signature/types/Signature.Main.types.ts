import type { CSSProperties } from 'react'

export interface SignatureMainProps {
  // Value & Display Value
  id?: string
  color?: string
  backgroundColor?: string
  // Style
  style?: CSSProperties
  // Events
  onChange?: (base64: string | null) => void
  onCancel?: () => void
}

export interface SignatureMainRef {
  element: HTMLDivElement | null
  getBase64?: (() => Promise<string | null>) | undefined
  clear?: (() => void) | undefined
}
