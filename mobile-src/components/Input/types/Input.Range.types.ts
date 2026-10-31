import type { CSSProperties } from 'react'

export interface InputRangeRef {
  element: HTMLDivElement | null
  inputElement: HTMLInputElement | null
}

export interface InputRangeProps {
  id?: string
  name?: string
  // Value & Display Value
  value?: number
  // Status
  readOnly?: boolean
  disabled?: boolean
  // Style
  className?: string
  style?: CSSProperties
  min?: number
  max?: number
  step?: number
  // Events
  onChange?: (value: number) => void
}
