import type { L } from '../../../Map.leaflet.types'
import pointsToMapPoints from './../../../utils/pointsToMapPoints'
import type { MapPoint } from '../../../types'
import type { CircleParams } from './addCircles.types'

// 内库使用-start
import GeoUtil from './../../../../../utils/GeoUtil'
// 内库使用-end

function addCircles(
  points: MapPoint[] | null | undefined,
  params: CircleParams,
  layer: L.LayerGroup
): void {
  const { onCheck = null } = params
  const list = (Array.isArray(points) ? points : []).filter((point) => point)
  if (list.length === 0) return

  const fittedList = pointsToMapPoints(list) as MapPoint[]

  for (let i = 0; i < fittedList.length; i++) {
    const fitted = fittedList[i]
    const point = list[i]
    if (!GeoUtil.isPoint(fitted)) continue

    const circle = window.L!.circle([fitted.latitude, fitted.longitude] as L.LatLngExpression, {
      radius: (point?.radius as number) || params?.radius || 200,
      color: (point?.color as string) || (params?.color as string) || '#3388ff'
    })
    circle.addTo(layer)

    if (!onCheck) continue
    circle.on('click', function () {
      onCheck(point)
    })
  }
}

export default addCircles
