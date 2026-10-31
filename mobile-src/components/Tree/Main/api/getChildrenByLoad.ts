// import type { RefObject } from 'react'
// 兼容React 18之前版本，React 18 之后，MutableRefObject 是 RefObject 的子类型
import type { MutableRefObject } from 'react'

import getChildrenByList from './getChildrenByList'

import type { TreeItem, TreeLoadDataFn } from '../../types'
import type { ListLoadResult } from '../../../ListAsync/types'

// 内库使用-start
import ArrayUtil from './../../../../utils/ArrayUtil'
// 内库使用-end

/* 测试使用-start
import { ArrayUtil } from 'lyrixi-mobile'
测试使用-end */

async function getChildrenByLoad(
  item: TreeItem | null,
  loadData: TreeLoadDataFn,
  // loadDataListRef: RefObject<TreeItem[]>
  // 兼容React 18之前版本，React 18 之后，MutableRefObject 是 RefObject 的子类型
  loadDataListRef: MutableRefObject<TreeItem[]>
): Promise<ListLoadResult> {
  const cached = getChildrenByList(item, loadDataListRef.current)
  const cachedList = cached.data?.list
  if (cached.status === 'noMore' && Array.isArray(cachedList) && cachedList.length) {
    return cached
  }

  const result = await loadData(item)
  const loadedList = result.data?.list
  if (result.status === 'success' && Array.isArray(loadedList) && loadedList.length) {
    const children = loadedList as TreeItem[]
    // 根层级就是缓存列表；子层级挂到已缓存节点的 children
    if (!item) {
      loadDataListRef.current = children
    } else {
      const node = ArrayUtil.getDeepTreeNode(
        loadDataListRef.current as Parameters<typeof ArrayUtil.getDeepTreeNode>[0],
        item.id
      ) as TreeItem | null
      if (node) {
        node.children = children
      }
    }
  }

  if (result.status === 'error') {
    return {
      status: 'error',
      message: result.message
    }
  }

  if (result.status === 'empty') {
    return {
      status: 'empty',
      message: result.message,
      data: result.data
    }
  }

  const list = result.data?.list ?? []
  if (!list.length) {
    return {
      status: 'empty',
      message: result.message,
      data: { list: [] }
    }
  }

  return {
    status: 'noMore',
    message: result.message,
    data: { list }
  }
}

export default getChildrenByLoad
