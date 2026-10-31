import type { ListAsyncItem } from './../types'

// 距容器顶部该距离内即视为顶部可见项
const TOP_VISIBLE_OFFSET = 50

// 虚拟列表：按 virtualData.top 取当前顶部可见项
function getTopVisibleVirtualItem(
  items: (ListAsyncItem & { virtualData?: { top?: number } })[] | undefined | null,
  scrollTop: number,
  prependHeight: number
): ListAsyncItem | null {
  if (!items?.length) return null

  const offset = Math.max(0, scrollTop - prependHeight) + TOP_VISIBLE_OFFSET
  let topItem = items[0]

  for (let i = 0; i < items.length; i++) {
    const top = items[i].virtualData?.top
    if (typeof top === 'number' && top <= offset) {
      topItem = items[i]
    } else if (typeof top === 'number' && top > offset) {
      break
    }
  }

  return topItem
}

export default getTopVisibleVirtualItem
