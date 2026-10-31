import type React from 'react'

export interface AccordionGroupRef {
  element: HTMLDivElement | null
  getActiveIndex: () => number | null | undefined
  openIndex: (index: number) => void
  close: () => void
}

export interface AccordionGroupProps {
  // Value & Display Value
  id?: string
  value?: number | null
  // Style
  style?: React.CSSProperties
  className?: string
  // Elements
  children?: React.ReactNode
  // Events
  onChange?: (index: number | null) => void
}
