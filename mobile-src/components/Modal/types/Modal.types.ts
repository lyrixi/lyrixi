import type { CSSProperties, MouseEvent, ReactNode } from 'react'

// Modal 动画类型
export type ModalAnimation =
  | 'none'
  | 'slideLeft'
  | 'slideRight'
  | 'slideUp'
  | 'slideDown'
  | 'zoom'
  | 'fade'
  | 'slideUpLeft'
  | 'zoomUpLeft'
  | 'fadeUpLeft'
  | 'slideDownLeft'
  | 'zoomDownLeft'
  | 'fadeDownLeft'
  | 'slideUpRight'
  | 'zoomUpRight'
  | 'fadeUpRight'
  | 'slideDownRight'
  | 'zoomDownRight'
  | 'fadeDownRight'

export interface ModalRef {
  maskElement: HTMLDivElement | null
  modalElement: HTMLDivElement | null
}

export interface ModalProps {
  // Value & Display Value
  id?: string
  animation?: ModalAnimation
  // Status
  open?: boolean
  maskClosable?: boolean
  safeArea?: boolean
  // Style
  modalStyle?: CSSProperties
  modalClassName?: string
  maskStyle?: CSSProperties
  maskClassName?: string
  // Elements
  portal?: HTMLElement | false | null
  children?: ReactNode
  // Events
  onClose?: (e?: MouseEvent<HTMLDivElement>) => void
}
