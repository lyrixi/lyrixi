import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import LeafletNearbyControl from './../../adapter/LeafletRenderer/NearbyControl'

import type { MapNearbyControlProps, MapNearbyControlRef } from '../../types'

// 附近推荐: 仅定义标准化 API, 功能实现透传到 adapter/LeafletRenderer/NearbyControl
const NearbyControl = forwardRef<MapNearbyControlRef | null, MapNearbyControlProps>(
  (
    {
      // Value & Display Value
      id,
      value,
      radius,
      // Status
      readOnly,
      nearbyVisible,
      // Events
      onChange,
      onSuccess,
      onError
    },
    ref
  ) => {
    // 渲染器实例，标准化 API 的所有方法都转发到它
    const rendererRef = useRef<MapNearbyControlRef | null>(null)

    useImperativeHandle(ref, () => ({
      get element() {
        return rendererRef.current?.element ?? null
      },
      // 按当前坐标和分类重新查询附近推荐
      reload: () => {
        rendererRef.current?.reload()
      }
    }))

    return (
      <LeafletNearbyControl
        ref={rendererRef}
        // Value & Display Value
        id={id}
        value={value}
        radius={radius}
        // Status
        readOnly={readOnly}
        nearbyVisible={nearbyVisible}
        // Events
        onChange={onChange}
        onSuccess={onSuccess}
        onError={onError}
      />
    )
  }
)

export default NearbyControl
