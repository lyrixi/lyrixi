import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import LeafletMarkers from './../../adapter/LeafletRenderer/Markers'

import type { MapMarkersProps, MapMarkersRef } from '../../types'

// 批量标注: 仅定义标准化 API, 功能实现透传到 adapter/LeafletRenderer/Markers
const Markers = forwardRef<MapMarkersRef, MapMarkersProps>(
  (
    {
      // Value & Display Value
      points,
      // Events
      onCheck
    },
    ref
  ) => {
    const rendererRef = useRef<MapMarkersRef | null>(null)

    useImperativeHandle(ref, () => ({}))

    return (
      <LeafletMarkers
        ref={rendererRef}
        // Value & Display Value
        points={points}
        // Events
        onCheck={onCheck}
      />
    )
  }
)

export default Markers
