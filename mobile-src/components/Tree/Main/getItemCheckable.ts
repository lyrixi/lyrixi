import React from 'react'

import type { TreeCheckable } from '../types'

// 内库使用-start
import type { ListItem, ListViewItem } from '../../List/types'
// 内库使用-end

export default function getItemCheckable(
  item: ListItem,
  viewItem: ListViewItem,
  checkable: TreeCheckable
): boolean {
  // 已经设置checkable的项，直接返回
  if (typeof viewItem.checkable === 'boolean') {
    return viewItem.checkable
  }

  // 仅允许末级节点checkable
  if (checkable === 'leaf') {
    if (item.isLeaf) {
      return true
    }
    return false
  }

  // 允许全部节点checkable
  if (checkable === true) {
    return true
  }

  // 默认不让checkable
  return false
}
