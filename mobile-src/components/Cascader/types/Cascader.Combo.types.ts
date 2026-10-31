import type { CSSProperties, ReactNode } from 'react'

import type { CascaderItem, LoadDataFn } from './Cascader.common.types'

// 内库使用-start
import type { ModalProps } from '../../Modal/types'
import type { InputSelectProps, InputSelectRef } from '../../Input/types'
// 内库使用-end

export type CascaderComboRef = InputSelectRef & {
  open: () => void
  close: () => void
} & Record<string, unknown>

export type CascaderComboProps = Omit<InputSelectProps, 'onSearch' | 'value' | 'onChange'> & {
  value?: CascaderItem[] | null
  list?: CascaderItem[]
  loadData?: LoadDataFn
  maskClosable?: boolean
  safeArea?: boolean
  modalStyle?: CSSProperties
  modalClassName?: string
  maskStyle?: CSSProperties
  maskClassName?: string
  portal?: ModalProps['portal']
  title?: ReactNode
  ok?: ReactNode
  cancel?: ReactNode
  okVisible?: boolean
  cancelVisible?: boolean
  searchVisible?: boolean
  onSearch?: (keyword: string, options: { list: CascaderItem[] }) => void
  onChange?: (value: CascaderItem[]) => void
  onBeforeOpen?: () => boolean | Promise<boolean>
}
