import type { MouseEvent, ReactNode, RefObject } from 'react'
import type { ToolBarComboRef } from './ToolBar.common.types'
import type { ToolBarComboProps } from '../components/ToolBar.Combo.types'

// 内库使用-start
import type { ModalDropdownModalProps } from '../../Modal/types'
// 内库使用-end

export interface ToolBarDropdownRef {
  element?: HTMLDivElement | null
  close: () => void
  open: () => void
}

export interface ToolBarDropdownProps
  extends ToolBarComboProps,
    Omit<ModalDropdownModalProps, 'open'> {
  // Value & Display Value
  id?: string

  comboRender?: (options: {
    comboRef: RefObject<ToolBarComboRef | null>
    open: boolean | null
    onClick: (e: MouseEvent) => void | Promise<void>
  }) => ReactNode
  modalRender?: (options: { open: boolean | null; onClose: () => void }) => ReactNode
  onBeforeOpen?: () => boolean | void | Promise<boolean | void>
  onOpen?: () => void
  onClose?: () => void
}
