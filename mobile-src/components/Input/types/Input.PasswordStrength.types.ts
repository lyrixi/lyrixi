import type { CSSProperties } from 'react'

export interface InputPasswordStrengthRef {
  element: HTMLUListElement | null
  getStrength: (newValue?: string) => number
}

export interface InputPasswordStrengthProps {
  // Value & Display Value
  id?: string
  value?: string
  // Style
  className?: string
  style?: CSSProperties
}
