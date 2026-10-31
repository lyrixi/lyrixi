import type { CSSProperties, ReactNode } from 'react'
import type { MapPoint, MapPointCheckHandler } from './Map.common.types'
import type { MapContainerAPI, MapContainerProps } from './Map.MapContainer.types'

export interface MapChoosePageProps {
  // Value & Display Value
  id?: string
  value?: MapPoint
  center?: MapPoint
  zoom?: number
  minZoom?: number
  maxZoom?: number
  autoLocation?: boolean
  // Status
  readOnly?: boolean
  nearbyVisible?: boolean
  // Style
  style?: CSSProperties
  className?: string
  searchControlStyle?: CSSProperties
  searchControlClassName?: string
  markersStyle?: CSSProperties
  markersClassName?: string
  zoomControlStyle?: CSSProperties
  zoomControlClassName?: string
  locationControlStyle?: CSSProperties
  locationControlClassName?: string
  nearbyControlStyle?: CSSProperties
  nearbyControlClassName?: string
  // Elements
  children?: ReactNode
  // Events
  onLoad?: MapContainerProps['onLoad']
  onChange?: (value: MapPoint | (MapPoint | null)[] | null) => void
  onMarkerCheck?: MapPointCheckHandler
  onMapChange?: MapContainerProps['onMapChange']
}

export type MapChoosePageRef = MapContainerAPI
