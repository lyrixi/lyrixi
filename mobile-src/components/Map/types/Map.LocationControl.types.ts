import type { CSSProperties } from 'react'

export interface MapLocationControlProps {
  // Value & Display Value
  id?: string
  // Style
  style?: CSSProperties
  className?: string
  // Events
  onChange?: (result: unknown) => void
}

export interface MapLocationControlRef {
  element: HTMLDivElement | null
  update: () => Promise<unknown>
}
