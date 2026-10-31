import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import LeafletLocationControl from './../../adapter/LeafletRenderer/LocationControl'

import type { MapLocationControlProps, MapLocationControlRef } from '../../types'

// 定位控件: 仅定义标准化 API, 功能实现透传到 adapter/LeafletRenderer/LocationControl
const LocationControl = forwardRef<MapLocationControlRef, MapLocationControlProps>(
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
    // 渲染器实例，标准化 API 的所有方法都转发到它
    const rendererRef = useRef<MapLocationControlRef | null>(null)

    useImperativeHandle(ref, () => ({
      get element() {
        return rendererRef.current?.element ?? null
      },
      // 重新定位并移动地图到当前位置
      update: () => {
        const renderer = rendererRef.current
        if (!renderer) {
          return Promise.resolve({ status: 'error', message: 'no renderer' })
        }
        return renderer.update()
      }
    }))

    return (
      <LeafletLocationControl
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

export default LocationControl
