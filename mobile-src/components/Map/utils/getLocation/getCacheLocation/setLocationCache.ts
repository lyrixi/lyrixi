import CacheKeyPrefix from './CacheKeyPrefix'

import type { LocCacheData } from './getCacheLocation.internal.types'
import type { MapPoint, MapPointType } from '../../../types'

// 内库使用-start
import DataUtil from './../../../../../utils/DataUtil'
import GeoUtil from './../../../../../utils/GeoUtil'
import Storage from './../../../../../utils/Storage'
// 内库使用-end

/* 测试使用-start
import { DataUtil, GeoUtil, Storage } from 'lyrixi-mobile'
测试使用-end */

// 设置缓存
async function setLocationCache(
  type: MapPointType,
  cacheDuration: number,
  data: LocCacheData
): Promise<boolean> {
  if (!cacheDuration) return false
  const point = data.data
  if (
    point?.longitude === null ||
    point?.longitude === undefined ||
    point?.latitude === null ||
    point?.latitude === undefined
  )
    return false

  const wgs84Data = DataUtil.cloneDeep(data) as LocCacheData
  const gcj02Data = DataUtil.cloneDeep(data) as LocCacheData

  if (type === 'wgs84') {
    const gcj02Point = GeoUtil.transformPoint(
      {
        longitude: Number(point.longitude),
        latitude: Number(point.latitude)
      },
      'wgs84',
      'gcj02'
    )
    if (!gcj02Point) {
      return false
    }
    gcj02Data.data = {
      ...(gcj02Data.data as MapPoint),
      longitude: gcj02Point.longitude,
      latitude: gcj02Point.latitude,
      type: 'gcj02'
    }
  } else if (type === 'gcj02') {
    const wgs84Point = GeoUtil.transformPoint(
      {
        longitude: Number(point.longitude),
        latitude: Number(point.latitude)
      },
      'gcj02',
      'wgs84'
    )
    if (!wgs84Point) {
      return false
    }
    wgs84Data.data = {
      ...(wgs84Data.data as MapPoint),
      longitude: wgs84Point.longitude,
      latitude: wgs84Point.latitude,
      type: 'wgs84'
    }
  }

  await Storage.setItem(`${CacheKeyPrefix}wgs84`, {
    data: wgs84Data,
    expires: Date.now() + cacheDuration * 1000
  })
  await Storage.setItem(`${CacheKeyPrefix}gcj02`, {
    data: gcj02Data,
    expires: Date.now() + cacheDuration * 1000
  })
  return true
}

export default setLocationCache
