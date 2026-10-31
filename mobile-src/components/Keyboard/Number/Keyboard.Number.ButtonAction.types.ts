import type { MouseEvent, ReactNode } from 'react'

export interface KeyboardNumberButtonActionProps {
  // Value & Display Value
  id?: string
  // Style
  className?: string
  // Elements
  children?: ReactNode
  // Events
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}
