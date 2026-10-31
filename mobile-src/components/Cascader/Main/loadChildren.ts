import type { CascaderItem, LoadDataFn } from '../types'

import type { CascaderMainLoadChildrenResult } from '../types'

// 内库使用-start
import ArrayUtil from '../../../utils/ArrayUtil'
// 内库使用-end

/* 测试使用-start
import { ArrayUtil } from 'lyrixi-mobile'
测试使用-end */

async function loadChildren(
  tabs: CascaderItem[],
  {
    externalLoadData,
    externalList
  }: {
    externalLoadData?: LoadDataFn
    externalList: CascaderItem[]
  }
): Promise<CascaderMainLoadChildrenResult> {
  if (!Array.isArray(tabs) || !tabs.length) {
    return {
      status: 'success',
      data: { list: externalList, async: false }
    }
  }

  const lastTabId = tabs?.[tabs?.length - 1]?.id
  const node =
    lastTabId !== undefined
      ? (ArrayUtil.getDeepTreeNode(
          externalList as Parameters<typeof ArrayUtil.getDeepTreeNode>[0],
          lastTabId
        ) as CascaderItem | null)
      : null

  if (node && Array.isArray(node.children)) {
    return {
      status: 'success',
      data: { list: node.children, async: false }
    }
  }

  if (node?.isLeaf || typeof externalLoadData !== 'function') {
    return {
      status: 'empty',
      data: { list: [], async: false }
    }
  }

  const result = await externalLoadData(tabs, { list: externalList })
  return {
    status: result.status as CascaderMainLoadChildrenResult['status'],
    code: result.code,
    message: result.message,
    data: {
      ...(result.data ?? {}),
      async: true
    }
  }
}

export default loadChildren
