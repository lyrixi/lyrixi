import type { ArrayUtilFlattenTreeDeepNode, ArrayUtilFlattenTreeFlatNode } from './types'

function flattenTree(deepTree: ArrayUtilFlattenTreeDeepNode[]): ArrayUtilFlattenTreeFlatNode[] {
  const result: ArrayUtilFlattenTreeFlatNode[] = []

  function traverse(
    nodes: ArrayUtilFlattenTreeDeepNode[],
    parentId: string | number | null = null
  ): void {
    nodes.forEach((item) => {
      const { id, name, children = [] } = item
      result.push({ id, name, parentid: parentId })
      if (Array.isArray(children) && children.length > 0) {
        traverse(children, id)
      }
    })
  }

  traverse(deepTree)
  return result
}

export default flattenTree
