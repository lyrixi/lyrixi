import React, { useContext, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import type { L } from '../../../Map.leaflet.types'
import filterPoints from './../../../utils/filterPoints'
import addPolygon from './addPolygon'
import type { MapPoint, MapPolygonProps, MapPolygonRef } from '../../../types'
import type { PolyStyleParams } from './addPolygon.types'
import clearPolygon from './clearPolygon'
import MapContainerContext from '../MapContainer/MapContainerContext'

// 内库使用-start
import ValidatorUtil from './../../../../../utils/ValidatorUtil'
// 内库使用-end

/* 测试使用-start
import { ValidatorUtil } from 'lyrixi-mobile'
测试使用-end */

// 多边形
const Polygon = forwardRef<MapPolygonRef | null, MapPolygonProps>(
  (
    {
      // Value & Display Value
      points: externalPoints,
      color,
      fillColor,
      fillOpacity,
      weight
    },
    ref
  ) => {
    let points = externalPoints as unknown

    const polygonLayerRef = useRef<L.LayerGroup | null>(null)
    const mapContainerContext = useContext(MapContainerContext)

    points = filterPoints(points)

    useEffect(() => {
      const lf = mapContainerContext?._leafletMap as L.Map | null | undefined
      if (!lf) {
        return
      }
      polygonLayerRef.current = window.L!.layerGroup().addTo(lf)

      return () => {
        clearPolygon(polygonLayerRef.current)
      }
    }, [mapContainerContext])

    function draw() {
      const arr = points as MapPoint[]
      if (ValidatorUtil.isEmpty(arr) || arr.length < 3) {
        return
      }
      clearPolygon(polygonLayerRef.current)
      if (!polygonLayerRef.current) return
      const style: PolyStyleParams = {
        color,
        fillColor,
        fillOpacity,
        weight
      }
      addPolygon(arr, style, polygonLayerRef.current)
    }

    useEffect(() => {
      if (!polygonLayerRef.current) return
      const arr = points as MapPoint[]
      if (ValidatorUtil.isEmpty(arr) || arr.length < 3) {
        clearPolygon(polygonLayerRef.current)
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

export default Polygon
