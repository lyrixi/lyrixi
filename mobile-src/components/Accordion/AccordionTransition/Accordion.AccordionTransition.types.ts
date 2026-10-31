import type { ReactNode } from 'react'

export interface AccordionTransitionProps {
  // Value & Display Value
  minHeight?: number
  // Status
  open: boolean
  // Elements
  children?: ReactNode
}
