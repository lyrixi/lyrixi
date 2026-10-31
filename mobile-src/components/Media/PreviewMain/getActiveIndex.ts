// 内库使用-start
import type { FileItem } from './../../../utils/Bridge/types'
// 内库使用-end

// 当前选中项
function getActiveIndex({ index, list }: { index?: number; list?: FileItem[] }) {
  if (!Array.isArray(list) || !list.length) return 0

  let activeIndex = 0
  // Current is index
  if (typeof index === 'number') {
    activeIndex = index
  }

  if (activeIndex > list.length) {
    return 0
  }

  return activeIndex
}

export default getActiveIndex
