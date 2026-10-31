import type { CSSProperties, ReactNode } from 'react'

import type { ModalProps, ModalRef } from './Modal.types'

export type ModalNavBarModalRef = ModalRef

export interface ModalNavBarModalProps
  extends Pick<
    ModalProps,
    | 'open'
    | 'maskClosable'
    | 'safeArea'
    | 'modalStyle'
    | 'modalClassName'
    | 'maskStyle'
    | 'maskClassName'
    | 'portal'
    | 'children'
    | 'onClose'
  > {
  // Value & Display Value
  id?: string

  navBarStyle?: CSSProperties
  navBarClassName?: string
  title?: ReactNode
  ok?: ReactNode
  okVisible?: boolean
  okPlacement?: 'left' | 'right'
  cancel?: ReactNode
  cancelVisible?: boolean
  cancelPlacement?: 'left' | 'right'
  onCancel?: () => void
  onOk?: () => boolean | void | Promise<boolean | void>
}
