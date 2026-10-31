import type { ArrayUtilFlatTreeNode } from './types'

import getFlatTreeNode from './getFlatTreeNode'

// 根据id, 取出此id的父级节点
function getFlatTreeParentNode(
  tree: ArrayUtilFlatTreeNode[],
  id: string | number
): ArrayUtilFlatTreeNode | null {
  const parentId = getFlatTreeNode(tree, id)?.parentid
  if (parentId !== null) {
    return getFlatTreeNode(tree, parentId as string | number)
  }
  return null
}

export default getFlatTreeParentNode
