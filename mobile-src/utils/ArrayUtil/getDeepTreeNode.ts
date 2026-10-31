import type { ArrayUtilDeepTreeNode } from './types'

// 根据id, 取出此id节点的数据, 即{id: '', name: '', parentid: ''}
function getDeepTreeNode(
  tree: ArrayUtilDeepTreeNode[],
  id: string | number
): ArrayUtilDeepTreeNode | null {
  for (const node of tree) {
    if (node.id === id) {
      return node
    }
    if (node.children) {
      const result = getDeepTreeNode(node.children, id)
      if (result) return result
    }
  }
  return null
}

export default getDeepTreeNode
