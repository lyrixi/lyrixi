import type { DistrictItem } from '../../../types'

// 按照行政区划类型顺序排序
function sortValue(value: DistrictItem[]): DistrictItem[] {
  if (!Array.isArray(value)) return value

  const typeOrder = ['country', 'province', 'city', 'district', 'street']

  function getTypeIndex(item: DistrictItem): number {
    if (!item || !Array.isArray(item.type)) return Number.MAX_SAFE_INTEGER
    let minIndex = Number.MAX_SAFE_INTEGER
    for (const t of item.type) {
      const idx = typeOrder.indexOf(t)
      if (idx !== -1 && idx < minIndex) {
        minIndex = idx
      }
    }
    return minIndex
  }

  return value.sort((a, b) => {
    return getTypeIndex(a) - getTypeIndex(b)
  })
}

export default sortValue
