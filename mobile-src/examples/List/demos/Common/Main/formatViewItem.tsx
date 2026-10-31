import React from 'react'

import type { ListLoadResult, ListPaginationItem, ListPaginationViewItem } from 'lyrixi-mobile'

function formatViewItem(
  item: ListPaginationItem,
  _options: { index: number; result?: ListLoadResult | null }
): ListPaginationViewItem {
  return {
    _raw: item,
    id: item.id,
    imageUrl: (item.imageUrl as string | undefined) || '',
    avatarUrl: (item.avatarUrl as string | undefined) || '',
    title: item.name,
    description: item.introduce as ListPaginationViewItem['description'],
    note: item.note as ListPaginationViewItem['note'],
    content: item.content as ListPaginationViewItem['content'],
    actionRender: (it: ListPaginationViewItem & { checked?: boolean }) => {
      return <div>Click {String(it.name ?? '')}</div>
    }
  }
}

export default formatViewItem
