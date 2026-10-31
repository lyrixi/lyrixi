import CacheKey from './CacheKey'
import setAddressCache from './setAddressCache'
import clearAddressCache from './clearAddressCache'

import type { AddressCachePayload } from './getCacheAddress.cache.types'

// 内库使用-start
import Storage from '../../../../../utils/Storage'
// 内库使用-end

/* 测试使用-start
import {Storage} from 'lyrixi-mobile'
测试使用-end */

// 获取地址缓存
async function getAddressCache(
  { latitude, longitude }: { latitude: number; longitude: number },
  cacheDuration: number | null | undefined
): Promise<unknown | null> {
  try {
    const cache = (await Storage.getItem(CacheKey)) as AddressCachePayload | null | undefined
    if (!cache) return null

    const { data, expires, point } = cache

    if (typeof expires === 'number' && Date.now() > expires) {
      await clearAddressCache()
      return null
    }

    if (
      point &&
      Math.abs(point.latitude - latitude) < 0.000001 &&
      Math.abs(point.longitude - longitude) < 0.000001
    ) {
      if (cacheDuration) {
        await setAddressCache({ latitude, longitude, cacheDuration }, data)
      }
      return data
    }
    await clearAddressCache()
    return null
  } catch (error) {
    console.warn('获取地址缓存失败:', error)
    return null
  }
}

export default getAddressCache
