import type { ArrayUtilDeepTreeNode } from './types'

// 更新末级节点
function setDeepTreeLeafNode(
  tree: ArrayUtilDeepTreeNode[],
  updateNode?: (node: ArrayUtilDeepTreeNode) => void
): ArrayUtilDeepTreeNode[] {
  for (const node of tree) {
    if (Array.isArray(node.children) && node.children.length) {
      setDeepTreeLeafNode(node.children, updateNode)
    } else {
      updateNode?.(node)
    }
  }
  return tree
}

export default setDeepTreeLeafNode
