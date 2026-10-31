import React, { forwardRef } from 'react'

import type { ListAsyncProps } from './../types'

// 内库使用-start
import List from './../../List/List'
import type { ListRef, ListItem } from './../../List/types'
// 内库使用-end

/* 测试使用-start
import { List } from 'lyrixi-mobile'
测试使用-end */

// 虚拟滚动条需要用绝对定位
const itemAbsoluteStyle = {
  position: 'absolute' as const,
  left: 0,
  right: 0
}

// 普通列表
const VirtualList = forwardRef<ListRef, ListAsyncProps>(
  (
    {
      // Value & Display Value
      height, // virtual list container height
      value,
      multiple,
      allowClear,
      list,
      formatViewItem,
      // Status
      checkable,
      // Style
      itemStyle,
      itemClassName,
      itemLayout,
      checkboxVariant,
      checkboxPlacement,
      // Elements
      itemRender,
      // Events
      onChange
    }: ListAsyncProps,
    ref: React.Ref<ListRef>
  ) => {
    return (
      <List
        ref={ref}
        // Value & Display Value
        value={value}
        multiple={multiple}
        allowClear={allowClear}
        formatViewItem={formatViewItem}
        list={list?.map((item) => {
          // 虚拟滚动条需要用绝对定位
          const virtualData = (item as ListItem & { virtualData?: { top?: number } }).virtualData
          return {
            ...item,
            style: {
              ...(item.style as React.CSSProperties | undefined),
              ...itemAbsoluteStyle,
              top: virtualData?.top
            }
          }
        })}
        // Status
        checkable={checkable}
        // Style
        style={{
          position: 'relative',
          flex: 'none',
          height: height
        }}
        itemStyle={itemStyle}
        itemClassName={itemClassName}
        itemLayout={itemLayout}
        checkboxVariant={checkboxVariant}
        checkboxPlacement={checkboxPlacement}
        // Elements
        itemRender={itemRender}
        // Events
        onChange={onChange}
      />
    )
  }
)

export default VirtualList
