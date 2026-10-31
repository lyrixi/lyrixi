import type { CSSProperties } from 'react'

import type { DistrictResultState } from './Cascader.DistrictMain.api.types'
import type { CascaderItem } from './Cascader.common.types'

export type LoadCountriesFn = () => Promise<DistrictResultState>
export type LoadCountryRegionsFn = (id?: string | number) => Promise<DistrictResultState>
export type LoadStreetsFn = (
  id: string | number,
  options?: { value?: CascaderItem[] }
) => Promise<DistrictResultState>

export interface CascaderDistrictMainProps {
  // Modal: Status
  open?: boolean
  // Value & Display Value
  id?: string
  value?: CascaderItem[] | null
  type?: string
  loadCountries?: LoadCountriesFn
  loadCountryRegions?: LoadCountryRegionsFn
  loadStreets?: LoadStreetsFn
  // Style
  listStyle?: CSSProperties
  listClassName?: string
  itemStyle?: CSSProperties
  itemClassName?: string
  // Elements
  searchVisible?: boolean
  // Events
  onChange?: (v: CascaderItem[]) => void
}
