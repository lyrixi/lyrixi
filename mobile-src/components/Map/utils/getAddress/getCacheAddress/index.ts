import setAddressCache from './setAddressCache'
import getAddressCache from './getAddressCache'
import clearAddressCache from './clearAddressCache'
import defaultGetAddress from './../getCurrentAddress'
import type { GetAddressResult } from '../../../types'
import type { GetCacheAddressParams } from './getCacheAddress.cache.types'

// 获取地址（带缓存）
async function getCacheAddress({
  extendCacheDuration = true,
  cacheDuration,
  type,
  latitude,
  longitude
}: GetCacheAddressParams): Promise<GetAddressResult> {
  if (typeof cacheDuration !== 'number') {
    return defaultGetAddress({ latitude, longitude, type })
  }
  if (cacheDuration === 0) {
    await clearAddressCache()
    return defaultGetAddress({ latitude, longitude, type })
  }
  const cacheData = await getAddressCache(
    { latitude, longitude },
    extendCacheDuration ? cacheDuration : null
  )
  if (cacheData) {
    console.log('地址读取缓存:', cacheData)
    return cacheData as GetAddressResult
  }
  const result = await defaultGetAddress({
    latitude,
    longitude,
    type
  })
  if (result?.status === 'success') {
    console.log(`地址查询成功, 设置缓存${cacheDuration}秒:`, result)
    if (cacheDuration) {
      await setAddressCache({ longitude, latitude, cacheDuration }, result)
    }
  }
  return result
}

export default getCacheAddress
