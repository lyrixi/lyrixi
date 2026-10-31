import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

import MapContainer from './../../components/MapContainer'
import ZoomControl from './../../components/ZoomControl'
import Markers from './../../components/Markers'
import Circles from './../../components/Circles'
import Polyline from './../../components/Polyline'
import type {
  MapPoint,
  MapCirclesRef,
  MapContainerAPI,
  MapMarkersPageRef,
  MapMarkersPageProps,
  MapMarkersRef,
  MapPolylineRef,
  MapZoomControlRef
} from '../../types'

// 地图标注
const MapMarkersPage = forwardRef<MapMarkersPageRef, MapMarkersPageProps>(
  (
    {
      markers,
      minZoom,
      maxZoom,
      polyline,
      circles,
      // Style
      style,
      className,
      polylineStyle,
      polylineClassName,
      circlesStyle,
      circlesClassName,
      zoomControlStyle,
      zoomControlClassName,
      // Elements
      children,
      // Events
      onLoad,
      onMarkerCheck,
      onMapChange
    },
    ref
  ) => {
    const mapRef = useRef<MapContainerAPI | null>(null)

    const markersRef = useRef<MapMarkersRef | null>(null)

    const circlesRef = useRef<MapCirclesRef | null>(null)

    const polylineRef = useRef<MapPolylineRef | null>(null)

    const zoomRef = useRef<MapZoomControlRef | null>(null)

    useEffect(() => {
      if (!markers) return
      const target = markers as unknown as Parameters<MapContainerAPI['panTo']>[0]
      mapRef.current?.panTo?.(target)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(markers)])

    // Ref handle extends MapContainerAPI with map refs; may be null before map is ready. React ref typings expect the non-null branch for useImperativeHandle.
    // @ts-expect-error MapMarkersPageRef includes null; TS useImperativeHandle infers the non-null handle shape only
    useImperativeHandle(ref, () => {
      const m = mapRef.current
      if (!m) {
        return null
      }
      return {
        ...m,
        markersRef,
        polylineRef,
        circlesRef,
        zoomRef
      } as MapMarkersPageRef
    })

    return (
      <MapContainer
        ref={mapRef}
        zoom={14}
        minZoom={minZoom}
        maxZoom={maxZoom}
        className={className}
        style={style}
        onLoad={(result) => {
          if (result?.status === 'error') return
          if (markers) {
            if (Array.isArray(markers)) {
              result?.data?.map?.panTo?.(
                markers as unknown as Parameters<MapContainerAPI['panTo']>[0]
              )
            } else {
              result?.data?.map?.panTo?.(markers as Parameters<MapContainerAPI['panTo']>[0])
            }
          }
          onLoad?.(result)
        }}
        onMapChange={onMapChange}
      >
        <>
          <Markers ref={markersRef} points={markers} onCheck={onMarkerCheck} />

          {circles ? (
            <Circles
              {...({
                ref: circlesRef,
                points: circles as MapPoint[],
                className: circlesClassName,
                style: circlesStyle
              } as React.ComponentPropsWithRef<typeof Circles>)}
            />
          ) : null}

          {polyline ? (
            <Polyline
              {...({
                ref: polylineRef,
                points: polyline as MapPoint[],
                className: polylineClassName,
                style: polylineStyle
              } as React.ComponentPropsWithRef<typeof Polyline>)}
            />
          ) : null}

          <ZoomControl
            ref={zoomRef}
            onZoomIn={(m) => {
              void m
            }}
            onZoomOut={(m) => {
              void m
            }}
            className={zoomControlClassName}
            style={{ bottom: '20px', ...zoomControlStyle }}
          />

          {children}
        </>
      </MapContainer>
    )
  }
)

export default MapMarkersPage
