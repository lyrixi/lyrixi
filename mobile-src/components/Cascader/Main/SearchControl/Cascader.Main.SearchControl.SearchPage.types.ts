import type { ReactNode } from 'react'

import type { CascaderItem } from '../../types/Cascader.common.types'

// 内库使用-start
import type { ToolBarSearchActiveProps } from '../../../ToolBar/types/index'
// 内库使用-end

export type CascaderMainSearchPagePathNode = CascaderItem & { path?: CascaderItem[] }

export interface CascaderMainSearchPageResultItem {
  path: CascaderItem[]
  name?: ReactNode
  id?: string | number
  [key: string]: unknown
}

// {@link Cascader.Main} 搜索页结果，形态对齐 Bridge `{ status, code, data }`
export interface CascaderMainSearchPageSearchResult {
  status: string
  code?: string
  message?: ReactNode
  data?: { list: CascaderMainSearchPageResultItem[] }
}

export interface CascaderMainSearchPageProps {
  // Value & Display Value

  list: CascaderItem[]
  onSearch?: (
    keyword: string,
    options: { list: CascaderItem[] }
  ) =>
    | void
    | CascaderMainSearchPageSearchResult
    | Promise<CascaderMainSearchPageSearchResult | void>
  onChange?: (value: CascaderItem[]) => void
  onClose?: () => void
}

// 与 ToolBar.SearchActive 的 props 一致
export type CascaderMainSearchPageSearchActiveBarProps = ToolBarSearchActiveProps
