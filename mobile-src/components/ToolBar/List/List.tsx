import React from 'react'

import type { ToolBarListBarProps } from './ToolBar.List.Bar.types'

// 内库使用-start
import List from './../../List'
// 内库使用-end

/* 测试使用-start
import { List } from 'lyrixi-mobile'
测试使用-end */

function ListBar({ value, list, onChange }: ToolBarListBarProps) {
  return (
    <List
      value={value}
      list={list}
      checkable
      checkboxPlacement="right"
      checkboxVariant="text"
      onChange={onChange}
    />
  )
}
export default ListBar
