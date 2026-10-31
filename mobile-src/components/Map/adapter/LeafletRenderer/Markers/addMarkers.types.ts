import type { L } from '../../../Map.leaflet.types'
import type { MapPointCheckHandler } from '../../../types/Map.common.types'

export interface CanvasMarkerLayer {
  clearLayers: () => void
  addMarker: (m: L.Marker) => void
  removeMarker: (target: unknown, all?: boolean) => void
  addOnClickListener: (cb: (e: unknown, data: unknown) => void) => void
}

export interface AddMarkersIconParams {
  icon: L.Icon | L.DivIcon | null
  onCheck?: MapPointCheckHandler | null
  layerOrder: number
}

export interface AddMarkersLayersParams {
  layer: L.LayerGroup
  canvasLayer: CanvasMarkerLayer
}
