import type { ReactNode } from 'react'

import type { DatePickerRangeChangeMeta, DatePickerRangesMap } from './DatePicker.common.types'
import type { DatePickerModalProps } from './DatePicker.Modal.types'

// 区间选择弹层
export interface DatePickerRangeModalProps
  extends Omit<DatePickerModalProps, 'onOk' | 'onChange' | 'value' | 'type' | 'titleRender'> {
  // Value & Display Value
  id?: string

  value?: (Date | null)[] | null
  type?: string
  autoSwapValue?: boolean
  rangeId?: string | null
  ranges?: DatePickerRangesMap
  rangesVisible?: boolean
  titles?: { selector?: ReactNode; custom?: ReactNode }
  startDisabled?: boolean
  endDisabled?: boolean
  separator?: string
  titleRender?: (
    value: (Date | null)[] | null | undefined,
    options: { type: string; separator?: string }
  ) => ReactNode
  onChange?: (value: (Date | null)[] | null, options?: DatePickerRangeChangeMeta) => void
  onOk?: (
    value: (Date | null)[] | null
  ) => void | boolean | Date[] | Promise<void | boolean | Date[]>
}
