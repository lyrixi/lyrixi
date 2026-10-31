import type { ToolBarItem } from '../types/ToolBar.common.types'

export interface ToolBarListBarProps {
  value?: ToolBarItem | ToolBarItem[] | null
  list: ToolBarItem[]
  onChange?: (
    value: ToolBarItem | ToolBarItem[] | null,
    options?: { action?: string; currentItem: ToolBarItem }
  ) => void
}
