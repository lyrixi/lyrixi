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
    console.error('MapContainer pointsToWgs84 invalid parameter:', point)
    return null
  }
  // 没有坐标类型无法转换
  if (!point.type && !type) return point

  const newPoint = GeoUtil.transformPoint(
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

function pointsToWgs84(point: MapPoint, type?: MapPointType): MapPoint | null
function pointsToWgs84(points: MapPoint[], type?: MapPointType): (MapPoint | null)[]
function pointsToWgs84(
  points: MapPoint | MapPoint[],
  type?: MapPointType
): MapPoint | (MapPoint | null)[] | null {
  if (Array.isArray(points)) {
    return points.map((point) => {
      return getPoint(point, type)
    })
  }
  return getPoint(points, type)
}

export default pointsToWgs84
