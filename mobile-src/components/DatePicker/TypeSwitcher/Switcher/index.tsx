import React from 'react'

import type { DatePickerTypeListItem } from '../../types'
import type { DatePickerTypeSwitcherSwitcherProps } from './DatePicker.TypeSwitcher.Switcher.types'
// 内库使用-start
import TabBar from './../../../TabBar'
import ToolBar from './../../../ToolBar'
import type { ToolBarItem } from './../../../ToolBar/types'
// 内库使用-end

/* 测试使用-start
import { TabBar, ToolBar } from 'lyrixi-mobile'
测试使用-end */

function Switcher({
  // Value & Display Value
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
  types,
  value,
  style,
  className,
  onChange
}: DatePickerTypeSwitcherSwitcherProps) {
  if (variant === 'dropdown') {
    return (
      <ToolBar.List
        value={value as ToolBarItem}
        list={types as ToolBarItem[]}
        color={dropdownColor}
        variant={dropdownVariant}
        size={dropdownSize}
        square={dropdownSizeEqual}
        fontSize={dropdownFontSize}
        radius={dropdownRadius}
        style={dropdownStyle}
        className={dropdownClassName}
        arrowSvg={dropdownArrowSvg}
        portal={dropdownPortal}
        left={dropdownLeft}
        onChange={(newValue) => {
          const item = Array.isArray(newValue) ? newValue[0] : newValue
          if (item) onChange(item as DatePickerTypeListItem)
        }}
      />
    )
  }

  return (
    <TabBar.Slide
      list={types}
      value={value}
      style={style}
      className={className}
      onChange={(item) => onChange(item as DatePickerTypeListItem)}
    />
  )
}

export default Switcher
