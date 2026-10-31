import type { CSSProperties, ReactNode } from 'react'

import type { ListPaginationItem } from './ListPagination.common.types'
import type { ListPaginationMainProps, ListPaginationMainRef } from './ListPagination.Main.types'

// 内库使用-start
import type { ModalProps, ModalRef } from '../../Modal/types'
// 内库使用-end

export interface ListPaginationModalRef extends ModalRef, ListPaginationMainRef {}

export interface ListPaginationModalProps extends ListPaginationMainProps {
  // Value & Display Value
  id?: string

  open?: boolean
  maskClosable?: boolean
  modalStyle?: CSSProperties
  modalClassName?: string
  maskStyle?: CSSProperties
  maskClassName?: string
  portal?: ModalProps['portal']
  title?: ReactNode
  cancel?: ReactNode
  cancelVisible?: boolean
  headerRender?: (options: {
    open?: boolean
    value?: ListPaginationItem | ListPaginationItem[] | null
    list?: ListPaginationItem[]
  }) => ReactNode
  onOk?: (
    value: ListPaginationItem | ListPaginationItem[] | null
  ) => Promise<unknown | false> | unknown | false
  onClose?: () => void
}
