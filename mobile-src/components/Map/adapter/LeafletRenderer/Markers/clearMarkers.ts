import type { L } from '../../../Map.leaflet.types'
import type { CanvasMarkerLayer } from './addMarkers.types'

// Clear all marker
function clearMarkers(layers: {
  canvasLayer: CanvasMarkerLayer | null | undefined
  layer: L.LayerGroup | null | undefined
}): void {
  const { canvasLayer, layer } = layers
  if (!canvasLayer || !layer) return
  canvasLayer.clearLayers()
  layer.clearLayers()
}

export default clearMarkers
