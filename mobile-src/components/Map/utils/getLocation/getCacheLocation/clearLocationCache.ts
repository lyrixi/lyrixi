import CacheKeyPrefix from './CacheKeyPrefix'

import type { MapPointType } from '../../../types'

// 内库使用-start
import Storage from './../../../../../utils/Storage'
// 内库使用-end

/* 测试使用-start
import {Storage } from 'lyrixi-mobile'
测试使用-end */

// 清除缓存
async function clearLocationCache(type: MapPointType | undefined | null): Promise<void> {
  if (type) {
    const cacheKey = `${CacheKeyPrefix}${type}`
    await Storage.removeItem(cacheKey)
  } else {
    const wgs84CacheKey = `${CacheKeyPrefix}wgs84`
    const gcj02CacheKey = `${CacheKeyPrefix}gcj02`
    await Storage.removeItem(wgs84CacheKey)
    await Storage.removeItem(gcj02CacheKey)
  }
}

export default clearLocationCache
