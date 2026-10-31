import type { CSSProperties, MouseEvent, ReactNode } from 'react'

export interface ModalNavBarModalNavBarRef {
  element: HTMLDivElement | null
}

export interface ModalNavBarModalNavBarProps {
  // Value & Display Value
  id?: string
  okPlacement?: 'left' | 'right'
  cancelPlacement?: 'left' | 'right'
  // Status
  okVisible?: boolean
  cancelVisible?: boolean
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  title?: ReactNode
  ok?: ReactNode
  cancel?: ReactNode
  // Events
  onOk?: (e: MouseEvent<HTMLDivElement>) => void
  onCancel?: (e: MouseEvent<HTMLDivElement>) => void
}
