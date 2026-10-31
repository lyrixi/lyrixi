import type { CSSProperties, ReactNode } from 'react'

export interface LoadingProps {
  // Value & Display Value
  id?: string
  content?: ReactNode
  // Style
  modalStyle?: CSSProperties
  modalClassName?: string
  maskStyle?: CSSProperties
  maskClassName?: string
  // Elements
  portal?: Element | DocumentFragment
  iconRender?: () => ReactNode
  children?: ReactNode
}

export interface LoadingRef {
  element: HTMLDivElement | null
}
