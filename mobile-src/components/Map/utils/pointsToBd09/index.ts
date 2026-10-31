import type { MapPoint, MapPointType } from '../../types'

// 内库使用-start
import GeoUtil from './../../../../utils/GeoUtil'
// 内库使用-end

/* 测试使用-start
import { GeoUtil } from 'lyrixi-mobile'
测试使用-end */

// 单个点转换
function getPoint(point: MapPoint, type: MapPointType | undefined): MapPoint | null {
  if (!GeoUtil.isPoint(point)) {
    console.error('MapContainer pointsToBd09 invalid parameter:', point)
    return null
  }
  // 无需要转换
  if (!type) return point

  const newPoint = GeoUtil.transformPoint(
    {
      longitude: Number(point.longitude),
      latitude: Number(point.latitude)
    },
    (point.type || 'wgs84') as string,
    type
  )
  if (!newPoint) {
    return null
  }
  return {
    ...point,
    type: type,
    longitude: newPoint.longitude,
    latitude: newPoint.latitude
  }
}

function pointsToBd09(point: MapPoint, type?: Extract<MapPointType, 'bd09'>): MapPoint | null
function pointsToBd09(points: MapPoint[], type?: Extract<MapPointType, 'bd09'>): (MapPoint | null)[]
function pointsToBd09(
  points: MapPoint | MapPoint[],
  type?: Extract<MapPointType, 'bd09'>
): MapPoint | (MapPoint | null)[] | null {
  if (Array.isArray(points)) {
    return points.map((point) => {
      return getPoint(point, type || 'bd09')
    })
  }
  return getPoint(points, type || 'bd09')
}

export default pointsToBd09
