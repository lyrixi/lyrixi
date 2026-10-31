import type { ArrayUtilDeepTreeNode } from './types'

// 获取指定节点
function getDeepTreeNodes(
  tree: ArrayUtilDeepTreeNode[],
  filter: (node: ArrayUtilDeepTreeNode) => boolean
): ArrayUtilDeepTreeNode[] {
  const result: ArrayUtilDeepTreeNode[] = []

  function traverse(nodes: ArrayUtilDeepTreeNode[]): void {
    for (const node of nodes) {
      if (filter(node)) {
        result.push(node)
      }
      if (Array.isArray(node.children) && node.children.length) {
        traverse(node.children)
      }
    }
  }

  traverse(tree)
  return result
}

export default getDeepTreeNodes
