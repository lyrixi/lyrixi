import isPointInsidePolygon from './isPointInsidePolygon'
import type { MapPoint } from '../../components/Map/types/Map.common.types'

/**
 * 判断多边形是否在多边形里
 * @param {MapPoint[]} py0 多边形
 * @param {MapPoint[]} py1 多边形
 * @return {Boolean}
 */
function isPolygonInsidePolygon(py0: MapPoint[], py1: MapPoint[]): boolean {
  // 判断一个多边形的一个点是否位于另一个多边形多边形内
  let i
  let inside = 0
  for (i = 0; i < py0.length; i += 1) {
    if (isPointInsidePolygon(py0[i], py1)) {
      inside++
    }
  }
  if (inside === py0.length) return true

  inside = 0
  for (i = 0; i < py1.length; i += 1) {
    if (isPointInsidePolygon(py1[i], py0)) {
      inside++
    }
  }
  if (inside === py0.length) return true

  return false
}

export default isPolygonInsidePolygon
