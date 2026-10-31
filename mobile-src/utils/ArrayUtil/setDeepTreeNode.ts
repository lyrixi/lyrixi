import type { ArrayUtilDeepTreeNode } from './types'

function setDeepTreeNode(
  tree: ArrayUtilDeepTreeNode[],
  id: string | number,
  updateNode?: (node: ArrayUtilDeepTreeNode) => void
): ArrayUtilDeepTreeNode[] {
  for (const node of tree) {
    if (node.id === id) {
      updateNode?.(node)
      break
    }
    if (Array.isArray(node.children) && node.children.length) {
      setDeepTreeNode(node.children, id, updateNode)
    }
  }
  return tree
}

export default setDeepTreeNode
