import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import LeafletSearchControl from './../../adapter/LeafletRenderer/SearchControl'

import type { MapSearchControlProps, MapSearchControlRef } from '../../types'

// 搜索控件: 仅定义标准化 API, 功能实现透传到 adapter/LeafletRenderer/SearchControl
const SearchControl = forwardRef<MapSearchControlRef, MapSearchControlProps>(
  (
    {
      // Value & Display Value
      id,
      // Style
      style,
      className,
      // Events
      onChange
    },
    ref
  ) => {
    const rendererRef = useRef<MapSearchControlRef | null>(null)

    useImperativeHandle(ref, () => ({
      get element() {
        return rendererRef.current?.element ?? null
      },
      get inputElement() {
        return rendererRef.current?.inputElement ?? null
      },
      correctValue: (value: string) => rendererRef.current?.correctValue(value) ?? value,
      focus: () => {
        rendererRef.current?.focus()
      },
      blur: () => {
        rendererRef.current?.blur()
      }
    }))

    return (
      <LeafletSearchControl
        ref={rendererRef}
        // Value & Display Value
        id={id}
        // Style
        style={style}
        className={className}
        // Events
        onChange={onChange}
      />
    )
  }
)

export default SearchControl
