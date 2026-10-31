import type { ComponentType, CSSProperties, ReactNode, SVGProps } from 'react'

// 仅分组头需显式设为 'group'；缺省即为普通项，业务不必写 type: 'item'
export type ListItemType = 'group'

/** 选中交互来源：点击整行 / 点击 Checkbox */
export type ListChangeAction = 'item' | 'checkbox'

/**
 * 列表项数据（扁平；分组只写 type: 'group'，勿再传 children）。
 * 全库列表/选择类组件（List、ListAsync、IndexBar、Input.Select、Cascader、ActionSheet 等）
 * 共用此项结构；type 允许 string 以便业务/其它模型字段透传，渲染仅特殊处理 'group'。
 */
export type ListItem = {
  id?: string | number
  name?: string
  checked?: boolean
  className?: string
  style?: CSSProperties
  readOnly?: boolean
  disabled?: boolean
  allowClear?: boolean
  type?: ListItemType | string
  virtualData?: { type?: string; top?: number; height?: number; index?: number }
  [key: string]: unknown
}

/** 单条列表项变更时第二出参（List.Item onChange、itemRender.onChange 一致） */
export type ListItemChangeOptions = {
  action?: ListChangeAction
  currentItem: ListItem & { checked?: boolean }
}

export type ListItemOnChange = (
  item: ListItem & { checked?: boolean },
  options?: ListItemChangeOptions
) => void

/** List 对外 onChange 第二出参 */
export type ListValueChangeOptions = {
  action?: ListChangeAction
  currentItem: ListItem
}

// 转换后的渲染数据。展示字段与 List.Item 入参对齐，ListItemProps 通过 ListViewItem[字段] 引用
export type ListViewItem = {
  _raw?: ListItem
  /** 数据 id，渲染前会转成 List.Item 的 DOM id */
  id?: string | number
  /** 'group' 渲染为 HeaderItem；缺省或其它值渲染为 Item */
  type?: ListItemType | string
  disabled?: boolean
  /** 行级是否展示 Checkbox；优先于 List 的 checkable */
  checkable?: boolean
  style?: CSSProperties
  className?: string
  imageUrl?: string
  imageSvg?: ComponentType<SVGProps<SVGSVGElement>>
  imageRender?: (item: ListItem & { checked?: boolean }) => ReactNode
  avatarUrl?: string
  avatarSvg?: ComponentType<SVGProps<SVGSVGElement>>
  avatarRender?: (item: ListItem & { checked?: boolean }) => ReactNode
  title?: ReactNode
  name?: ReactNode
  description?: ReactNode
  note?: ReactNode
  content?: ReactNode
  actionRender?: (item: ListItem & { checked?: boolean }) => ReactNode
  arrowVisible?: boolean
}

// 格式化原始数据为渲染数据
export interface ListViewFormatterParams {
  formatViewItem?: (item: ListItem, options: { index: number }) => ListViewItem
}

export interface ListRef {
  element: HTMLDivElement | null
}

export interface ListProps {
  // Value & Display Value
  id?: string
  value?: ListItem | ListItem[] | null
  multiple?: boolean
  list?: ListItem[]
  formatViewItem?: (item: ListItem, options: { index: number }) => ListViewItem
  itemLayout?: string
  // Status
  allowClear?: boolean
  /** true 展示 Checkbox 且行与 Checkbox 均可切换；false 不展示 Checkbox，仅点击行切换 */
  checkable?: boolean
  checkboxVariant?: string
  checkboxPlacement?: string
  // Style
  style?: CSSProperties
  className?: string
  itemStyle?: CSSProperties
  itemClassName?: string
  // Elements
  arrowVisible?: boolean
  itemRender?: (
    item: ListItem,
    options: {
      index: number
      checked: boolean
      onChange: ListItemOnChange
    }
  ) => ReactNode
  // Events
  onChange?: (newValue: ListItem | ListItem[] | null, options?: ListValueChangeOptions) => void
}
