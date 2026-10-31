import type { TreeItem } from '../../../types'
import type { ListViewItem } from '../../../../List/types'

export interface TreeMainTagProps {
  // Value & Display Value
  formatViewItem: (item: TreeItem, options: { index: number }) => ListViewItem
  item: TreeItem
  index: number
  onDelete?: (item: TreeItem) => void
}
