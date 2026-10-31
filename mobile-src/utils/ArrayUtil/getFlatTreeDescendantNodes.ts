import type { ArrayUtilFlatTreeNode } from './types'

// 根据id, 取出此id的后代节点数据, 即[{id: '', name: '', parentid: ''}]
function getFlatTreeDescendantNodes(
  tree: ArrayUtilFlatTreeNode[],
  id: string | number
): ArrayUtilFlatTreeNode[] {
  const strId = String(id)
  const descendants: ArrayUtilFlatTreeNode[] = []

  function buildDescendants(nodes: ArrayUtilFlatTreeNode[], parentId: string): void {
    for (const item of nodes) {
      if (parentId && String(item['parentid']) === parentId) {
        descendants.push(item)
        buildDescendants(nodes, String(item['id']))
      }
    }
  }

  buildDescendants(tree, strId)
  return descendants
}

export default getFlatTreeDescendantNodes
