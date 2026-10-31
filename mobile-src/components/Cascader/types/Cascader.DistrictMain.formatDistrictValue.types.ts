export interface DistrictItem {
  id?: string | number
  parentid?: string | number
  type?: string[] | string
  isLeaf?: boolean
  [key: string]: unknown
}
