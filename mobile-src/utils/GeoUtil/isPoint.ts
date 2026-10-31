import type { MapPoint } from '../../components/Map/types/Map.common.types'

// 内库使用-start
import ValidatorUtil from '../ValidatorUtil'
// 内库使用-end

/**
 * 是否为合法经纬度点（0 为合法坐标）
 * @param point 含经纬度点
 */
function isPoint(
  point: MapPoint | unknown
): point is MapPoint & { longitude: number; latitude: number } {
  if (!point || !ValidatorUtil.isPlainObject(point)) {
    return false
  }
  const { latitude, longitude } = point

  return (
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  )
}

export default isPoint
