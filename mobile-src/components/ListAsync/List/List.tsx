import React from 'react'

// 内库使用-start
import ListBase from './../../List/List'
import type { ListProps } from './../../List/types'
// 内库使用-end

/* 测试使用-start
import { List as ListBase } from 'lyrixi-mobile'
测试使用-end */

// 包一层 List，便于后续对列表做统一调整，当前透传属性即可
export default function List({
  // Value & Display Value
  value,
  list,
  formatViewItem,
  multiple,
  allowClear,
  checkable,
  itemStyle,
  itemClassName,
  itemLayout,
  checkboxVariant,
  checkboxPlacement,
  itemRender,
  onChange
}: ListProps) {
  return (
    <ListBase
      value={value}
      list={list}
      formatViewItem={formatViewItem}
      multiple={multiple}
      allowClear={allowClear}
      checkable={checkable}
      itemStyle={itemStyle}
      itemClassName={itemClassName}
      itemLayout={itemLayout}
      checkboxVariant={checkboxVariant}
      checkboxPlacement={checkboxPlacement}
      itemRender={itemRender}
      onChange={onChange}
    />
  )
}
