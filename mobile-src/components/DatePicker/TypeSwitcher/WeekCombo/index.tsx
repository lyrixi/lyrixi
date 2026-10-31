import React, { forwardRef, type MouseEvent, type Ref } from 'react'
import DatePickerCombo from './../../WeekCombo'
import Combo from './Combo'
import type {
  DatePickerTypeSwitcherWeekComboProps,
  DatePickerTypeSwitcherWeekComboRef
} from './DatePicker.TypeSwitcher.WeekCombo.types'

// 内库使用-start
import DateUtil from './../../../../utils/DateUtil'
import DOMUtil from './../../../../utils/DOMUtil'
import Input from './../../../Input'
// 内库使用-end

/* 测试使用-start
import { DateUtil, Input } from 'lyrixi-mobile'
测试使用-end */

// 周选择
const Week = forwardRef<DatePickerTypeSwitcherWeekComboRef, DatePickerTypeSwitcherWeekComboProps>(
  (
    {
      // Value & Display Value
      id,
      value,
      // Status
      min,
      max,
      disabled,
      // Style
      style,
      className,
      // Events
      onChange
    },
    ref
  ) => {
    // 向前
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function handlePrev(_e: MouseEvent) {
      if (!(value instanceof Date)) return
      onChange?.(DateUtil.previousWeek(value))
    }

    // 向后
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function handleNext(_e: MouseEvent) {
      if (!(value instanceof Date)) return
      onChange?.(DateUtil.nextWeek(value))
    }

    return (
      <>
        <Input.IconLeftArrow
          id={id ? `${id}-previous` : undefined}
          className="lyrixi-datepicker-typeswitcher-combo-previous"
          onClick={handlePrev}
        />
        <DatePickerCombo
          ref={ref}
          id={id}
          value={value}
          min={min}
          max={max}
          disabled={disabled}
          onChange={(v) => {
            if (v instanceof Date) onChange?.(v)
          }}
          comboRender={({ comboRef, onClick }) => {
            return (
              <Combo
                ref={comboRef as Ref<Record<string, unknown> | null>}
                id={id ? `${id}-week` : undefined}
                className={DOMUtil.classNames(
                  'lyrixi-datepicker-typeswitcher-combo-date',
                  disabled && 'lyrixi-disabled',
                  className
                )}
                style={style}
                onClick={disabled ? undefined : onClick}
                value={value}
              />
            )
          }}
        />
        <Input.IconRightArrow
          id={id ? `${id}-next` : undefined}
          className="lyrixi-datepicker-typeswitcher-combo-next"
          onClick={handleNext}
        />
      </>
    )
  }
)

export default Week
