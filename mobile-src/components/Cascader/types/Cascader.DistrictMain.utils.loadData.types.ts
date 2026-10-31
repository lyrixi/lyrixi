import type { DistrictMainApiResult } from './Cascader.DistrictMain.api.types'

export interface DistrictMainLoadDataTab {
  id: string | number
  type?: string[]
  [key: string]: unknown
}

export type DistrictMainLoadDataApiResult = DistrictMainApiResult

export type DistrictMainLoadCountryRegionsFn = (
  id: string | number
) => Promise<DistrictMainLoadDataApiResult>

export type DistrictMainLoadStreetsFn = (
  id: string | number,
  options?: { value?: DistrictMainLoadDataTab[] }
) => Promise<DistrictMainLoadDataApiResult>

export interface DistrictMainLoadDataRunnerParams {
  loadCountryRegions: DistrictMainLoadCountryRegionsFn
  loadStreets: DistrictMainLoadStreetsFn
}
