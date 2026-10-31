import type { CascaderItem } from '../types'

// 按 anchor 插入分组头，供 ListAsync / 可见项判定使用
function flattenListWithAnchors(list: CascaderItem[] | undefined | null): CascaderItem[] {
  if (!Array.isArray(list) || !list.length) return []

  const indexes: Record<string, boolean> = {}
  const flatList: CascaderItem[] = []

  for (const item of list) {
    if (item.anchor && !indexes[item.anchor]) {
      indexes[item.anchor] = true
      flatList.push({
        id: item.anchor,
        name: item.anchor,
        anchor: item.anchor,
        type: 'group'
      } as CascaderItem)
    }
    flatList.push(item)
  }

  return flatList
}

export default flattenListWithAnchors
