import type { MouseEvent } from 'react'

export interface MediaPreviewToolbarProps {
  // Value & Display Value
  id?: string

  // Events
  onRotateAnticlockwise?: (e: MouseEvent) => void
  onRotateClockwise?: (e: MouseEvent) => void
  onZoomOut?: (e: MouseEvent) => void
  onZoomIn?: (e: MouseEvent) => void
}
