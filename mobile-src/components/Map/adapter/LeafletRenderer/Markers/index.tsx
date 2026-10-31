import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useContext
} from 'react'
import type { L } from '../../../Map.leaflet.types'
import type { CanvasMarkerLayer } from './addMarkers.types'
import createMarkerDivIcon from './createMarkerDivIcon'
import defaultMarkerIcons from './../../../constants/markerIcons'
import filterPoints from './../../../utils/filterPoints'
import addMarkers from './addMarkers'
import clearMarkers from './clearMarkers'
import MapContainerContext from '../MapContainer/MapContainerContext'
import MapProviderContext from '../../../components/Provider/MapProviderContext'

import type { MapMarkersRef, MapMarkersProps, MapPoint } from '../../../types'

// 内库使用-start
import ValidatorUtil from './../../../../../utils/ValidatorUtil'
// 内库使用-end

/* 测试使用-start
import { ValidatorUtil } from 'lyrixi-mobile'
测试使用-end */

let markersLayerOrder = 0

// 批量标注
const Markers = forwardRef<MapMarkersRef, MapMarkersProps>(
  (
    {
      // Value & Display Value
      points: externalPoints,
      // Events
      onCheck
    },
    ref
  ) => {
    let points = filterPoints(externalPoints)

    const layersRef = useRef<{
      canvasLayer: CanvasMarkerLayer
      layer: L.LayerGroup
    } | null>(null)

    const mapProviderContext = useContext(MapProviderContext)
    const mapContainerContext = useContext(MapContainerContext)
    const markerIcons = mapProviderContext?.config?.markerIcons || defaultMarkerIcons
    const [layerOrder] = useState(() => ++markersLayerOrder)

    function draw() {
      const layers = layersRef.current
      if (ValidatorUtil.isEmpty(points) || !layers) {
        return
      }
      clearMarkers(layers)

      const icon = createMarkerDivIcon(markerIcons?.markerIcon)
      addMarkers(points as MapPoint[], { onCheck, icon: icon, layerOrder }, layers)
    }

    // 增加图层
    useEffect(() => {
      if (
        !mapContainerContext?._leafletMap ||
        !window.L?.canvasIconLayer ||
        !window.L.canvasIconLayer
      ) {
        return
      }
      const leafletMap = mapContainerContext._leafletMap as L.Map
      const canvasLayer = (window.L.canvasIconLayer({}) as L.Layer).addTo(
        leafletMap
      ) as unknown as CanvasMarkerLayer
      const layer = window.L.layerGroup().addTo(leafletMap)
      layersRef.current = {
        canvasLayer: canvasLayer,
        layer: layer
      }

      return () => {
        if (layersRef.current) {
          clearMarkers(layersRef.current)
        }
      }
    }, [mapContainerContext])

    // 绘制图标
    useEffect(() => {
      if (ValidatorUtil.isEmpty(points)) {
        if (layersRef.current) {
          clearMarkers(layersRef.current)
        }
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

export default Markers
