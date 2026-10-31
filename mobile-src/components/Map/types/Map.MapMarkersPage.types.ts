import type { CSSProperties, ReactNode, RefObject } from 'react'
import type { MapContainerAPI, MapContainerProps } from './Map.MapContainer.types'
import type { MapPointCheckHandler } from './Map.common.types'
import type { MapMarkersRef } from './Map.Markers.types'
import type { MapZoomControlRef } from './Map.ZoomControl.types'
import type { MapPolylineRef } from './Map.Polyline.types'
import type { MapCirclesRef } from './Map.Circles.types'

export type { MapPolylineRef, MapCirclesRef }

export interface MapMarkersPageProps {
  // Value & Display Value
  id?: string
  markers?: unknown
  minZoom?: number
  maxZoom?: number
  polyline?: unknown
  circles?: unknown
  // Style
  style?: CSSProperties
  className?: string
  polylineStyle?: CSSProperties
  polylineClassName?: string
  circlesStyle?: CSSProperties
  circlesClassName?: string
  zoomControlStyle?: CSSProperties
  zoomControlClassName?: string
  // Elements
  children?: ReactNode
  // Events
  onLoad?: MapContainerProps['onLoad']
  onMarkerCheck?: MapPointCheckHandler
  onMapChange?: MapContainerProps['onMapChange']
}

export type MapMarkersPageRef =
  | (MapContainerAPI & {
      markersRef: RefObject<MapMarkersRef | null>
      polylineRef: RefObject<MapPolylineRef | null>
      circlesRef: RefObject<MapCirclesRef | null>
      zoomRef: RefObject<MapZoomControlRef | null>
    })
  | null
