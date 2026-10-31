import type { ArrayUtilFlatTreeNode } from './types'

// 根据id, 取出此id节点的数据, 即[{id: '', name: '', parentid: ''}]
function getFlatTreeNodes(
  tree: ArrayUtilFlatTreeNode[],
  filter: (node: ArrayUtilFlatTreeNode) => boolean
): ArrayUtilFlatTreeNode[] {
  const result: ArrayUtilFlatTreeNode[] = []
  for (const node of tree) {
    if (filter(node)) {
      result.push(node)
    }
  }
  return result
}

export default getFlatTreeNodes
