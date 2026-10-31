import type { CSSProperties, ReactNode } from 'react'

import type { DatePickerPickerType } from './DatePicker.common.types'
import type { DatePickerComboProps } from './DatePicker.Combo.types'

// 内库使用-start
import type { ModalRef } from '../../Modal/types'
// 内库使用-end

// 单日期弹层（NavBarModal + Main）
export interface DatePickerModalProps {
  // Value & Display Value
  id?: string
  value?: Date | null
  type?: DatePickerPickerType
  min?: Date | null
  max?: Date | null
  hourStep?: number
  minuteStep?: number
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
  portal?: DatePickerComboProps['portal']
  titleRender?: DatePickerComboProps['titleRender']
  ok?: ReactNode
  cancel?: ReactNode
  okVisible?: boolean
  cancelVisible?: boolean
  // Events
  onClose?: () => void
  onChange?: (value: Date | null) => void
  onOk?: DatePickerComboProps['onOk']
}

export type DatePickerModalRef = ModalRef & Record<string, unknown>
