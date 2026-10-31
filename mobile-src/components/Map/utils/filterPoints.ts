import type { MapPoint } from '../types'

// 内库使用-start
import GeoUtil from './../../../utils/GeoUtil'
// 内库使用-end

// 过滤不合法的坐标点
function filterPoints(points: unknown): MapPoint[] {
  if (!points || !Array.isArray(points)) {
    return []
  }

  return (points as MapPoint[]).filter((point) => {
    return GeoUtil.isPoint(point) && point.type
  })
}

export default filterPoints
