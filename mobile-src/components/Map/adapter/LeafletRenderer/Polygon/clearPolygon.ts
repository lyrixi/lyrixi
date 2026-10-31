import type { L } from '../../../Map.leaflet.types'

function clearPolygon(layer: L.LayerGroup | null): void {
  if (!layer) return
  layer.clearLayers()
}

export default clearPolygon
