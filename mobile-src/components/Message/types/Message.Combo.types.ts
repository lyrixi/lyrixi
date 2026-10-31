import type { CSSProperties, ReactNode } from 'react'

import type { MessageModalProps } from './Message.Modal.types'

export interface MessageComboRef {
  element: HTMLDivElement | null
  open?: () => void
  close?: () => void
}

export interface MessageComboProps extends Omit<MessageModalProps, 'open'> {
  // Value & Display Value
  id?: string

  onOpen?: () => void
  open?: boolean
  className?: string
  style?: CSSProperties
  children?: ReactNode
}
