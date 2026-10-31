import CacheKeyPrefix from './CacheKeyPrefix'
import setLocationCache from './setLocationCache'

import type { LocCacheData, LocationStorageCache } from './getCacheLocation.internal.types'
import type { MapPointType } from '../../../types'

// 内库使用-start
import Storage from './../../../../../utils/Storage'
// 内库使用-end

/* 测试使用-start
import {Storage } from 'lyrixi-mobile'
测试使用-end */

// 读取缓存
async function getLocationCache(
  type: MapPointType,
  cacheDuration: number | null | undefined
): Promise<LocCacheData | null> {
  const cacheKey = `${CacheKeyPrefix}${type}`
  const cache = (await Storage.getItem(cacheKey)) as LocationStorageCache | null | undefined
  if (!cache) return null
  try {
    const { data, expires } = cache
    if (typeof expires === 'number' && Date.now() < expires) {
      if (
        cacheDuration &&
        data?.data?.longitude !== null &&
        data?.data?.longitude !== undefined &&
        data?.data?.latitude !== null &&
        data?.data?.latitude !== undefined
      ) {
        await setLocationCache(type, cacheDuration, data)
      }
      return data ?? null
    }
  } catch {
    // ignore
  }
  return null
}

export default getLocationCache
