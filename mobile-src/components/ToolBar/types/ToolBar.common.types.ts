// 内库使用-start
import type { ListItem } from '../../List/types'
// 内库使用-end

// ToolBar.List 对外列表项（扁平；与 List 一致，无 children）
export type ToolBarItem = ListItem

export interface ToolBarComboRef {
  element: HTMLDivElement | null
}
