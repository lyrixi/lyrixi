import type { MouseEvent, ReactNode } from 'react'

export interface ModalNavBarModalOkProps {
  // Value & Display Value
  id?: string
  total?: number
  // Elements
  children?: ReactNode
  // Events
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}
