import type { MapPoint, MapPointCheckHandler } from './Map.common.types'

export interface MapCirclesRef {}

export interface MapCirclesProps {
  // Value & Display Value
  id?: string
  points?: MapPoint[]
  color?: string
  radius?: number
  // Events
  onCheck?: MapPointCheckHandler
}
