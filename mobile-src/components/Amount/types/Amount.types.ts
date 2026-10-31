import type { CSSProperties } from 'react'

export interface AmountProps {
  // Value & Display Value
  id?: string
  precision?: number
  currencySymbol?: string
  // Style
  style?: CSSProperties
  className?: string
  noStyle?: boolean
  // Elements
  children?: number | string
}
