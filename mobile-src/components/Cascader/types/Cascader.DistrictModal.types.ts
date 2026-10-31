import type { CSSProperties, ReactNode } from 'react'

import type { CascaderItem } from './Cascader.common.types'
import type {
  LoadCountriesFn,
  LoadCountryRegionsFn,
  LoadStreetsFn
} from './Cascader.DistrictMain.types'

// 内库使用-start
import type { ModalProps } from '../../Modal/types'
// 内库使用-end

export interface CascaderDistrictModalProps {
  // Value & Display Value
  id?: string
  value?: CascaderItem[] | null
  type?: string
  loadCountries?: LoadCountriesFn
  loadCountryRegions?: LoadCountryRegionsFn
  loadStreets?: LoadStreetsFn
  // Status
  open?: boolean
  min?: string
  maskClosable?: boolean
  // Style
  safeArea?: boolean
  listStyle?: CSSProperties
  listClassName?: string
  itemStyle?: CSSProperties
  itemClassName?: string
  modalStyle?: CSSProperties
  modalClassName?: string
  maskStyle?: CSSProperties
  maskClassName?: string
  // Elements
  portal?: ModalProps['portal']
  searchVisible?: boolean
  title?: ReactNode
  ok?: ReactNode
  cancel?: ReactNode
  cancelVisible?: boolean
  // Events
  onClose?: () => void
  onOk?: (value: CascaderItem[] | null | undefined) => boolean | Promise<unknown> | void
  onChange?: (value: CascaderItem[]) => void
}

// DistrictMain ref 上供 Modal 使用的窄化句柄
export type CascaderDistrictModalMainHandle = { loadList: () => Promise<void>; list: unknown }
