import React, { forwardRef, useRef, useEffect, useImperativeHandle, type ReactNode } from 'react'

import WeekCombo from './WeekCombo'
import DateCombo from './DateCombo'
import Switcher from './Switcher'
import type {
  DatePickerTypeListItem,
  DatePickerTypeSwitcherRef,
  DatePickerTypeSwitcherValue
} from './../types'

import type { DatePickerTypeSwitcherProps } from '../types'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

// 日期类型选择控件: 年月日季
const TypeSwitcher = forwardRef<DatePickerTypeSwitcherRef, DatePickerTypeSwitcherProps>(
  (
    {
      // Value & Display Value
      value,
      types = [
        {
          type: 'date',
          name: LocaleUtil.locale('日', 'lyrixi_3edddd85ac2c5e612fb71dbb89e7d1c5')
        },
        {
          type: 'week',
          id: 'week',
          name: LocaleUtil.locale('周', 'lyrixi_a657f46f5bb00961adfae80d12e41b3d')
        },
        {
          type: 'month',
          name: LocaleUtil.locale('月', 'lyrixi_e42b99d59954ce6437e66f416850425a')
        },
        {
          type: 'quarter',
          name: LocaleUtil.locale('季', 'lyrixi_afcd9a4cb1fd7f84c1e5a275768795d0')
        },
        {
          type: 'year',
          name: LocaleUtil.locale('年', 'lyrixi_465260fe80b0c3338d06194bb7a94446')
        }
      ],

      // Style
      style,
      className,
      pickerComboStyle = {},
      pickerComboClassName = '',
      tabbarStyle = {},
      tabbarClassName = '',
      variant = 'tabbar',
      dropdownPortal,
      dropdownLeft,
      dropdownColor,
      dropdownVariant,
      dropdownSize,
      dropdownSizeEqual,
      dropdownFontSize,
      dropdownRadius,
      dropdownClassName,
      dropdownStyle,
      dropdownArrowSvg,
      // Status
      min,
      max,
      pickerDisabled,

      // Elements
      pickerComboRender,

      // Events
      onChange
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      // 如果默认没有值, 则默认为当天
      if (!value) {
        const newValue = { ...types[0], value: new Date() } as DatePickerTypeSwitcherValue
        if (!newValue.value) {
          newValue.value = new Date()
        }
        handleChange(newValue)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef?.current
        }
      }
    })
    // eslint-disable-line

    // 统一的修改方法
    function handleChange(newValue: DatePickerTypeSwitcherValue) {
      onChange?.(newValue)
    }

    // 点击Tab
    function handleTabs(newValue: DatePickerTypeListItem) {
      if (!newValue.type) return
      const next: DatePickerTypeSwitcherValue = {
        ...newValue,
        value: newValue.value ?? value?.value ?? new Date()
      }
      handleChange(next)
    }

    // 选择日期
    function handleDate(date: Date) {
      if (!value) return
      handleChange({ ...value, value: date })
    }

    // 获取选择控件的node
    function renderPickerCombo() {
      if (!value) return null
      let pickerNode: ReactNode = undefined
      if (typeof pickerComboRender === 'function') {
        pickerNode = pickerComboRender(value, { onChange: handleDate })
      }
      if (pickerNode === undefined) {
        pickerNode =
          value.type === 'week' ? (
            <WeekCombo
              value={value?.value}
              min={min}
              max={max}
              disabled={pickerDisabled}
              onChange={handleDate}
            />
          ) : (
            <DateCombo
              type={value?.type}
              value={value?.value}
              min={min}
              max={max}
              disabled={pickerDisabled}
              onChange={handleDate}
            />
          )
      }

      return pickerNode
    }

    return (
      <div
        style={style}
        className={DOMUtil.classNames('lyrixi-datepicker-typeswitcher', className)}
        ref={rootRef}
      >
        {Array.isArray(types) && value && (
          <Switcher
            variant={variant}
            dropdownPortal={dropdownPortal}
            dropdownLeft={dropdownLeft}
            dropdownColor={dropdownColor}
            dropdownVariant={dropdownVariant}
            dropdownSize={dropdownSize}
            dropdownSizeEqual={dropdownSizeEqual}
            dropdownFontSize={dropdownFontSize}
            dropdownRadius={dropdownRadius}
            dropdownClassName={dropdownClassName}
            dropdownStyle={dropdownStyle}
            dropdownArrowSvg={dropdownArrowSvg}
            types={types}
            value={value}
            style={tabbarStyle}
            className={tabbarClassName}
            onChange={handleTabs}
          />
        )}
        <div
          style={pickerComboStyle}
          className={DOMUtil.classNames(
            'lyrixi-datepicker-typeswitcher-combo',
            pickerComboClassName
          )}
        >
          {value?.value instanceof Date ? renderPickerCombo() : null}
        </div>
      </div>
    )
  }
)
export default TypeSwitcher
