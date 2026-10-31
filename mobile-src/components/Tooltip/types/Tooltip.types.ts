import type { CSSProperties, ReactNode, RefObject } from 'react'

// 内库使用-start
import type { ComboRef } from '../../Combo/types'
import type { ModalProps } from '../../Modal/types'
// 内库使用-end

export interface TooltipProps {
  // Value & Display Value
  id?: string

  // Status
  maskClosable?: boolean
  // Style
  style?: CSSProperties
  className?: string
  animation?: string
  modalStyle?: CSSProperties
  modalClassName?: string
  maskStyle?: CSSProperties
  maskClassName?: string
  // Elements
  children?: ReactNode
  comboRender?: (options: {
    comboRef: RefObject<ComboRef | null>
    open: boolean | null
    onClick: () => void
  }) => ReactNode
  modalRender?: (options: { open: boolean | null; onClose: () => void }) => ReactNode
  referenceElement?: Element | null | (() => Element | null)
  portal?: ModalProps['portal']
  // Events
  onBeforeOpen?: () => boolean | void | Promise<boolean | void>
  onOpen?: () => void
  onClose?: () => void
}
