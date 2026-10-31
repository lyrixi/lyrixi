import type { ArrayUtilDeepTreeNodeWithParent } from './types'

function updateDeepTreeParentId(
  tree: ArrayUtilDeepTreeNodeWithParent[],
  parentid: string | number | null = null
): ArrayUtilDeepTreeNodeWithParent[] {
  if (!Array.isArray(tree) || !tree.length) return tree

  for (const node of tree) {
    node.parentid = parentid
    if (Array.isArray(node.children) && node.children.length) {
      updateDeepTreeParentId(node.children, node.id)
    }
  }
  return tree
}

export default updateDeepTreeParentId
