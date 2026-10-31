import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef
} from 'react'

import pointsToWgs84 from './../../utils/pointsToWgs84'
import getAddress from './../../utils/getAddress'
import getLocation from './../../utils/getLocation'
import markerIcons from './../../constants/markerIcons'

import MapContainer from './../../components/MapContainer'
import ZoomControl from './../../components/ZoomControl'
import SearchControl from './../../components/SearchControl'
import LocationControl from './../../components/LocationControl'
import NearbyControl from './../../components/NearbyControl'
import Markers from './../../components/Markers'
import MapProviderContext from './../../components/Provider/MapProviderContext'
import CenterMarker from './CenterMarker'

import type {
  GetAddressResult,
  GetLocationResult,
  MapChangeEvent,
  MapChoosePageProps,
  MapChoosePageRef,
  MapPoint,
  MapContainerAPI,
  QueryNearbyResult
} from '../../types'

// 内库使用-start
import Toast from './../../../Toast'
import Loading from './../../../Loading'
import LocaleUtil from './../../../../utils/LocaleUtil'
import GeoUtil from './../../../../utils/GeoUtil'
// 内库使用-end

/* 测试使用-start
import { Loading, Toast, LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

function strLocale(node: string | React.ReactNode): string {
  return typeof node === 'string' ? node : '…'
}

// 地图选点
const MapChoosePage = forwardRef<MapChoosePageRef, MapChoosePageProps>(
  (
    {
      value,
      zoom: externalZoom,
      minZoom,
      maxZoom,
      // Status
      readOnly,
      // Value & Display Value
      autoLocation = true,
      // Status
      nearbyVisible,
      // Style
      style,
      className,
      searchControlStyle,
      searchControlClassName,
      markersStyle,
      markersClassName,
      zoomControlStyle,
      zoomControlClassName,
      locationControlStyle,
      locationControlClassName,
      nearbyControlStyle,
      nearbyControlClassName,
      // Elements
      children,
      // Events
      onLoad,
      onChange,
      onMarkerCheck,
      onMapChange
    },
    ref
  ) => {
    const mapRef = useRef<MapContainerAPI | null>(null)

    const nearbyRef = useRef<React.ComponentRef<typeof NearbyControl> | null>(null)

    const locationRef = useRef<React.ElementRef<typeof LocationControl> | null>(null)

    const zoomRef = useRef<React.ElementRef<typeof ZoomControl> | null>(null)

    const [points, setPoints] = useState<unknown[] | null>(null)

    const mapProviderContext = useContext(MapProviderContext)
    const centerMarkerIcon =
      mapProviderContext?.config?.markerIcons?.centerMarkerIcon || markerIcons.centerMarkerIcon

    function handleChange(newValue: MapPoint | null) {
      if (!newValue) {
        onChange?.(null)
        return
      }
      if (typeof newValue !== 'object') {
        return
      }
      const fmt = pointsToWgs84(newValue as MapPoint)
      onChange?.(fmt)
    }

    async function handleMapChange(event: MapChangeEvent) {
      onMapChange?.(event)

      if (readOnly || !event.actions.includes('pan')) {
        return
      }

      const centerPoint: MapPoint = {
        latitude: event.latitude,
        longitude: event.longitude,
        type: event.type
      }

      let result: MapPoint = { ...centerPoint }
      Loading.open({
        content: strLocale(
          LocaleUtil.locale('获取地址中...', 'lyrixi_727c51b4575192c9cc0ca17b67375392')
        )
      })
      const addressResult = (await getAddress({
        latitude: Number(result.latitude),
        longitude: Number(result.longitude),
        type: result.type
      })) as GetAddressResult
      if (addressResult?.status !== 'error' && addressResult?.data) {
        result = { ...result, ...addressResult.data }
      }
      Loading.close()
      handleChange(result)
    }

    useEffect(() => {
      if (GeoUtil.isPoint(value) && value.type) {
        mapRef.current?.panTo(value as MapPoint)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(value)])

    // Inner ref is null before MapContainer commits; parent Ref<MapContainerAPI> still allows .current === null.
    useImperativeHandle(ref, () => mapRef.current as MapChoosePageRef)

    async function handleAutoLocation() {
      if (GeoUtil.isPoint(value) && value.address) {
        return
      }

      let newValue: MapPoint | null = value ? { ...value } : null

      if (!GeoUtil.isPoint(newValue)) {
        Loading.open({
          content: strLocale(
            LocaleUtil.locale('定位中...', 'lyrixi_2c4006447f62bffd57686aabbdc3f5dd')
          )
        })
        const result = (await getLocation({
          type: 'wgs84'
        })) as GetLocationResult | undefined
        Loading.close()
        if (result?.status === 'error') {
          Toast.open({
            content: typeof result.message === 'string' ? result.message : 'Error'
          })
          return
        }
        if (result?.data) {
          newValue = {
            ...(newValue || {}),
            ...result.data
          }
        }
      }

      if (!newValue?.address) {
        Loading.open({
          content: strLocale(
            LocaleUtil.locale('获取地址中...', 'lyrixi_727c51b4575192c9cc0ca17b67375392')
          )
        })
        const result = (await getAddress(newValue as MapPoint)) as GetAddressResult | undefined
        Loading.close()
        if (result?.status === 'error') {
          Toast.open({
            content: typeof result.message === 'string' ? result.message : 'Error'
          })
          return
        }
        if (result?.data) {
          newValue = {
            ...(newValue || {}),
            ...result.data
          }
        }
      }

      // panTo会自动触发onMapChange，所以不需要onChange
      if (GeoUtil.isPoint(newValue) && newValue.type) {
        mapRef.current?.panTo(newValue as MapPoint)
      }
    }

    return (
      <MapContainer
        ref={mapRef}
        center={value}
        zoom={externalZoom ?? 14}
        minZoom={minZoom}
        maxZoom={maxZoom}
        className={className}
        style={style}
        onLoad={(result) => {
          if (result?.status === 'error') return

          if (GeoUtil.isPoint(value) && value.type) {
            result?.data?.map?.panTo?.(value as MapPoint)
          }

          onLoad?.(result)

          if (readOnly || !autoLocation) return
          void handleAutoLocation()
        }}
        onMapChange={(event) => {
          void handleMapChange(event)
        }}
      >
        {readOnly ? null : (
          <SearchControl
            // 搜索后选择位置后panTo会自动触发onMapChange，所以不需要onChange
            className={searchControlClassName}
            style={searchControlStyle}
          />
        )}

        {!readOnly ? (
          <Markers
            points={points}
            onCheck={onMarkerCheck}
            className={markersClassName}
            style={markersStyle}
          />
        ) : null}

        <CenterMarker markerIcon={centerMarkerIcon} />

        <ZoomControl
          ref={zoomRef}
          onZoomIn={(zoom) => {
            console.log('放大', zoom)
          }}
          onZoomOut={(zoom) => {
            console.log('缩小', zoom)
          }}
          className={zoomControlClassName}
          style={{ bottom: readOnly ? '115px' : '145px', ...zoomControlStyle }}
        />

        {readOnly ? null : (
          <LocationControl
            ref={locationRef}
            // 定位后panTo会自动触发onMapChange，所以不需要onChange
            className={locationControlClassName}
            style={{ bottom: '145px', ...locationControlStyle }}
          />
        )}

        <NearbyControl
          {...({
            ref: nearbyRef,
            readOnly,
            nearbyVisible,
            value: value ?? null,
            radius: 1000,
            // 选择位置后panTo会自动触发onMapChange，所以不需要onChange
            onSuccess: (result: QueryNearbyResult) => {
              const list = result?.data?.list
              if (list?.length) {
                setPoints(list.map((i) => i) as unknown[])
              } else {
                setPoints(null)
              }
            },
            onError: () => {
              setPoints(null)
            },
            className: nearbyControlClassName,
            style: nearbyControlStyle
          } as React.ComponentPropsWithRef<typeof NearbyControl>)}
        />

        {children}
      </MapContainer>
    )
  }
)

export default MapChoosePage
