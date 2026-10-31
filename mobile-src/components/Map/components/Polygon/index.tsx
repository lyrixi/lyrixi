import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import LeafletPolygon from './../../adapter/LeafletRenderer/Polygon'

import type { MapPolygonProps, MapPolygonRef } from '../../types'

// 多边形: 仅定义标准化 API, 功能实现透传到 adapter/LeafletRenderer/Polygon
const Polygon = forwardRef<MapPolygonRef | null, MapPolygonProps>(
  (
    {
      // Value & Display Value
      id,
      points,
      color,
      fillColor,
      fillOpacity,
      weight
    },
    ref
  ) => {
    const rendererRef = useRef<MapPolygonRef | null>(null)

    useImperativeHandle(ref, () => ({}))

    return (
      <LeafletPolygon
        ref={rendererRef}
        // Value & Display Value
        id={id}
        points={points}
        color={color}
        fillColor={fillColor}
        fillOpacity={fillOpacity}
        weight={weight}
      />
    )
  }
)

export default Polygon
