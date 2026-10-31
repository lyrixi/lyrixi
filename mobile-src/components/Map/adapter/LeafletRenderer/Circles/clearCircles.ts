import type { L } from '../../../Map.leaflet.types'

function clearCircles(layer: L.LayerGroup | null): void {
  if (!layer) return
  layer.clearLayers()
}

export default clearCircles
