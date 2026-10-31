import type { Line } from './types'
import type { MapPoint } from '../../components/Map/types/Map.common.types'

/**
 * 判断点是否在线上
 * @param {MapPoint} point
 * @param {Line} line
 * @return {Boolean}
 */
function isPointOnLine(point: MapPoint, line: Line): boolean {
  const px = point.latitude ?? 0
  const py = point.longitude ?? 0
  const x1 = line[0].latitude ?? 0
  const y1 = line[0].longitude ?? 0
  const x2 = line[1].latitude ?? 0
  const y2 = line[1].longitude ?? 0

  // 首先判断该点是否在该线段的外包矩形内
  if (
    py >= Math.min(y1, y2) &&
    py <= Math.max(y1, y2) &&
    px >= Math.min(x1, x2) &&
    px <= Math.max(x1, x2)
  ) {
    // 判断点是否在直线上公式
    const precision = (y1 - py) * (x2 - px) - (y2 - py) * (x1 - px)
    if (precision < 2e-10 && precision > -2e-10) {
      // 实质判断是否接近0
      return true
    }
  }
  return false
}

export default isPointOnLine
