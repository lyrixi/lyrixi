import constant from './constant'

import type {
  ListAsyncVirtualListGetVisibleItemsParams,
  ListAsyncVirtualListVirtualItem
} from './ListAsync.VirtualList.types'

// 计算可见区域元素
function getVisibleItems(
  params: ListAsyncVirtualListGetVisibleItemsParams
): ListAsyncVirtualListVirtualItem[] {
  const { prependHeight, items, itemHeights, scrollTop, containerHeight } = params
  if (!Array.isArray(items) || !items.length) return []
  const scrollTopValue = scrollTop ?? 0
  // 计算每一项的 top 值和高度
  for (let index = 0; index < items.length; index++) {
    const item = items[index]
    const itemHeight = itemHeights[index]
    const top =
      index === 0 ? 0 : items[index - 1].virtualData.top + items[index - 1].virtualData.height
    item.virtualData = {
      type: item.virtualData?.type || undefined,
      height: itemHeight,
      top: top,
      index: index
    }
  }

  // 计算可见区域的起始索引
  let startIndex = 0
  while (
    items[startIndex] &&
    items[startIndex].virtualData.top < scrollTopValue - prependHeight - constant.startBuffer
  ) {
    startIndex++
  }

  // 计算可见区域的结束索引
  let endIndex = startIndex
  while (
    items[endIndex] &&
    items[endIndex].virtualData.top < scrollTopValue + containerHeight + constant.endBuffer
  ) {
    endIndex++
  }

  // 渲染可见区域的元素
  const visibleItems = items.slice(startIndex, endIndex)

  return visibleItems
}

export default getVisibleItems
