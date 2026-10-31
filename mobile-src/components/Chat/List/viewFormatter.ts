import type { ChatItem, ChatViewFormatterParams, ChatViewItem } from './../types'

// 格式化列表数据为渲染数据, 用于渲染列表组件
function viewFormatter(
  list: ChatItem[] | undefined,
  params: ChatViewFormatterParams
): ChatViewItem[] | undefined {
  const { formatViewItem } = params

  if (typeof formatViewItem === 'function') {
    return list?.map((item, index) => {
      return { _raw: item, ...formatViewItem(item, { index }) }
    })
  }

  return list?.map((item) => {
    if (!item._raw) {
      return { ...item, _raw: item } as ChatViewItem
    }
    return item as ChatViewItem
  })
}

export default viewFormatter
