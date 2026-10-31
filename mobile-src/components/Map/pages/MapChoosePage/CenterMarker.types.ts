import type { CSSProperties } from 'react'
import type { MapMarkerIcon } from '../../types'

export interface CenterMarkerProps {
  // Value & Display Value
  markerIcon?: MapMarkerIcon
  // Style
  style?: CSSProperties
  className?: string
}
