import type { ReactNode } from 'react'

import type { ToolBarDropdownProps } from './ToolBar.Dropdown.types'
import type { ToolBarItem } from './ToolBar.common.types'

export interface ToolBarListProps extends Omit<ToolBarDropdownProps, 'children' | 'modalRender'> {
  // Value & Display Value
  id?: string

  value?: ToolBarItem | ToolBarItem[] | null
  placeholder?: string
  list: ToolBarItem[]
  children?: ReactNode
  onChange?: (value: ToolBarItem | ToolBarItem[] | null) => void
}
