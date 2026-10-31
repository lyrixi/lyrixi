import type { ComponentType, CSSProperties, ReactNode, SVGProps } from 'react'

import type {
  TreeCheckable,
  TreeItem,
  TreeLoadDataFn,
  TreeLoadSearchDataFn,
  TreeSearchAction
} from './Tree.common.types'
import type { TreeModalProps } from './Tree.Modal.types'

// 内库使用-start
import type { ListViewItem } from '../../List/types'
import type { ModalProps } from '../../Modal/types'
import type { InputSelectProps, InputSelectRef } from '../../Input/types'
import type { DefaultAvatar } from '../Main/formatViewItem'
// 内库使用-end

export type TreeComboRef = InputSelectRef & {
  open: () => void
  close: () => void
} & Record<string, unknown>

export interface TreeComboProps {
  // Combo: Value & Display Value
  id?: InputSelectProps['id']
  name?: InputSelectProps['name']
  value?: TreeItem | TreeItem[] | null
  placeholder?: InputSelectProps['placeholder']
  formatter?: InputSelectProps['formatter']
  autoFocus?: InputSelectProps['autoFocus']
  autoSelect?: InputSelectProps['autoSelect']
  compositionEndEnabled?: InputSelectProps['compositionEndEnabled']
  onPreview?: InputSelectProps['onPreview']
  step?: InputSelectProps['step']
  iconRender?: InputSelectProps['iconRender']
  mode?: InputSelectProps['mode']
  autoSize?: InputSelectProps['autoSize']
  separator?: InputSelectProps['separator']
  // Combo: Status
  readOnly?: InputSelectProps['readOnly']
  disabled?: InputSelectProps['disabled']
  allowClear?: InputSelectProps['allowClear']
  // Combo: Style
  size?: InputSelectProps['size']
  style?: InputSelectProps['style']
  className?: InputSelectProps['className']
  // Combo: Elements
  children?: InputSelectProps['children']
  leftIconRender?: InputSelectProps['leftIconRender']
  leftIconSvg?: InputSelectProps['leftIconSvg']
  rightIconRender?: InputSelectProps['rightIconRender']
  rightIconSvg?: InputSelectProps['rightIconSvg']
  clearRender?: InputSelectProps['clearRender']
  onClick?: InputSelectProps['onClick']
  // Modal: Value & Display Value
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
  // Modal: Status
  multiple?: boolean
  checkable?: TreeCheckable
  virtual?: TreeModalProps['virtual']
  maskClosable?: boolean
  safeArea?: boolean
  // Modal: Style
  modalStyle?: CSSProperties
  modalClassName?: string
  maskStyle?: CSSProperties
  maskClassName?: string
  // Modal: Elements
  portal?: ModalProps['portal']
  title?: ReactNode
  cancel?: ReactNode
  cancelVisible?: boolean
  searchVisible?: boolean
  searchAction?: TreeSearchAction
  searchNodeTitle?: string
  searchGroupTitle?: string
  // Events
  onChange?: (value: TreeItem | TreeItem[] | null) => void
  onBeforeOpen?: () => boolean | Promise<boolean>
}
