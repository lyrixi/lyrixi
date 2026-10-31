// 内库使用-start
import type { ToolBarSearchProps } from './ToolBar.Search.types'
// 内库使用-end

export interface ToolBarSearchActiveProps extends ToolBarSearchProps {
  onCancel?: () => void
}
