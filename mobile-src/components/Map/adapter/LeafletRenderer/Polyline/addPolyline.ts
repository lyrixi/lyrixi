import type { L } from '../../../Map.leaflet.types'
import pointsToMapPoints from './../../../utils/pointsToMapPoints'
import type { MapPoint } from '../../../types'
import createMarkerDivIcon from '../Markers/createMarkerDivIcon'
import type { LineStyleParams } from './addPolyline.types'

// Polyline
function addPolyline(
  points: MapPoint[] | null | undefined,
  params: LineStyleParams,
  layer: L.LayerGroup
): void {
  const list = (pointsToMapPoints(Array.isArray(points) ? points : []) as MapPoint[]).filter(
    (p): p is MapPoint => !!p
  )
  if (list.length === 0) return

  const polyline = window.L!.polyline(
    list.map((point) => [point.latitude, point.longitude] as L.LatLngExpression),
    {
      color: (params?.color as string) || 'red'
    }
  )
  polyline.addTo(layer)

  list.forEach((point) => {
    if (!point.markerIcon) return
    const icon = createMarkerDivIcon(point.markerIcon)
    if (!icon) return
    window
      .L!.marker([Number(point.latitude), Number(point.longitude)] as L.LatLngExpression, { icon })
      .addTo(layer)
  })
}

export default addPolyline
