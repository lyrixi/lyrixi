import type { CSSProperties } from 'react'

import type { DatePickerRangeComboProps } from '../../types/DatePicker.RangeCombo.types'

export type DatePickerRangeSelectorCustomDatesProps = Pick<
  DatePickerRangeComboProps,
  | 'value'
  | 'type'
  | 'min'
  | 'max'
  | 'hourStep'
  | 'minuteStep'
  | 'startDisabled'
  | 'endDisabled'
  | 'allowClear'
  | 'portal'
  | 'onChange'
  | 'onOk'
> & {
  maskClassName?: string
  maskStyle?: CSSProperties
  modalClassName?: string
  modalStyle?: CSSProperties
}
