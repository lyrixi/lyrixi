import type { ComponentType, ReactNode, SVGProps } from 'react'

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
import type { DefaultAvatar } from '../Main/formatViewItem'
// 内库使用-end

export interface TreeMainRef {
  mainElement: HTMLElement | null
  getMainElement: () => HTMLElement | null
  reset: () => void
}

export interface TreeMainProps {
  // Value & Display Value
  id?: string
  value?: TreeItem | TreeItem[] | null
  list?: TreeItem[]
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
  multiple?: boolean
  checkable?: TreeCheckable
  virtual?: ListAsyncVirtualProp
  // Style
  className?: string
  // Elements
  searchVisible?: boolean
  /** 搜索触发方式，默认 `submit` */
  searchAction?: TreeSearchAction
  searchNodeTitle?: string
  searchGroupTitle?: string
  ok?: ReactNode
  // Events
  onChange?: (value: TreeItem | TreeItem[] | null) => void
  onOk?: () => void
}

export interface TreeMainFooterProps {
  // Value & Display Value
  formatViewItem: (item: TreeItem, options: { index: number }) => ListViewItem
  value?: TreeItem | TreeItem[] | null
  ok?: ReactNode
  onDelete?: (item: TreeItem) => void
  onOk?: () => void
}
