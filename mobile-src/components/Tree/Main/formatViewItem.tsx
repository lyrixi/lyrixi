import React from 'react'

import type { ListItem, ListViewItem } from '../../List/types'
import type { TreeDefaultAvatar } from './DefaultAvatar'

// 内库使用-start
import DOMUtil from '../../../utils/DOMUtil'
// 内库使用-end

export interface DefaultAvatar {
  parentDefaultAvatar?: TreeDefaultAvatar
  leafDefaultAvatar?: TreeDefaultAvatar
}

export default function formatTreeViewItem(
  item: ListItem,
  _options: { index: number },
  defaultAvatar: DefaultAvatar
): ListViewItem {
  const { parentDefaultAvatar, leafDefaultAvatar } = defaultAvatar

  // 不传时保持 undefined，列表项不渲染头像
  let avatarSvg = item.avatarSvg as ListViewItem['avatarSvg']
  let avatarUrl = item.avatarUrl as ListViewItem['avatarUrl']

  // 没有设置头像时，使用默认头像
  if (!avatarSvg && !avatarUrl) {
    avatarSvg = !item.isLeaf ? parentDefaultAvatar?.svg : leafDefaultAvatar?.svg
    avatarUrl = !item.isLeaf ? parentDefaultAvatar?.url : leafDefaultAvatar?.url
  }

  return {
    ...item,
    title: item.name,
    className: DOMUtil.classNames(!item.isLeaf ? 'lyrixi-tree-item-drillable' : ''),
    avatarUrl,
    avatarSvg,
    arrowVisible: !item.isLeaf ? true : false
  }
}
