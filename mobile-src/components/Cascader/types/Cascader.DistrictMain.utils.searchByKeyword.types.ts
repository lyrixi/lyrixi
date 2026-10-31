export interface DistrictSearchByKeywordNode {
  id: string | number
  name?: string
  type?: string[]
  children?: DistrictSearchByKeywordNode[]
  path?: DistrictSearchByKeywordNode[]
  [key: string]: unknown
}

// {@link Cascader.DistrictMain} 关键字搜索结果
export interface DistrictSearchByKeywordResult {
  status: 'success' | 'empty'
  code?: string
  message: string
  data: { list: DistrictSearchByKeywordNode[] }
}
