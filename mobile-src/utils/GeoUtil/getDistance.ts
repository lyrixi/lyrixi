import isPoint from './isPoint'
import type { MapPoint } from '../../components/Map/types/Map.common.types'

/**
 * 获得两个点之间的距离
 * @param {MapPoint} p0
 * @param {MapPoint} p1
 * @return {Number | null} 米, 错误返回 null
 */
function getDistance(p0: MapPoint, p1: MapPoint): number | null {
  if (!isPoint(p0) || !isPoint(p1)) {
    return null
  }
  const lng1 = p0.longitude
  const lat1 = p0.latitude
  const lng2 = p1.longitude
  const lat2 = p1.latitude
  const radLat1 = (lat1 * Math.PI) / 180.0
  const radLat2 = (lat2 * Math.PI) / 180.0
  const a = radLat1 - radLat2
  const b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    )
  s = s * 6378137 // EARTH_RADIUS in meters
  s = Math.round(s * 10) / 10
  return s
}

export default getDistance
