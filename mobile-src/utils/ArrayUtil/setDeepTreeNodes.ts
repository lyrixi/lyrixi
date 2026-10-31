import type { ArrayUtilDeepTreeNode } from './types'

// Recurse tree, set node
function setDeepTreeNodes(
  tree: ArrayUtilDeepTreeNode[],
  updateNode?: (node: ArrayUtilDeepTreeNode) => void
): ArrayUtilDeepTreeNode[] {
  for (const node of tree) {
    updateNode?.(node)
    if (Array.isArray(node.children) && node.children.length) {
      setDeepTreeNodes(node.children, updateNode)
    }
  }
  return tree
}

export default setDeepTreeNodes
