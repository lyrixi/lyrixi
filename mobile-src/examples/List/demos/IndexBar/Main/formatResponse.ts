import type { ListLoadResult, ListAsyncItem } from 'lyrixi-mobile'

import mockResult from './../../Common/Main/mockResult'

type IndexBarRawItem = {
  id?: string
  name?: string
  anchor?: string
  introduce?: string
  avatarUrl?: string
  imageUrl?: string
  note?: string
  content?: string
  [key: string]: unknown
}

// 转换 API 返回数据为页面所需格式（按 anchor 分组后拉平；仅分组头写 type: 'group'）
function localData(
  response: unknown,
  _options: { payload: Record<string, unknown> }
): ListLoadResult {
  // 测试数据
  // eslint-disable-next-line
  response = mockResult
  const r = response as {
    code?: string
    message?: string
    data?: { list?: IndexBarRawItem[]; totalPage?: number }
  }
  if (r.code === '1') {
    const list = r.data?.list
    const groupMap = new Map<string, IndexBarRawItem[]>()

    if (Array.isArray(list)) {
      list.forEach((item) => {
        const anchor = item.anchor
        if (!anchor) return
        if (!groupMap.has(anchor)) {
          groupMap.set(anchor, [])
        }
        groupMap.get(anchor)!.push(item)
      })
    }

    const flatList: ListAsyncItem[] = []
    Array.from(groupMap.keys())
      .sort((a, b) => a.localeCompare(b))
      .forEach((anchor) => {
        flatList.push({
          id: anchor,
          type: 'group',
          title: anchor,
          name: anchor,
          anchor
        })
        groupMap.get(anchor)!.forEach((item) => {
          flatList.push({ ...item })
        })
      })

    return {
      status: 'success',
      code: r.code,
      data: {
        list: flatList,
        totalPage: r.data?.totalPage
      }
    }
  }
  return {
    status: 'error',
    code: r.code,
    message: r.message
  }
}

export default localData
