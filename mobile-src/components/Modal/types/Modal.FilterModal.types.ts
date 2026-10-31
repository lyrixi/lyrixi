import type { MouseEvent, ReactNode } from 'react'

import type { ModalProps, ModalRef } from './Modal.types'

export type ModalFilterModalRef = ModalRef

export interface ModalFilterModalProps
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

  footerRender?: (options: { onClose?: (e?: MouseEvent<HTMLDivElement>) => void }) => ReactNode
  onCancel?: () => void
}
