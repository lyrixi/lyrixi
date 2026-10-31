import type { CSSProperties } from 'react'

export interface MapZoomControlProps {
  // Value & Display Value
  id?: string
  // Style
  style?: CSSProperties
  className?: string
  // Events
  onZoomIn?: (zoom: number | null) => void
  onZoomOut?: (zoom: number | null) => void
}

export interface MapZoomControlRef {
  element: HTMLDivElement | null
}
