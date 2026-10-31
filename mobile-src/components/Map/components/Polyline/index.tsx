import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import LeafletPolyline from './../../adapter/LeafletRenderer/Polyline'

import type { MapPolylineProps, MapPolylineRef } from '../../types'

// 批量折线: 仅定义标准化 API, 功能实现透传到 adapter/LeafletRenderer/Polyline
const Polyline = forwardRef<MapPolylineRef | null, MapPolylineProps>(
  (
    {
      // Value & Display Value
      points,
      color
    },
    ref
  ) => {
    const rendererRef = useRef<MapPolylineRef | null>(null)

    useImperativeHandle(ref, () => ({}))

    return (
      <LeafletPolyline
        ref={rendererRef}
        // Value & Display Value
        points={points}
        color={color}
      />
    )
  }
)

export default Polyline
