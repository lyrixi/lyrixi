import type { ListItemOnChange, ListViewItem } from './List.types'

export interface ListItemProps {
  // Value & Display Value
  /** DOM id，由 ListViewItem.id 转成字符串后传入 */
  id?: string
  _raw?: ListViewItem['_raw']
  checked?: boolean
  // Status
  disabled?: ListViewItem['disabled']
  checkable?: boolean
  // Style
  style?: ListViewItem['style']
  className?: ListViewItem['className']
  layout?: string
  // Elements
  imageUrl?: ListViewItem['imageUrl']
  imageSvg?: ListViewItem['imageSvg']
  imageRender?: ListViewItem['imageRender']
  avatarUrl?: ListViewItem['avatarUrl']
  avatarSvg?: ListViewItem['avatarSvg']
  avatarRender?: ListViewItem['avatarRender']
  title?: ListViewItem['title']
  description?: ListViewItem['description']
  note?: ListViewItem['note']
  content?: ListViewItem['content']
  actionRender?: ListViewItem['actionRender']
  arrowVisible?: ListViewItem['arrowVisible']
  checkboxVariant?: string
  checkboxPlacement?: string
  // Events
  onChange?: ListItemOnChange
}
