import type { CascaderItem } from '../types'

// 截取此id前面的array
function sliceArray(arr: CascaderItem[], id: string | number): CascaderItem[] {
  const index = Array.isArray(arr) && arr.length ? arr.findIndex((item) => item.id === id) : -1
  if (index === -1) return []
  return arr.slice(0, index + 1)
}

export default sliceArray
