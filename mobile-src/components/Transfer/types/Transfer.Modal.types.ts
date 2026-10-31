import type { CSSProperties, ReactNode } from 'react'

import type { TransferItem, TransferTitles } from './Transfer.common.types'
import type { TransferMainRef } from './Transfer.Main.types'

// 内库使用-start
import type { ModalProps, ModalRef } from '../../Modal/types'
// 内库使用-end

export interface TransferModalRef extends ModalRef, TransferMainRef {}

export interface TransferModalProps {
  // Value & Display Value
  id?: string
  value?: TransferItem[]
  list?: TransferItem[]
  titles?: TransferTitles
  // Status
  open?: boolean
  maskClosable?: boolean
  allowClear?: boolean
  // Style
  safeArea?: boolean
  modalStyle?: CSSProperties
  modalClassName?: string
  maskStyle?: CSSProperties
  maskClassName?: string
  // Elements
  portal?: ModalProps['portal']
  title?: ReactNode
  ok?: ReactNode
  cancel?: ReactNode
  okVisible?: boolean
  cancelVisible?: boolean
  // Events
  onClose?: () => void
  onOk?: (value: TransferItem[]) => boolean | void | Promise<boolean | void>
  onChange?: (value: TransferItem[]) => void
}
