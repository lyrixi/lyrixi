import type { TreeItem } from '../../types'
import type { ListLoadResult } from '../../../ListAsync/types'

// 内库使用-start
import ArrayUtil from './../../../../utils/ArrayUtil'
// 内库使用-end

/* 测试使用-start
import { ArrayUtil } from 'lyrixi-mobile'
测试使用-end */

function getChildrenByList(item: TreeItem | null, externalList: TreeItem[]): ListLoadResult {
  if (!item) {
    if (!externalList.length) {
      return { status: 'empty', data: { list: [] } }
    }
    return { status: 'noMore', data: { list: externalList } }
  }

  const node =
    item.id !== undefined
      ? (ArrayUtil.getDeepTreeNode(
          externalList as Parameters<typeof ArrayUtil.getDeepTreeNode>[0],
          item.id
        ) as TreeItem | null)
      : null

  if (node && Array.isArray(node.children)) {
    if (!node.children.length) {
      return { status: 'empty', data: { list: [] } }
    }
    return { status: 'noMore', data: { list: node.children } }
  }

  return { status: 'empty', data: { list: [] } }
}

export default getChildrenByList
