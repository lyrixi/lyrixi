import React from 'react'
import type { ListPaginationItem, ListPaginationViewItem } from 'lyrixi-mobile'

function formatViewItem(
  item: ListPaginationItem,
  { index = 0 }: { index: number } = { index: 0 }
): ListPaginationViewItem {
  return {
    _raw: item,
    id: item.id ?? index,
    imageUrl: typeof item.imageUrl === 'string' ? item.imageUrl : '',
    avatarUrl: typeof item.avatarUrl === 'string' ? item.avatarUrl : '',
    title: item.name,
    description: item.introduce as ListPaginationViewItem['description'],
    note: item.note as ListPaginationViewItem['note'],
    content: item.content as ListPaginationViewItem['content'],
    actionRender: (row: ListPaginationItem & { checked?: boolean }) => {
      return <div>Click {String(row.name ?? '')}</div>
    }
  }
}

export default formatViewItem
