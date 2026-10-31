import type { ComponentType, CSSProperties, ReactNode, SVGProps } from 'react'

import type {
  TreeCheckable,
  TreeItem,
  TreeLoadDataFn,
  TreeLoadSearchDataFn,
  TreeSearchAction
} from './Tree.common.types'

// 内库使用-start
import type { ListViewItem } from '../../List/types'
import type { ListAsyncVirtualProp } from '../../ListAsync/types'
import type { ModalProps } from '../../Modal/types'
import type { DefaultAvatar } from '../Main/formatViewItem'
// 内库使用-end

export interface TreeModalProps {
  // Value & Display Value
  id?: string
  value?: TreeItem | TreeItem[] | null
  list?: TreeItem[] | null
  /** 有子节点时，未配置节点头像则使用的默认 SVG */
  defaultParentAvatarSvg?: ComponentType<SVGProps<SVGSVGElement>>
  /** 有子节点时，未配置节点头像则使用的图片 URL，支持 `"default"` */
  defaultParentAvatarUrl?: string
  /** 末级节点时，未配置节点头像则使用的默认 SVG */
  defaultLeafAvatarSvg?: ComponentType<SVGProps<SVGSVGElement>>
  /** 末级节点时，未配置节点头像则使用的图片 URL，支持 `"default"` */
  defaultLeafAvatarUrl?: string
  loadData?: TreeLoadDataFn
  loadSearchData?: TreeLoadSearchDataFn
  formatViewItem?: (
    item: TreeItem,
    options: { index: number },
    defaultAvatar: DefaultAvatar
  ) => ListViewItem
  // Status
  open?: boolean
  multiple?: boolean
  checkable?: TreeCheckable
  virtual?: ListAsyncVirtualProp
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
  searchVisible?: boolean
  searchAction?: TreeSearchAction
  searchNodeTitle?: string
  searchGroupTitle?: string
  title?: ReactNode
  ok?: ReactNode
  cancel?: ReactNode
  cancelVisible?: boolean
  // Events
  onClose?: () => void
  onOk?: (value: TreeItem | TreeItem[] | null | undefined) => boolean | Promise<unknown> | void
  onChange?: (value: TreeItem | TreeItem[] | null) => void
}

export type TreeModalRef = Record<string, unknown>
