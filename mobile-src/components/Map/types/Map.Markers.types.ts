import type { CSSProperties } from 'react'
import type { MapPointCheckHandler } from './Map.common.types'

export interface MapMarkersProps {
  // Value & Display Value
  id?: string
  points?: unknown
  // Style
  style?: CSSProperties
  className?: string
  // Events
  onCheck?: MapPointCheckHandler
}

export interface MapMarkersRef {}
