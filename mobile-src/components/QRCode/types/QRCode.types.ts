import type { CSSProperties, ReactNode } from 'react'

export interface QRCodeProps {
  // Value & Display Value
  id?: string
  text?: string
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  children?: ReactNode
}

export interface QRCodeRef {
  element: HTMLSpanElement | null
}
