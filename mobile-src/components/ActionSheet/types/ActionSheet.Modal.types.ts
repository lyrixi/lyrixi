import type { CSSProperties, ReactNode } from 'react'

import type { ListItem } from '../../List/types'

// 内库使用-start
import type { ModalProps } from '../../Modal/types'
// 内库使用-end

export interface ActionSheetModalProps {
  // Value & Display Value
  id?: string
  value?: ListItem | null
  list?: ListItem[]
  // Status
  open?: boolean
  maskClosable?: boolean
  allowClear?: boolean
  // Style
  safeArea?: boolean
  modalStyle?: CSSProperties
  modalClassName?: string
  maskStyle?: CSSProperties
  maskClassName?: string
  itemStyle?: CSSProperties
  itemClassName?: string
  groupStyle?: CSSProperties
  groupClassName?: string
  // Elements
  portal?: ModalProps['portal']
  title?: ReactNode
  cancel?: ReactNode
  cancelVisible?: boolean
  itemRender?: (item: ListItem, options: { onChange: (item: ListItem) => void }) => ReactNode
  // Events
  onChange?: (value: ListItem | null) => void
  onCancel?: () => void
  onClose?: () => void
}
