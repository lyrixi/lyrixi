import type { L } from '../../../Map.leaflet.types'
import pointsToMapPoints from './../../../utils/pointsToMapPoints'
import type { MapPoint } from '../../../types'
import type { PolyStyleParams } from './addPolygon.types'

// 内库使用-start
import GeoUtil from './../../../../../utils/GeoUtil'
// 内库使用-end

// Polygon
function addPolygon(
  points: MapPoint[] | null | undefined,
  params: PolyStyleParams,
  layer: L.LayerGroup
): void {
  const list = GeoUtil.sortPolygonPoints(
    (pointsToMapPoints(Array.isArray(points) ? points : []) as MapPoint[]).filter(
      (p): p is MapPoint => !!p
    )
  )
  if (list.length < 3) return

  const polygon = window.L!.polygon(
    list.map((point) => [point.latitude, point.longitude] as L.LatLngExpression),
    {
      color: (params?.color as string) || '#3388ff',
      fillColor: (params?.fillColor as string) ?? (params?.color as string) ?? '#3388ff',
      fillOpacity: (params?.fillOpacity as number) ?? 0.2,
      weight: (params?.weight as number) ?? 2
    }
  )
  polygon.addTo(layer)
}

export default addPolygon
