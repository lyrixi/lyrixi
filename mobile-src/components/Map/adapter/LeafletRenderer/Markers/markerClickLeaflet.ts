import type { L } from '../../../Map.leaflet.types'
import type { MapPoint, MapPointCheckHandler } from '../../../types'

// 公共点击leaflet点
function markerClickLeaflet({
  layerGroup,
  onCheck
}: {
  layerGroup: L.LayerGroup
  onCheck: MapPointCheckHandler
}): void {
  layerGroup.eachLayer(function (layer) {
    const markerLayer = layer as L.Marker
    markerLayer.on('click', function (e: L.LeafletMouseEvent) {
      const mapPoint = (e.target as L.Marker)?.options?.mapPoint as MapPoint | undefined
      if (!mapPoint) return
      onCheck(mapPoint)
    })
  })
}

export default markerClickLeaflet
