import type { ArrayUtilDeepTreeNode } from './types'

// 获取末级节点
function getDeepTreeLeafNodes(tree: ArrayUtilDeepTreeNode[]): ArrayUtilDeepTreeNode[] {
  const leafNodes: ArrayUtilDeepTreeNode[] = []

  function traverse(nodes: ArrayUtilDeepTreeNode[]): void {
    for (const node of nodes) {
      if (Array.isArray(node.children) && node.children.length > 0) {
        traverse(node.children)
      } else {
        leafNodes.push(node)
      }
    }
  }

  traverse(tree)
  return leafNodes
}

export default getDeepTreeLeafNodes
