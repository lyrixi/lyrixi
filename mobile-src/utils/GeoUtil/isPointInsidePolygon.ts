import type { MapPoint } from '../../components/Map/types/Map.common.types'

/**
 * 判断点是否在多边形里
 * @param {MapPoint} point 点
 * @param {MapPoint[]} polygon 多边形
 * @return {Boolean}
 */
function isPointInsidePolygon(point: MapPoint, polygon: MapPoint[]): boolean {
  const x = point.latitude ?? 0
  const y = point.longitude ?? 0

  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].latitude ?? 0
    const yi = polygon[i].longitude ?? 0
    const xj = polygon[j].latitude ?? 0
    const yj = polygon[j].longitude ?? 0

    // prettier-ignore
    const intersect = (yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }

  return inside
}

export default isPointInsidePolygon
