import type { CSSProperties, ReactNode } from 'react'

import type { MapPoint, MapPointType } from './Map.common.types'

export type MapChangeAction = 'pan' | 'zoom'

export type MapChangeActionType = 'gesture' | 'programmatic'

export type MapChangeEvent = Readonly<{
  actions: MapChangeAction[]
  actionType: MapChangeActionType
  latitude: number
  longitude: number
  // 坐标类型，统一为 WGS84
  type: Extract<MapPointType, 'wgs84'>
  zoom: number
}>

export interface MapContainerLoadResult {
  status: string
  code?: string
  message?: string
  data?: { map: MapContainerAPI }
}

export interface MapContainerAPI {
  element: HTMLDivElement | null
  panTo: (points: MapPoint | MapPoint[]) => void
  // 获取中心点，统一返回 WGS84
  getCenter: () => MapPoint | null
  zoomIn: () => Promise<number | null>
  zoomOut: () => Promise<number | null>
  getZoom: () => number | null
  setZoom: (zoom: number) => unknown
}

export interface MapContainerContextValue extends MapContainerAPI {
  /** 当前地图实例（BMap/Google 等），仅 Map 内部使用 */
  _currentMap: unknown
  /** Leaflet 地图实例，仅 Map 内部使用 */
  _leafletMap: unknown
}

export interface MapContainerProps {
  // Value & Display Value
  center?: MapPoint
  zoom?: number
  minZoom?: number
  maxZoom?: number
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  children?: ReactNode
  // Events
  onLoad?: (result: MapContainerLoadResult) => void
  onMapChange?: (event: MapChangeEvent) => void
}
