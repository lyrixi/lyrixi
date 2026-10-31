import React, { forwardRef } from 'react'

// 内库使用-start
import DatePicker from './../../DatePicker'
import type { DatePickerRangeSelectorProps } from './../../DatePicker/types'
// 内库使用-end

/* 测试使用-start
import { DatePicker } from 'lyrixi-mobile'
测试使用-end */

const DateRangeBar = forwardRef<Record<string, unknown> | null, DatePickerRangeSelectorProps>(
  (props, ref) => {
    return <DatePicker.RangeSelector ref={ref} {...props} />
  }
)

export default DateRangeBar
