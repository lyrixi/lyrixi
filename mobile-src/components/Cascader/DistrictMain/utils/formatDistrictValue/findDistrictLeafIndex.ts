import type { DistrictItem } from '../../../types'

// 判断value中是否有某一项为末级，返回该项的索引（0开始），没有则返回-1
function findDistrictLeafIndex(value: DistrictItem | DistrictItem[], maxType: string): number {
  if (
    Array.isArray((value as DistrictItem).type) &&
    ((value as DistrictItem).type as string[]).includes(maxType)
  ) {
    return 0
  }

  if (!Array.isArray(value) || (value as DistrictItem[]).length === 0) return -1

  const arr = value as DistrictItem[]
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item.isLeaf) {
      return i
    }

    if (!item || !item.type) continue
    if (Array.isArray(item.type)) {
      if (item.type.includes(maxType)) {
        return i
      }
    } else {
      if (item.type === maxType) {
        return i
      }
    }
  }
  return -1
}

export default findDistrictLeafIndex
