import type { DistrictMainApiResult } from '../../types'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import Request from './../../../../utils/Request'
import Storage from './../../../../utils/Storage'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Request, Storage } from 'lyrixi-mobile'
测试使用-end */

const CACHE_KEY = 'countryRegions'

function toCountryRegionsResult(list: unknown[] | undefined): DistrictMainApiResult {
  const normalizedList = list || []
  if (normalizedList.length) {
    return {
      status: 'success',
      data: { list: normalizedList }
    }
  }
  // 无子节点时，视为末级节点
  return {
    status: 'empty',
    data: { list: [] }
  }
}

async function loadCountryRegions(
  countryId: string | number = '86'
): Promise<DistrictMainApiResult> {
  const language = LocaleUtil.getLanguage()
  const countryKey = String(countryId)

  const cache = ((await Storage.getItem(CACHE_KEY)) as Record<string, unknown[]> | null) || {}
  if (cache[countryKey]) {
    return toCountryRegionsResult(cache[countryKey])
  }

  try {
    const list: unknown = await Request.get(
      `https://lyrixi.github.io/lyrixi/assets/district/${language}/${countryKey}.json`,
      undefined,
      undefined
    )
    const nextCache = ((await Storage.getItem(CACHE_KEY)) as Record<string, unknown[]> | null) || {}
    nextCache[countryKey] = (list as unknown[]) || []
    await Storage.setItem(CACHE_KEY, nextCache)
    return toCountryRegionsResult(nextCache[countryKey])
  } catch {
    return {
      status: 'error',
      message: String(
        LocaleUtil.locale('获取省市区数据失败', 'lyrixi_6779a06b0961e051e7b3ea0296305d18')
      )
    }
  }
}

export default loadCountryRegions
