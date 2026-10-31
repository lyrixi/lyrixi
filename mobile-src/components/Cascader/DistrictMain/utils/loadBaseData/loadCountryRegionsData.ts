import type { DistrictMainApiResult } from '../../../types'

// 内库使用-start
import ArrayUtil from './../../../../../utils/ArrayUtil'
// 内库使用-end

/* 测试使用-start
import { ArrayUtil } from 'lyrixi-mobile'
测试使用-end */

// 加载省市区
async function loadCountryRegionsData({
  countryId,
  loadCountryRegions
}: {
  countryId: string | number
  loadCountryRegions: (id: string | number) => Promise<DistrictMainApiResult>
}): Promise<DistrictMainApiResult> {
  const countryRegionsData = await loadCountryRegions(countryId)
  if (countryRegionsData?.status === 'error') return countryRegionsData

  return {
    ...countryRegionsData,
    data: {
      ...countryRegionsData.data,
      list: ArrayUtil.updateDeepTreeParentId(
        (countryRegionsData.data?.list ?? []) as unknown as Parameters<
          typeof ArrayUtil.updateDeepTreeParentId
        >[0]
      ) as unknown[]
    }
  }
}

export default loadCountryRegionsData
