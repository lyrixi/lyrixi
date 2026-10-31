import type { ArrayUtilDeepTreeNodeWithParent, ArrayUtilFlatTreeNode } from './types'

/* -----------------------------------------------------
  树数据深度化, 将树的parentid深度为children, 必须有id和parentid
  @格式 [{id: '', name: '', parentid: ''}, {id: '', name: '', parentid: ''}]
  @return [{id: '', name: '', children: {}}]
 ----------------------------------------------------- */
function deepTree(flattenTree: ArrayUtilFlatTreeNode[]): ArrayUtilDeepTreeNodeWithParent[] {
  if (!Array.isArray(flattenTree) || !flattenTree.length) {
    return []
  }

  const idMap: Record<string | number, ArrayUtilDeepTreeNodeWithParent> = {}
  const result: ArrayUtilDeepTreeNodeWithParent[] = []

  flattenTree.forEach((node) => {
    idMap[node.id] = { ...node }
  })

  flattenTree.forEach((node) => {
    const parentId = node.parentid
    if (parentId !== null && parentId !== undefined && idMap[parentId]) {
      if (!idMap[parentId].children) idMap[parentId].children = []
      idMap[parentId].children!.push(idMap[node.id])
    } else {
      result.push(idMap[node.id])
    }
  })

  return result
}

export default deepTree
