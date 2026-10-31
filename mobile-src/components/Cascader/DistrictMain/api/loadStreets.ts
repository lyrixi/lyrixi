import type { DistrictMainApiResult } from '../../types'

// 内库使用-start
import Request from './../../../../utils/Request'
import LocaleUtil from './../../../../utils/LocaleUtil'
import Storage from './../../../../utils/Storage'
// 内库使用-end

/* 测试使用-start
import { Request, LocaleUtil, Storage } from 'lyrixi-mobile'
测试使用-end */

const CACHE_KEY = 'streets'

async function loadStreets(districtId: string | number): Promise<DistrictMainApiResult> {
  const districtKey = String(districtId)

  const cache = ((await Storage.getItem(CACHE_KEY)) as Record<string, unknown[]> | null) || {}
  if (cache[districtKey]) {
    return {
      status: 'success',
      data: { list: cache[districtKey] }
    }
  }

  try {
    const list: unknown = await Request.get(
      `https://lyrixi.github.io/lyrixi/assets/district/streets.json`,
      {
        districtId: districtKey
      },
      undefined
    )
    const nextCache = ((await Storage.getItem(CACHE_KEY)) as Record<string, unknown[]> | null) || {}
    nextCache[districtKey] = (list as unknown[]) || []
    await Storage.setItem(CACHE_KEY, nextCache)
    const storedList = nextCache[districtKey]
    if (storedList?.length) {
      return {
        status: 'success',
        data: { list: storedList }
      }
    }
    return {
      status: 'empty',
      data: { list: [] }
    }
  } catch {
    return {
      status: 'error',
      message: String(LocaleUtil.locale('获取街道异常', 'lyrixi_04a95d24fd2fec048b9caa91f496ceca'))
    }
  }
}

export default loadStreets
