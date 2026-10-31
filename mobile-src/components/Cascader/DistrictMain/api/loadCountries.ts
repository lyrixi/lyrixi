import type { DistrictMainApiResult } from '../../types'

// 内库使用-start
import ValidatorUtil from '../../../../utils/ValidatorUtil'
import LocaleUtil from '../../../../utils/LocaleUtil'
import Request from './../../../../utils/Request'
import Storage from './../../../../utils/Storage'
// 内库使用-end

/* 测试使用-start
import { ValidatorUtil, LocaleUtil, Request, Storage } from 'lyrixi-mobile'
测试使用-end */

const CACHE_KEY = 'countries'

async function loadCountries(): Promise<DistrictMainApiResult> {
  const language = LocaleUtil.getLanguage()

  const cached = (await Storage.getItem(CACHE_KEY)) as unknown[] | null
  if (!ValidatorUtil.isEmpty(cached)) {
    return {
      status: 'success',
      data: { list: cached as unknown[] }
    }
  }

  try {
    const json: unknown = await Request.get(
      `https://lyrixi.github.io/lyrixi/assets/district/${language}/country.json`,
      undefined,
      undefined
    )
    const list = (json as unknown[]) || []
    await Storage.setItem(CACHE_KEY, list)
    return {
      status: 'success',
      data: { list }
    }
  } catch {
    return {
      status: 'error',
      message: String(
        LocaleUtil.locale('获取国家数据失败', 'lyrixi_12c1c752c3d8f3ce8f3c687cabd4a626')
      )
    }
  }
}

export default loadCountries
