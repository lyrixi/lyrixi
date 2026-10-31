import type { ModalProps, ModalRef } from './Modal.types'

export type ModalDropdownModalRef = ModalRef

export interface ModalDropdownModalProps
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

  offset?: Record<string, number>
  left?: string | number
  right?: string | number
  referenceElement?: HTMLElement | (() => HTMLElement) | null
}
