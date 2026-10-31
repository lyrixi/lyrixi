import isLineIntersect from './isLineIntersect'
import polygonToLines from './polygonToLines'
import type { MapPoint } from '../../components/Map/types/Map.common.types'

/**
 * 判断是否是一个合法的多边形, 具体为多边形, 且不允许交叉, 或者五角星等不规则的多边形
 * @param {MapPoint[]} polygon 多边形
 * @returns {Boolean}
 */
function isPolygon(polygon: MapPoint[]): boolean {
  // 获取边线
  const lines = polygonToLines(polygon, true)
  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      if (isLineIntersect(lines[i], lines[j])) return false
    }
  }
  return true
}

export default isPolygon
