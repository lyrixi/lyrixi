import type { CSSProperties, MouseEvent, ReactNode, RefObject } from 'react'

// 内库使用-start
import type { ButtonProps, ButtonRef } from '../../Button/types'
import type { ModalProps } from '../../Modal/types'
// 内库使用-end

export interface ToolBarFilterRef {
  element: HTMLDivElement | null
  close: () => void
  open: () => void
}

export interface ToolBarFilterProps {
  // Value & Display Value
  id?: string

  // Style
  direction?: ButtonProps['direction']
  block?: boolean
  style?: CSSProperties
  className?: string
  color?: ButtonProps['color']
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  square?: boolean
  fontSize?: ButtonProps['fontSize']
  radius?: ButtonProps['radius']
  maskStyle?: CSSProperties
  maskClassName?: string
  modalStyle?: CSSProperties
  modalClassName?: string
  // Elements
  children?: ReactNode
  comboRender?: (options: {
    comboRef: RefObject<ButtonRef | null>
    open: boolean | null
    onClick: (e: MouseEvent<HTMLDivElement>) => void
  }) => ReactNode
  modalRender?: (options: { open: boolean | null; onClose: () => void }) => ReactNode
  portal?: ModalProps['portal']
  footerRender?: (options: { onClose?: ModalProps['onClose'] }) => ReactNode
  // Events
  onCancel?: () => void
  onOpen?: () => void
  onClose?: () => void
  onConfig?: () => void
  onReset?: () => void
  onOk?: (options: { close: () => void }) => void
  icon?: ReactNode
}
