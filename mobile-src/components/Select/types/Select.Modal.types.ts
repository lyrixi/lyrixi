import type { CSSProperties, ReactNode } from 'react'

import type { SelectItem, SelectListProps } from './Select.common.types'
import type { SelectMainRef } from './Select.Main.types'

// 内库使用-start
import type { ModalProps, ModalRef } from '../../Modal/types'
// 内库使用-end

export interface SelectModalRef extends ModalRef, SelectMainRef {}

export interface SelectModalProps extends SelectListProps {
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
  title?: ReactNode
  cancel?: ReactNode
  cancelVisible?: boolean
  headerRender?: (options: {
    open: boolean
    value?: SelectItem | SelectItem[] | null
    list?: SelectItem[]
  }) => ReactNode
  onOk?: (value: SelectItem | SelectItem[] | null) => unknown
  onClose?: () => void
}
