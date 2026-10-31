// {@link Cascader.DistrictMain} API 成功时 `data`
export interface DistrictMainApiResultData {
  list?: unknown[]
}

// 行政区划 API 通用返回，形态对齐 Bridge `{ status, code, data }`
export interface DistrictMainApiResult {
  status: 'success' | 'error' | 'empty'
  code?: string
  message?: string
  data?: DistrictMainApiResultData
}

// 地区数据加载结果状态（与 `DistrictMainApiResult` 同形）
export type DistrictResultState = DistrictMainApiResult

// api/index 聚合层使用的树节点
export interface DistrictMainApiDistrictNode {
  id: string | number
  name?: string
  type?: string[]
  isLeaf?: boolean
  parentid?: string | number
  children?: DistrictMainApiDistrictNode[]
  [key: string]: unknown
}

// formatCountryRegions 入参树节点
export interface DistrictFormatCountryRegionsNode {
  id: string | number
  name?: string
  parentid?: string | number
  nature?: number | string
  type?: string[]
  anchor?: string
  isLeaf?: boolean
  children?: DistrictFormatCountryRegionsNode[]
  [key: string]: unknown
}
