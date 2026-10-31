import type { CSSProperties, ReactNode } from 'react'

export interface SelectorItemProps {
  // Value & Display Value
  id?: string
  // Status
  disabled?: boolean
  checked?: boolean
  // Style
  className?: string
  style?: CSSProperties
  // Elements
  children?: ReactNode
  // Events
  onChange?: (checked: boolean) => void
}

export type SelectorItemRef = {
  element: HTMLDivElement | null
  inputElement: HTMLInputElement | null
}
