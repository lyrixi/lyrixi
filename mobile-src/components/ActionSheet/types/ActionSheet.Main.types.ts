import type { CSSProperties, ReactNode } from 'react'

import type { ListItem } from '../../List/types'

export interface ActionSheetMainRef {
  element: HTMLElement | null
}

export interface ActionSheetMainProps {
  // Value & Display Value
  id?: string
  value?: ListItem | null
  list?: ListItem[]
  // Style
  itemStyle?: CSSProperties
  itemClassName?: string
  groupStyle?: CSSProperties
  groupClassName?: string
  // Elements
  title?: ReactNode
  cancel?: ReactNode
  cancelVisible?: boolean
  itemRender?: (item: ListItem, options: { onChange: (item: ListItem) => void }) => ReactNode
  // Events
  onChange?: (item: ListItem) => void
  onCancel?: () => void
  onClose?: () => void
}
