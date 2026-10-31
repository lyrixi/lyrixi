import type { DistrictResultState } from './Cascader.DistrictMain.api.types'

export type CascaderDistrictMainLoadBaseDataFn = (
  id?: string | number
) => Promise<DistrictResultState>

export interface CascaderDistrictMainLoadBaseDataParams {
  countryId?: string | number
  loadCountries: () => Promise<DistrictResultState>
  loadCountryRegions: CascaderDistrictMainLoadBaseDataFn
}
