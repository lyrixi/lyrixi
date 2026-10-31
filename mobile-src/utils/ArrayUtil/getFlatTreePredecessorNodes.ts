import type { ArrayUtilFlatTreeNode } from './types'

function getFlatTreePredecessorNodes(
  tree: ArrayUtilFlatTreeNode[],
  id: string | number
): ArrayUtilFlatTreeNode[] {
  const result: ArrayUtilFlatTreeNode[] = []

  const nodeMap: Record<string | number, ArrayUtilFlatTreeNode> = {}
  tree.forEach((node) => {
    nodeMap[node.id] = node
  })

  let currentNode: ArrayUtilFlatTreeNode | undefined = nodeMap[id]
  while (currentNode && currentNode['parentid'] !== null) {
    const parentNode: ArrayUtilFlatTreeNode | undefined =
      nodeMap[currentNode['parentid'] as string | number]
    if (parentNode) {
      result.unshift(parentNode)
      currentNode = parentNode
    } else {
      break
    }
  }

  return result
}

export default getFlatTreePredecessorNodes
