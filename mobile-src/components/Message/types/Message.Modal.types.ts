import type { CSSProperties } from 'react'

import type { MessageBodyProps } from './Message.common.types'

// 内库使用-start
import type { ModalProps, ModalRef } from '../../Modal/types'
// 内库使用-end

export type MessageModalRef = ModalRef

export interface MessageModalProps extends MessageBodyProps {
  // Value & Display Value
  id?: string

  open?: boolean
  maskClosable?: boolean
  safeArea?: boolean
  modalStyle?: CSSProperties
  modalClassName?: string
  maskStyle?: CSSProperties
  maskClassName?: string
  portal?: ModalProps['portal']
  onClose?: ModalProps['onClose']
}
