import type { DistrictType } from '../../types/Cascader.DistrictMain.utils.formatType.types'

// 比较类型, 大于等于返回1, 小于返回-1, 等于返回0
function compareType(type1: DistrictType | string, type2: DistrictType | string): number | null {
  const sorts: string[] = ['country', 'province', 'city', 'district', 'street']
  const type1Index = sorts.indexOf(type1)
  const type2Index = sorts.indexOf(type2)
  if (typeof type1Index === 'number' && typeof type2Index === 'number') {
    if (type1Index !== type2Index) {
      return type1Index > type2Index ? 1 : -1
    } else {
      return 0
    }
  }
  return null
}

export default compareType
