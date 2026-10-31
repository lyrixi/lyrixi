import type { Line } from './types'
import type { MapPoint } from '../../components/Map/types/Map.common.types'

/**
 * 多边形转线
 * @param {MapPoint[]} polygon 多边形
 * @param {Boolean} isRegular 是否要求是一个标准的多边形, 如果传true, 则返回集合会加上首尾互连
 * @return {Line[]} 线段数组
 */
function polygonToLines(polygon: MapPoint[], isRegular?: boolean): Line[] {
  const lines: Line[] = []
  // 取出所有相邻的线
  for (let i = 0; i < polygon.length - 1; i++) {
    lines.push([
      { latitude: polygon[i].latitude, longitude: polygon[i].longitude },
      { latitude: polygon[i + 1].latitude, longitude: polygon[i + 1].longitude }
    ])
  }
  // 再将首尾互连, 防止出现一个不规则的多边形, 例如五角星
  if (isRegular) {
    lines.push([
      {
        latitude: polygon[polygon.length - 1].latitude,
        longitude: polygon[polygon.length - 1].longitude
      },
      { latitude: polygon[0].latitude, longitude: polygon[0].longitude }
    ])
  }
  return lines
}

export default polygonToLines
