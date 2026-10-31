import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import LeafletMapContainer from './../../adapter/LeafletRenderer/MapContainer'

import type { MapContainerAPI, MapContainerProps, MapPoint } from '../../types'

// 地图容器: 仅定义标准化 API, 功能实现透传到 adapter/LeafletRenderer/MapContainer
const MapContainer = forwardRef<MapContainerAPI | null, MapContainerProps>(
  (
    {
      // Value & Display Value
      center,
      zoom,
      minZoom,
      maxZoom,
      // Style
      style,
      className,
      // Elements
      children,
      // Events
      onLoad,
      onMapChange
    },
    ref
  ) => {
    // 渲染器实例，标准化 API 的所有方法都转发到它
    const rendererRef = useRef<MapContainerAPI | null>(null)

    useImperativeHandle(ref, () => ({
      get element() {
        return rendererRef.current?.element ?? null
      },
      // 移动到指定坐标; 传数组时自动缩放到包含全部点
      panTo: (points: MapPoint | MapPoint[]) => {
        rendererRef.current?.panTo(points)
      },
      // 获取中心点，统一返回 WGS84
      getCenter: () => {
        return rendererRef.current?.getCenter() ?? null
      },
      zoomIn: async () => {
        return rendererRef.current?.zoomIn() ?? Promise.resolve(null)
      },
      zoomOut: async () => {
        return rendererRef.current?.zoomOut() ?? Promise.resolve(null)
      },
      getZoom: () => {
        return rendererRef.current?.getZoom() ?? null
      },
      setZoom: (newZoom: number) => {
        return rendererRef.current?.setZoom(newZoom)
      }
    }))

    // 因为每种地图的API都不一样，所以MapContainer的Context交给adapter记录
    return (
      <LeafletMapContainer
        ref={rendererRef}
        // Value & Display Value
        center={center}
        zoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        // Style
        style={style}
        className={className}
        // Events
        onLoad={onLoad}
        onMapChange={onMapChange}
      >
        {children}
      </LeafletMapContainer>
    )
  }
)

export default MapContainer
