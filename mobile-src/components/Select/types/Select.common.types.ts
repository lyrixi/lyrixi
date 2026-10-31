// 内库使用-start
import type { ListItem, ListProps, ListViewItem } from '../../List/types'
// 内库使用-end

// Main / Modal / Combo 共用的列表项（扁平；仅 type: 'group' 为分组头）
export type SelectItem = ListItem

// Main / Modal 共用的列表与选择行为
export interface SelectListProps
  extends Pick<
    ListProps,
    | 'multiple'
    | 'checkable'
    | 'itemStyle'
    | 'itemClassName'
    | 'itemLayout'
    | 'checkboxVariant'
    | 'checkboxPlacement'
  > {
  // Value & Display Value

  value?: SelectItem | SelectItem[] | null
  list?: SelectItem[]
  formatViewItem?: (item: SelectItem, options: { index: number }) => ListViewItem
  itemRender?: ListProps['itemRender']
  onChange?: (
    newValue: SelectItem | SelectItem[] | null,
    options?: { action?: string; currentItem: SelectItem }
  ) => void
}
