import type {
  CascaderDistrictMainLoadBaseDataParams,
  DistrictMainApiDistrictNode,
  DistrictResultState
} from '../../../types'

// 内库使用-start
import ArrayUtil from './../../../../../utils/ArrayUtil'
import LocaleUtil from './../../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { ArrayUtil, LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

// 获取国家省市区
async function loadBaseData({
  countryId,
  loadCountries,
  loadCountryRegions
}: CascaderDistrictMainLoadBaseDataParams): Promise<DistrictResultState> {
  const countriesData = await loadCountries()

  if (!countryId || countriesData.status === 'error') {
    return countriesData
  }

  const country = ((countriesData.data?.list ?? []) as DistrictMainApiDistrictNode[]).find(
    (item) => item.id === countryId
  )
  if (!country) {
    return {
      status: 'error',
      message: String(
        LocaleUtil.locale(
          'value参数错误, value开始应当为国家',
          'lyrixi_9a2f6cb8fea853e91225b72d770768e6'
        ) ?? ''
      )
    }
  }

  if (Array.isArray(country.children) && country.children.length) {
    return countriesData
  }

  const countryRegionsData = await loadCountryRegions(countryId)
  if (countryRegionsData?.status === 'error') return countryRegionsData
  if (countryRegionsData.data?.list) {
    country.children = countryRegionsData.data.list as DistrictMainApiDistrictNode[]
  }

  return {
    ...countriesData,
    data: {
      ...countriesData.data,
      list: ArrayUtil.updateDeepTreeParentId(
        (countriesData.data?.list ?? []) as unknown as Parameters<
          typeof ArrayUtil.updateDeepTreeParentId
        >[0]
      ) as DistrictMainApiDistrictNode[]
    }
  }
}

export default loadBaseData
