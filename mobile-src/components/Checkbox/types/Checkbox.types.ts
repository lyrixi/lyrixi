import type { CSSProperties, ReactNode } from 'react'

export interface CheckboxRef {
  element: HTMLDivElement | null
}

export interface CheckboxProps {
  // Value & Display Value
  id?: string
  variant?: string
  iconPlacement?: 'left' | 'right'
  // Status
  checked?: boolean
  readOnly?: boolean
  disabled?: boolean
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  children?: ReactNode
  iconRender?: (options: { checked?: boolean }) => ReactNode
  // Events
  onChange?: (checked: boolean) => void
}
