import type { ToolBarDropdownProps } from './ToolBar.Dropdown.types'

// 内库使用-start
import type { DatePickerRangesMap } from '../../DatePicker/types'
// 内库使用-end

export interface ToolBarDateRangeBarProps extends ToolBarDropdownProps {
  // Value & Display Value
  id?: string

  value?: (Date | null)[] | null
  rangeId?: string | null
  type?: string
  placeholder?: string
  allowClear?: boolean
  min?: Date | null
  max?: Date | null
  ranges?: DatePickerRangesMap
  onOk?: (
    value: (Date | null)[] | null | undefined,
    options: { rangeId: string | null | undefined }
  ) => void | boolean | (Date | null)[] | Promise<void | boolean | (Date | null)[]>
  onChange?: (
    value: (Date | null)[] | null,
    options: { rangeId: string | null | undefined }
  ) => void
}
