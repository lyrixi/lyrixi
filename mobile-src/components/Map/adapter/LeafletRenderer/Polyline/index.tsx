import React, { useContext, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import type { L } from '../../../Map.leaflet.types'
import filterPoints from './../../../utils/filterPoints'
import addPolyline from './addPolyline'
import type { MapPoint, MapPolylineProps, MapPolylineRef } from '../../../types'
import type { LineStyleParams } from './addPolyline.types'
import clearPolyline from './clearPolyline'
import MapContainerContext from '../MapContainer/MapContainerContext'

// 内库使用-start
import ValidatorUtil from './../../../../../utils/ValidatorUtil'
// 内库使用-end

/* 测试使用-start
import { ValidatorUtil } from 'lyrixi-mobile'
测试使用-end */

// 批量折线
const Polyline = forwardRef<MapPolylineRef | null, MapPolylineProps>(
  (
    {
      // Value & Display Value
      points: externalPoints,
      color
    },
    ref
  ) => {
    let points = externalPoints as unknown

    const polylineLayerRef = useRef<L.LayerGroup | null>(null)
    const mapContainerContext = useContext(MapContainerContext)

    points = filterPoints(points)

    useEffect(() => {
      const lf = mapContainerContext?._leafletMap as L.Map | null | undefined
      if (!lf) {
        return
      }
      polylineLayerRef.current = window.L!.layerGroup().addTo(lf)

      return () => {
        clearPolyline(polylineLayerRef.current)
      }
    }, [mapContainerContext])

    function draw() {
      if (ValidatorUtil.isEmpty(points)) {
        return
      }
      clearPolyline(polylineLayerRef.current)
      if (!polylineLayerRef.current) return
      const style: LineStyleParams = { color }
      addPolyline(points as MapPoint[], style, polylineLayerRef.current)
    }

    useEffect(() => {
      if (!polylineLayerRef.current) return
      if (ValidatorUtil.isEmpty(points)) {
        clearPolyline(polylineLayerRef.current)
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

export default Polyline
