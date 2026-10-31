import type { MapPoint } from '../../components/Map/types/Map.common.types'

/**
 * 获取两个坐标间的中心点
 * @param {MapPoint} p0
 * @param {MapPoint} p1
 * @return {MapPoint}
 */
function getMiddlePoint(p0: MapPoint, p1: MapPoint): MapPoint {
  const lat0 = p0.latitude ?? 0
  const lng0 = p0.longitude ?? 0
  const lat1 = p1.latitude ?? 0
  const lng1 = p1.longitude ?? 0
  return {
    latitude: (lat0 + lat1) / 2,
    longitude: (lng0 + lng1) / 2
  }
}

export default getMiddlePoint
