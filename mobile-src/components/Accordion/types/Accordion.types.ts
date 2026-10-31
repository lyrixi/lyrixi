import type React from 'react'

export interface AccordionRef {
  element: HTMLDivElement | null
  open: () => void
  close: () => void
}

export interface AccordionProps {
  // Value & Display Value
  id?: string
  minHeight?: number
  ellipsis?: { expandText?: React.ReactNode; collapseText?: React.ReactNode }
  arrowPlacement?: 'left' | 'right'
  // Status
  open?: boolean
  defaultOpen?: boolean
  // Style
  style?: React.CSSProperties
  headerStyle?: React.CSSProperties
  titleStyle?: React.CSSProperties
  className?: string
  arrowClassName?: string
  // Elements
  title?: React.ReactNode
  headerRender?: (options: { open: boolean; onClick: () => void }) => React.ReactNode
  ellipsisRender?: (options: { open: boolean; onClick: () => void }) => React.ReactNode
  arrowRender?: (options: { open: boolean }) => React.ReactNode
  children?: React.ReactNode
  // Events
  onOpen?: () => void
  onClose?: () => void
}
