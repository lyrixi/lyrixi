import type { L } from '../../../Map.leaflet.types'

function clearPolyline(layer: L.LayerGroup | null): void {
  if (!layer) return
  layer.clearLayers()
}

export default clearPolyline
