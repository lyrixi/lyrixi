import React, { forwardRef, type MouseEvent, type Ref } from 'react'
import DatePickerCombo from './../../Combo'
import Combo from './Combo'
import type {
  DatePickerTypeSwitcherDateComboProps,
  DatePickerTypeSwitcherDateComboRef
} from './DatePicker.TypeSwitcher.DateCombo.types'
import type { DatePickerComboProps } from './../../types'

// 内库使用-start
import DateUtil from './../../../../utils/DateUtil'
import DOMUtil from './../../../../utils/DOMUtil'
import Input from './../../../Input'
// 内库使用-end

/* 测试使用-start
import { DateUtil, Input } from 'lyrixi-mobile'
测试使用-end */

// 日期类型选择控件: 年月日季
const DateCombo = forwardRef<
  DatePickerTypeSwitcherDateComboRef,
  DatePickerTypeSwitcherDateComboProps
>(
  (
    {
      // Value & Display Value
      id,
      value,
      // Status
      type,
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
    function handlePrev(e: MouseEvent) {
      if (!value) return
      const newValue = updateValue(value, -1)
      if (newValue) onChange?.(newValue)
    }

    // 向后
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function handleNext(e: MouseEvent) {
      if (!value) return
      const newValue = updateValue(value, 1)
      if (newValue) onChange?.(newValue)
    }

    function updateValue(val: Date, go = 0) {
      let newValue: Date = val
      if (['year', 'quarter', 'month', 'date'].includes(type) === false) {
        return
      }
      if (newValue instanceof Date === false) {
        newValue = new Date()
      }
      let addUnit: string = type
      if (type === 'date') {
        addUnit = 'day'
      }

      if (typeof go === 'number') {
        return DateUtil.add(newValue, go, addUnit)
      }

      return newValue
    }

    return (
      <>
        <Input.IconLeftArrow
          id={id ? `${id}-previous` : undefined}
          className="lyrixi-datepicker-typeswitcher-combo-previous"
          onClick={handlePrev}
        />
        <DatePickerCombo
          id={id}
          value={value}
          type={type as DatePickerComboProps['type']}
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
                id={id ? `${id}-date` : undefined}
                className={DOMUtil.classNames(
                  'lyrixi-datepicker-typeswitcher-combo-date',
                  disabled && 'lyrixi-disabled',
                  className
                )}
                style={style}
                onClick={disabled ? undefined : onClick}
                type={type}
                value={value}
              />
            )
          }}
          ref={ref}
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

export default DateCombo
