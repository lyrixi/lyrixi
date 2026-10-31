import type { ListItem } from '../../List/types'

// formatValue 等工具使用的 tab 节点
export interface CascaderTab {
  id?: string | number
  parentid?: string | number
  [key: string]: unknown
}

// Main / Modal / Combo 共用的级联项数据
export interface CascaderItem extends Omit<ListItem, 'id' | 'name'> {
  id: string | number
  name?: string
  anchor?: string
  isLeaf?: boolean
  isChoose?: boolean
  parentid?: string | number | null
  children?: CascaderItem[]
}

// {@link Cascader} loadData 成功时 `data`
export interface LoadDataResultData {
  list?: CascaderItem[]
  async?: boolean
}

// {@link Cascader} loadData 返回结果，形态对齐 Bridge `{ status, code, data }`
export type LoadDataResult = {
  status: string
  code?: string
  message?: string
  data?: LoadDataResultData
}

export type LoadDataFn = (
  tabs: CascaderItem[],
  options: { list: CascaderItem[] }
) => Promise<LoadDataResult>
