import type { CSSProperties, MutableRefObject, ReactNode } from 'react'

import type { CascaderItem, LoadDataFn, LoadDataResultData } from './Cascader.common.types'

export interface CascaderMainAnchorItem {
  anchor?: string
  [key: string]: unknown
}

export interface CascaderMainUpdateIsLeafTabItem {
  id?: string | number
  isLeaf?: boolean
  [key: string]: unknown
}

export interface CascaderMainUpdateIsLeafParams {
  currentValue?: CascaderMainUpdateIsLeafTabItem[]
  value?: CascaderMainUpdateIsLeafTabItem[]
  tabsRef: MutableRefObject<CascaderMainUpdateIsLeafTabItem[]>
}

// {@link Cascader.Main} loadChildren 返回结果
export interface CascaderMainLoadChildrenResult {
  status: 'success' | 'error' | 'empty'
  code?: string
  message?: string
  data?: LoadDataResultData
}

// {@link Cascader.Main} 当前列表状态
export interface CascaderMainResultState {
  status: string
  code?: string
  message?: ReactNode
  data?: LoadDataResultData
}

export interface CascaderMainRef {
  mainElement: HTMLDivElement | null
  getMainElement: () => HTMLDivElement | null
  update: (value: CascaderItem[] | null | undefined, options?: { action?: string }) => void
}

export interface CascaderMainProps {
  // Value & Display Value
  id?: string
  value?: CascaderItem[]
  list?: CascaderItem[]
  loadData?: LoadDataFn
  // Style
  listStyle?: CSSProperties
  listClassName?: string
  itemStyle?: CSSProperties
  itemClassName?: string
  // Elements
  searchVisible?: boolean
  tabbarRender?: (options: {
    list: CascaderItem[]
    value: CascaderItem | undefined
    onChange: (tab: CascaderItem) => void
  }) => ReactNode
  // Events
  onSearch?: (keyword: string, options: { list: CascaderItem[] }) => unknown
  onChange?: (value: CascaderItem[]) => void
}
