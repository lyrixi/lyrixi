import type { MapPoint, MapType } from '../../types'

// 内库使用-start
import GeoUtil from './../../../../utils/GeoUtil'
// 内库使用-end

/* 测试使用-start
import { GeoUtil } from 'lyrixi-mobile'
测试使用-end */

import pointsToBd09 from './../pointsToBd09'
import pointsToGcj02 from './../pointsToGcj02'
import getMapType from './../getMapType'

// 单个点：isInChina 判断是否国内，再按地图类型转成对应地图渲染坐标系
// 国内：百度 bd09，高德/Google/其他 gcj02；国外：wgs84 无需转换
function getPoint(point: MapPoint, mapType: MapType | null): MapPoint | null {
  if (!GeoUtil.isPoint(point)) return point
  const isInChina = GeoUtil.isInChina(point) === true
  // 国外保持 wgs84
  if (!isInChina) return point
  // Provider 未就绪时不转换，避免误用 gcj02
  if (!mapType) return point
  // 国内地图类型：百度 bd09，其他 gcj02
  return mapType === 'bmap' ? pointsToBd09(point) : pointsToGcj02(point)
}

function pointsToMapPoints(point: MapPoint): MapPoint | null
function pointsToMapPoints(points: MapPoint[]): (MapPoint | null)[]
function pointsToMapPoints(points: MapPoint | MapPoint[]): MapPoint | (MapPoint | null)[] | null {
  let mapType = getMapType()
  if (Array.isArray(points)) {
    return points.map((point) => getPoint(point, mapType))
  }
  return getPoint(points, mapType)
}

export default pointsToMapPoints
