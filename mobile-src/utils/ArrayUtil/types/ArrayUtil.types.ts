// 扁平树节点（含 parentid）
export interface ArrayUtilFlatTreeNode extends Record<string, unknown> {
  id: string | number
  parentid?: string | number | null
}

// 深树节点（仅 id + children）
export interface ArrayUtilDeepTreeNode extends Record<string, unknown> {
  id: string | number
  children?: ArrayUtilDeepTreeNode[]
}

// 深树节点（含 parentid，用于 deepTree / updateDeepTreeParentId）
export interface ArrayUtilDeepTreeNodeWithParent extends Record<string, unknown> {
  id: string | number
  parentid?: string | number | null
  children?: ArrayUtilDeepTreeNodeWithParent[]
}

// flattenTree 输入
export interface ArrayUtilFlattenTreeDeepNode extends Record<string, unknown> {
  id: string | number
  name?: unknown
  children?: ArrayUtilFlattenTreeDeepNode[]
}

// flattenTree 输出
export interface ArrayUtilFlattenTreeFlatNode {
  id: string | number
  name?: unknown
  parentid: string | number | null
}
