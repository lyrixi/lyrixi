import type { DatePickerRangeChangeMeta } from './DatePicker.common.types'
import type { DatePickerComboProps, DatePickerComboRef } from './DatePicker.Combo.types'
import type { DatePickerRangeModalProps } from './DatePicker.RangeModal.types'

// 区间日期 Combo = Combo 与 Range 弹层字段的合并
export type DatePickerRangeComboProps = Omit<
  DatePickerComboProps,
  'value' | 'onChange' | 'onOk' | 'titleRender'
> &
  Omit<
    DatePickerRangeModalProps,
    | 'open'
    | 'onClose'
    | 'value'
    | 'onChange'
    | 'onOk'
    | 'titleRender'
    | 'rangeId'
    | 'maskClosable'
    | 'allowClear'
  > & {
    value?: (Date | null)[] | null
    allowClear?: boolean
    maskClosable?: boolean
    onChange?: (value: (Date | null)[] | null, options?: DatePickerRangeChangeMeta) => void
    onOk?: DatePickerRangeModalProps['onOk']
    titleRender?: DatePickerRangeModalProps['titleRender']
  }

export type DatePickerRangeComboRef = DatePickerComboRef
