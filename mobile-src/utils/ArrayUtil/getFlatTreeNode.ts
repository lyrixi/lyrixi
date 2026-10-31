import type { ArrayUtilFlatTreeNode } from './types'

// 根据id, 取出此id节点的数据, 即{id: '', name: '', parentid: ''}
function getFlatTreeNode(
  tree: ArrayUtilFlatTreeNode[],
  id: string | number
): ArrayUtilFlatTreeNode | null {
  for (const node of tree) {
    if (node.id === id) {
      return node
    }
  }
  return null
}

export default getFlatTreeNode
