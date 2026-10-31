import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import LeafletZoomControl from './../../adapter/LeafletRenderer/ZoomControl'

import type { MapZoomControlProps, MapZoomControlRef } from '../../types'

// 缩放控件: 仅定义标准化 API, 功能实现透传到 adapter/LeafletRenderer/ZoomControl
const ZoomControl = forwardRef<MapZoomControlRef, MapZoomControlProps>(
  (
    {
      // Value & Display Value
      id,
      // Style
      style,
      className,
      // Events
      onZoomIn,
      onZoomOut
    },
    ref
  ) => {
    // 渲染器实例，标准化 API 的所有方法都转发到它
    const rendererRef = useRef<MapZoomControlRef | null>(null)

    useImperativeHandle(ref, () => ({
      get element() {
        return rendererRef.current?.element ?? null
      }
    }))

    return (
      <LeafletZoomControl
        ref={rendererRef}
        // Value & Display Value
        id={id}
        // Style
        style={style}
        className={className}
        // Events
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
      />
    )
  }
)

export default ZoomControl
