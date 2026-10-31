import type { CascaderItem } from '../../types/Cascader.common.types'

// 内库使用-start
import type { InputTextProps } from '../../../Input/types/index'
// 内库使用-end

export interface CascaderMainSearchControlProps {
  // Value & Display Value
  list: CascaderItem[]
  // Events
  onSearch?: (keyword: string, options: { list: CascaderItem[] }) => void
  onChange?: (v: CascaderItem[]) => void
}

// 与 ToolBar.Search（InputSearch）只读搜索条一致
export type CascaderMainSearchControlSearchBarFieldProps = InputTextProps
