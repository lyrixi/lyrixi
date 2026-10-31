import type { ReactNode } from 'react'

export interface KeyboardNumberButtonNumberProps {
  // Style
  className?: string
  // Elements
  children?: ReactNode
  // Events
  onClick?: (value: ReactNode) => void
}
