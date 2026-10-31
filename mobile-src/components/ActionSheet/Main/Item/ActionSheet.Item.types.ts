import type { CSSProperties, MouseEvent, ReactNode } from 'react'

export interface ActionSheetItemProps {
  // Value & Display Value
  id?: string
  // Status
  checked?: boolean
  disabled?: boolean
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  children?: ReactNode
  // Events
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}
