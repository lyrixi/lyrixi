import type {
  DistrictMainLoadDataApiResult,
  DistrictMainLoadDataRunnerParams,
  DistrictMainLoadDataTab
} from '../../types'

// 内库使用-start
import Loading from './../../../Loading'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

import loadCountryRegionsData from './loadBaseData/loadCountryRegionsData'

// 点击末级加载省市区或街道数据
async function loadData(
  tabs: DistrictMainLoadDataTab[],
  { loadCountryRegions, loadStreets }: DistrictMainLoadDataRunnerParams
): Promise<DistrictMainLoadDataApiResult> {
  const lastTab = tabs?.[tabs?.length - 1]

  if (lastTab?.type?.includes('country')) {
    Loading.open()
    const countryRegionsData = await loadCountryRegionsData({
      countryId: lastTab.id,
      loadCountryRegions
    })
    Loading.close()
    return countryRegionsData
  }

  Loading.open()
  const streetsData = await loadStreets(lastTab.id, { value: tabs })
  Loading.close()
  return streetsData
}

export default loadData
