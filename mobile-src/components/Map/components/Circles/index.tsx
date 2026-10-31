import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import LeafletCircles from './../../adapter/LeafletRenderer/Circles'

import type { MapCirclesProps, MapCirclesRef } from '../../types'

// 批量圈: 仅定义标准化 API, 功能实现透传到 adapter/LeafletRenderer/Circles
const Circles = forwardRef<MapCirclesRef | null, MapCirclesProps>(
  (
    {
      // Value & Display Value
      id,
      points,
      color,
      radius,
      // Events
      onCheck
    },
    ref
  ) => {
    const rendererRef = useRef<MapCirclesRef | null>(null)

    useImperativeHandle(ref, () => ({}))

    return (
      <LeafletCircles
        ref={rendererRef}
        // Value & Display Value
        id={id}
        points={points}
        color={color}
        radius={radius}
        // Events
        onCheck={onCheck}
      />
    )
  }
)

export default Circles
