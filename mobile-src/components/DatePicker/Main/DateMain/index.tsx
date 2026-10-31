import React, { forwardRef } from 'react'
import getList from './getList'
import valueToList from './valueToList'
import listToValue from './listToValue'
import type { DatePickerMainProps, DatePickerPickerValueList } from './../../types'

// 内库使用-start
import DateUtil from './../../../../utils/DateUtil'
import Picker from './../../../Picker'
import type { PickerItem, PickerMainRef } from './../../../Picker/types'
// 内库使用-end

/* 测试使用-start
import { DateUtil, Picker } from 'lyrixi-mobile'
测试使用-end */

// 日期选择
const Main = forwardRef<PickerMainRef, DatePickerMainProps>(
  (
    {
      // Modal: Status
      open,

      // Value & Display Value
      value,

      // Status
      min,
      max,
      type = 'date', // year | quarter | month | date | time | datetime
      hourStep,
      minuteStep,
      // Style (与外层 Main 对齐；当前未向下传递)
      style,
      className,
      allowClear,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      weekStart: _weekStart,

      // Events
      onChange
    },
    ref
  ) => {
    const pickerType = type

    function handleChange(list: DatePickerPickerValueList) {
      let newValue = listToValue(list, pickerType)
      if (!newValue) return

      if (min instanceof Date && DateUtil.compare(newValue, min, pickerType) === -1) {
        newValue = new Date(min)
      }
      if (max instanceof Date && DateUtil.compare(newValue, max, pickerType) === 1) {
        newValue = new Date(max)
      }
      onChange?.(newValue)
    }

    return (
      <Picker.Main
        ref={ref}
        // Modal: Status
        open={open}
        allowClear={allowClear}
        // Value & Display Value
        value={valueToList(value, pickerType, { hourStep, minuteStep }) as PickerItem[] | null}
        list={getList(value, pickerType, { hourStep, minuteStep }) as PickerItem[][]}
        // Style
        style={style}
        className={className}
        // Events
        onChange={(v) => handleChange(v as DatePickerPickerValueList)}
      />
    )
  }
)

export default Main
