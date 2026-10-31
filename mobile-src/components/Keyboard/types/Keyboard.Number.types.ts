import type { CSSProperties, ReactNode } from 'react'

import type { KeyboardAction } from './Keyboard.common.types'

export interface KeyboardNumberRef {
  element: HTMLElement | null
}

export interface KeyboardNumberProps {
  // Value & Display Value
  id?: string
  value?: string
  dot?: boolean
  minus?: boolean
  // Status
  safeArea?: boolean
  open?: boolean
  okVisible?: boolean
  cancelVisible?: boolean
  // Style
  modalStyle?: CSSProperties
  modalClassName?: string
  // Elements
  portal?: HTMLElement
  ok?: ReactNode
  cancel?: ReactNode
  // Events
  onChange?: (value: string, options: { action: KeyboardAction }) => void
  onOk?: (value: string) => Promise<boolean | undefined> | boolean | undefined
  onCancel?: () => void
  onClose?: () => void
}
