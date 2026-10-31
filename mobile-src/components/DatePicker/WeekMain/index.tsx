import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import type { DatePickerWeekMainProps } from './../types'

import type {
  CalendarProps,
  CalendarRef,
  CalendarValue,
  CalendarWeekStart
} from './../../Calendar/types'

// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
import DOMUtil from './../../../utils/DOMUtil'
import Calendar from './../../Calendar'
// 内库使用-end

/* 测试使用-start
import { DateUtil, Calendar } from 'lyrixi-mobile'
测试使用-end */

// 日期快捷选择
const WeekMain = forwardRef<CalendarRef, DatePickerWeekMainProps>(
  (
    {
      // Modal: Status
      open = true,
      // Value & Display Value
      id,
      value,
      // Status
      min,
      max,
      allowClear,
      weekStart = 'Monday', // Monday | Sunday
      // Style
      style,
      className,
      // Events
      onChange
    },
    ref
  ) => {
    const rangeValueRef = useRef<(Date | null)[] | null | Date | null>(null)
    const weekMainRef = useRef<CalendarRef | null>(null)
    useImperativeHandle(ref, () => {
      const w = weekMainRef.current
      return {
        ...(w ?? ({} as CalendarRef)),
        getValue: () => (value instanceof Date ? value : null)
      } as unknown as CalendarRef
    })

    const handleChange: NonNullable<CalendarProps['onChange']> = (_calValue, options) => {
      onChange?.(options.action === 'clear' ? null : options.currentDate)
    }

    const weekDates = value ? DateUtil.getWeekDates(value, weekStart) : null
    if (Array.isArray(weekDates) && weekDates.length) {
      rangeValueRef.current = [weekDates[0], weekDates[6]]
    } else {
      rangeValueRef.current = null
    }

    return (
      <Calendar
        id={id}
        ref={weekMainRef}
        open={open}
        // Value & Display Value
        value={rangeValueRef.current as CalendarValue}
        // Status
        min={min ?? undefined}
        max={max ?? undefined}
        draggable={['horizontal']}
        weekStart={weekStart as CalendarWeekStart}
        selectionMode="range"
        allowClear={allowClear}
        // Style
        style={style}
        className={DOMUtil.classNames('lyrixi-datepicker-weekmain-calendar', className)}
        // Events
        onChange={handleChange}
      />
    )
  }
)

export default WeekMain
