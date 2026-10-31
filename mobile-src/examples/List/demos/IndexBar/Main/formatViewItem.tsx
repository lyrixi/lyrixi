import React, { type ReactNode } from 'react'

import type { ListPaginationItem, ListPaginationViewItem } from 'lyrixi-mobile'

// 格式化扁平 list：仅 type: 'group' 为分组头，缺省为普通项
function formatViewItem(
  item: ListPaginationItem,
  _options: { index: number }
): ListPaginationViewItem {
  if (item.type === 'group') {
    return {
      _raw: item,
      id: item.id ?? (item.anchor as ListPaginationViewItem['id']),
      type: 'group',
      title: (item.title ?? item.name ?? item.anchor) as ReactNode
    }
  }

  return {
    _raw: item,
    id: item.id,
    imageUrl: String((item as Record<string, unknown>).imageUrl ?? ''),
    avatarUrl: String((item as Record<string, unknown>).avatarUrl ?? ''),
    title: item.name,
    description: (item as Record<string, unknown>).introduce as ReactNode,
    note: (item as Record<string, unknown>).note as ReactNode,
    content: (item as Record<string, unknown>).content as ReactNode,
    actionRender: (actionRow: ListPaginationItem & { checked?: boolean }) => {
      const name = (actionRow as Record<string, unknown>).name
      return <div>Click {name as ReactNode}</div>
    }
  }
}

export default formatViewItem
