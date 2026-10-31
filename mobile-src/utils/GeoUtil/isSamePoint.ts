import isPoint from './isPoint'
import transformPoint from './transformPoint'
import getDistance from './getDistance'
import type { MapPoint } from '../../components/Map/types/Map.common.types'

function toWgs84(point: MapPoint, type?: string): MapPoint | null {
  if (!isPoint(point)) {
    return null
  }
  if (!point.type && !type) return point

  const newPoint = transformPoint(
    {
      longitude: Number(point.longitude),
      latitude: Number(point.latitude)
    },
    (point.type || type) as string,
    'wgs84'
  )
  if (!newPoint) {
    return null
  }
  return {
    ...point,
    type: 'wgs84',
    longitude: newPoint.longitude,
    latitude: newPoint.latitude
  }
}

/**
 * 判断两个坐标点是否相同（先统一转为 wgs84，再按距离比较）
 * @param pointA 坐标点 A
 * @param pointB 坐标点 B
 * @param distance 允许误差米数，默认 100
 */
function isSamePoint(
  pointA: MapPoint | null | undefined,
  pointB: MapPoint | null | undefined,
  distance = 100
): boolean {
  const wgs84A = pointA ? toWgs84(pointA) : null
  const wgs84B = pointB ? toWgs84(pointB) : null

  if (!isPoint(wgs84A) || !isPoint(wgs84B)) {
    return false
  }

  const pointDistance = getDistance(wgs84A, wgs84B)
  if (pointDistance === null) {
    return false
  }

  return pointDistance <= distance
}

export default isSamePoint
