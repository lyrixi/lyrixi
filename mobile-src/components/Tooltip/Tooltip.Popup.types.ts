import type { CSSProperties, ReactNode } from 'react'

// 内库使用-start
import type { ModalProps } from '../Modal/types/index'
// 内库使用-end

export interface TooltipPopupRef {
  maskElement: HTMLDivElement | null
  modalElement: HTMLDivElement | null
}

export interface TooltipPopupProps {
  // Value & Display Value
  id?: string
  animation?: string
  // Status
  open?: boolean
  maskClosable?: boolean
  // Style
  modalStyle?: CSSProperties
  modalClassName?: string
  maskStyle?: CSSProperties
  maskClassName?: string
  // Elements
  portal?: ModalProps['portal']
  children?: ReactNode
  // Events
  onClose?: () => void
}
