import type { ListItem } from '../../List/types'
import type { CascaderMainAnchorItem } from '../types'

// 获取 IndexBar 的 list
function getAnchors(list: CascaderMainAnchorItem[]): ListItem[] {
  if (!Array.isArray(list) || list.length === 0) return []
  const anchors: ListItem[] = []
  for (const item of list) {
    if (item.anchor && !anchors.some((a) => a.id === item.anchor)) {
      anchors.push({ id: item.anchor, name: item.anchor })
    }
  }
  return anchors
}

export default getAnchors
