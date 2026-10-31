import CacheKey from './CacheKey'

import type { SetAddressCacheParams } from './getCacheAddress.cache.types'

// 内库使用-start
import Storage from '../../../../../utils/Storage'
// 内库使用-end

/* 测试使用-start
import {Storage} from 'lyrixi-mobile'
测试使用-end */

// 设置地址缓存
async function setAddressCache(params: SetAddressCacheParams, data: unknown): Promise<boolean> {
  const { latitude, longitude, cacheDuration } = params
  if (!cacheDuration || typeof cacheDuration !== 'number') return false

  try {
    const cacheData = {
      data,
      point: {
        latitude: latitude,
        longitude: longitude
      },
      expires: Date.now() + cacheDuration * 1000
    }

    await Storage.setItem(CacheKey, cacheData)
    return true
  } catch (error) {
    console.warn('设置地址缓存失败:', error)
    return false
  }
}

export default setAddressCache
