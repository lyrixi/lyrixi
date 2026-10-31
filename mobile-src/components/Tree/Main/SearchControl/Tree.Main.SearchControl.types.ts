import type { TreeItem, TreeLoadSearchDataFn, TreeSearchAction } from '../../types'
import type { ListProps } from '../../../List/types'
import type { ListAsyncVirtualProp } from '../../../ListAsync/types'

export interface TreeMainSearchControlProps {
  list?: TreeItem[]
  loadSearchData?: TreeLoadSearchDataFn
  value?: TreeItem | TreeItem[] | null
  multiple?: boolean
  virtual?: ListAsyncVirtualProp
  searchAction?: TreeSearchAction
  searchNodeTitle?: string
  searchGroupTitle?: string
  footerVisible?: boolean
  formatViewItem?: ListProps['formatViewItem']
  onChange?: (value: TreeItem | TreeItem[] | null) => void
}
