import React, { useContext, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import MapContainerContext from '../MapContainer/MapContainerContext'
import type { L } from '../../../Map.leaflet.types'
import filterPoints from './../../../utils/filterPoints'
import addCircles from './addCircles'
import type { MapPoint } from '../../../types'
import clearCircles from './clearCircles'

import type { MapCirclesProps, MapCirclesRef } from '../../../types'

// 内库使用-start
import ValidatorUtil from './../../../../../utils/ValidatorUtil'
// 内库使用-end

/* 测试使用-start
import { ValidatorUtil } from 'lyrixi-mobile'
测试使用-end */

// 批量圈
const Circles = forwardRef<MapCirclesRef | null, MapCirclesProps>(
  (
    {
      // Value & Display Value
      points: externalPoints,
      color,
      radius,
      // Events
      onCheck
    },
    ref
  ) => {
    let points = externalPoints as unknown

    const circlesLayerRef = useRef<L.LayerGroup | null>(null)
    const mapContainerContext = useContext(MapContainerContext)

    points = filterPoints(points)

    useEffect(() => {
      const lf = mapContainerContext?._leafletMap as L.Map | null | undefined
      if (!lf) {
        return
      }
      circlesLayerRef.current = window.L!.layerGroup().addTo(lf)

      return () => {
        clearCircles(circlesLayerRef.current)
      }
    }, [mapContainerContext])

    function draw() {
      if (ValidatorUtil.isEmpty(points)) {
        return
      }
      clearCircles(circlesLayerRef.current)
      if (!circlesLayerRef.current) return
      addCircles(points as MapPoint[], { color, radius, onCheck }, circlesLayerRef.current)
    }

    useEffect(() => {
      if (ValidatorUtil.isEmpty(points)) {
        clearCircles(circlesLayerRef.current)
        return
      }
      draw()
      // eslint-disable-next-line
    }, [JSON.stringify(points)])

    useImperativeHandle(ref, () => {
      return {}
    })

    return <></>
  }
)

export default Circles
