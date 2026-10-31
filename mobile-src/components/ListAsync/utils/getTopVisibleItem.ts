import type { ListAsyncItem } from './../types'

// 距容器顶部该距离内即视为顶部可见项
const TOP_VISIBLE_OFFSET = 50

// 实体列表：按 DOM 位置取当前顶部可见项
function getTopVisibleItem(
  list: ListAsyncItem[] | undefined | null,
  scrollerElement: HTMLElement | null | undefined
): ListAsyncItem | null {
  if (!scrollerElement || !list?.length) return null

  const scrollerTop = scrollerElement.getBoundingClientRect().top
  let topItem: ListAsyncItem | null = null

  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (!item?.id) continue
    const el = document.getElementById(String(item.id))
    if (!el || !scrollerElement.contains(el)) continue

    if (el.getBoundingClientRect().top <= scrollerTop + TOP_VISIBLE_OFFSET) {
      topItem = item
    } else {
      return topItem || item
    }
  }

  return topItem || list[0]
}

export default getTopVisibleItem
