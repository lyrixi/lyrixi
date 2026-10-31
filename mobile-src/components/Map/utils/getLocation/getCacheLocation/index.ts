import getLocationCache from './getLocationCache'
import setLocationCache from './setLocationCache'
import clearLocationCache from './clearLocationCache'
import defaultGetLocation from '../getCurrentLocation'
import getBrowserLocation from './getBrowserLocation'

import type { GetLocationResult } from '../../../types'
import type {
  GetCacheLocationCallParams,
  GetCacheLocationParams
} from './getCacheLocation.internal.types'

// 内库使用-start
import Device from './../../../../../utils/Device'
import LocaleUtil from './../../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { Device, LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

async function getLocation(params: GetCacheLocationCallParams): Promise<GetLocationResult> {
  const { browser, extendCacheDuration, cacheDuration, timeout, type } = params
  return new Promise((resolve) => {
    console.log('定位方式:', type)

    if (cacheDuration === 0) {
      void clearLocationCache(type)
    }

    void (async () => {
      const cacheData = await getLocationCache(type, extendCacheDuration ? cacheDuration : null)
      if (cacheData) {
        console.log('定位读取缓存:', cacheData)
        resolve(cacheData)
        return
      }

      let getLocationTimer: ReturnType<typeof setTimeout> | null = null
      let getLocationTimeout = false

      if (getLocationTimer) window.clearTimeout(getLocationTimer)
      if (typeof timeout === 'number') {
        getLocationTimer = setTimeout(() => {
          console.error('定位超时')
          getLocationTimeout = true
          resolve({
            status: 'error',
            code: 'LOCATION_TIMEOUT',
            message: String(
              LocaleUtil.locale('定位超时', 'lyrixi_af14815f5e9938584f52751cbb3c5dc2')
            )
          })
        }, timeout)
      }

      const result = (
        browser ? await getBrowserLocation({ type }) : await defaultGetLocation({ type })
      ) as GetLocationResult

      if (getLocationTimeout) return

      if (getLocationTimer) window.clearTimeout(getLocationTimer)

      if (result?.status === 'success') {
        const longitude = result.data?.longitude
        const latitude = result.data?.latitude
        if (
          cacheDuration &&
          typeof cacheDuration === 'number' &&
          longitude !== undefined &&
          longitude !== null &&
          latitude !== undefined &&
          latitude !== null
        ) {
          console.log(`定位成功, 设置缓存${cacheDuration}秒:`, result)
          void setLocationCache(type, cacheDuration, result)
        }
      }
      resolve(result)
    })()
  })
}

// 定位：考虑定位超时场景，超时后再尝试浏览器定位
async function getCacheLocation(params: GetCacheLocationParams): Promise<GetLocationResult> {
  const { timeout = 10000, extendCacheDuration = true, cacheDuration, type } = params
  if (typeof cacheDuration !== 'number') {
    return defaultGetLocation({ type }) as Promise<GetLocationResult>
  }
  if (cacheDuration === 0) {
    await clearLocationCache(type)
    return defaultGetLocation({ type }) as Promise<GetLocationResult>
  }
  if (Device.device === 'pc') {
    return getLocation({
      type,
      extendCacheDuration,
      cacheDuration,
      timeout,
      browser: true
    })
  }
  const result = await getLocation({
    type,
    extendCacheDuration,
    cacheDuration,
    timeout
  })
  if (result?.status === 'success') {
    return result
  }
  if (result?.code !== 'LOCATION_TIMEOUT') {
    return result
  }
  return getLocation({
    type,
    extendCacheDuration,
    cacheDuration,
    timeout,
    browser: true
  })
}

export default getCacheLocation
