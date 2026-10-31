import type { ArrayUtilDeepTreeNode } from './types'

// 取出所有先辈节点
function getDeepTreePredecessorNodes(
  tree: ArrayUtilDeepTreeNode[],
  id: string | number
): ArrayUtilDeepTreeNode[] {
  const predecessorNodes: ArrayUtilDeepTreeNode[] = []

  function traverse(nodes: ArrayUtilDeepTreeNode[], targetId: string | number): boolean {
    for (const node of nodes) {
      if (node.id === targetId) {
        return true
      }
      if (Array.isArray(node.children) && node.children.length > 0) {
        if (traverse(node.children, targetId)) {
          predecessorNodes.unshift(node)
          return true
        }
      }
    }
    return false
  }

  traverse(tree, id)
  return predecessorNodes
}

export default getDeepTreePredecessorNodes
