import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import defaultGetAddress from '../../utils/getAddress'
import defaultGetLocation from '../../utils/getLocation'
import defaultOpenLocation from './openLocation'
import defaultQueryNearby from '../../utils/queryNearby'
import loadSource from './../../utils/loadSource'
import { hasMapConfigKey, resolveMapKey } from '../../utils/getMapKey'
import canvasMarkers from './leaflet.canvas-markers'
import MapProviderContext from './MapProviderContext'
import MapProvider from './MapProvider'
import type mapGetAddress from '../../utils/getAddress'
import type mapGetLocation from '../../utils/getLocation'
import type mapQueryNearby from '../../utils/queryNearby'

import type {
  MapLoadSourceResult,
  MapProviderProps,
  MapProviderRef,
  MapType
} from '../../types/Map.Provider.types'
import type { GetAddressParams, GetLocationParams, QueryNearbyParams } from '../../types'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import Result from './../../../Result'
import Button from './../../../Button'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Result, Button } from 'lyrixi-mobile'
测试使用-end */

const Provider = forwardRef<MapProviderRef, MapProviderProps>(
  (
    {
      // Value & Display Value
      config,
      cacheDuration,
      getAddress: externalGetAddress,
      getLocation: externalGetLocation,
      openLocation: externalOpenLocation,
      queryNearby: externalQueryNearby,
      // Elements
      loadingRender,
      children,
      // Events
      onError,
      onSuccess
    },
    ref
  ) => {
    const getAddress: typeof mapGetAddress = async (params: GetAddressParams) => {
      return defaultGetAddress(
        {
          ...params,
          cacheDuration: typeof cacheDuration === 'number' ? cacheDuration : undefined
        },
        externalGetAddress
      )
    }

    const getLocation: typeof mapGetLocation = async (
      params: GetLocationParams = { type: 'wgs84' }
    ) => {
      return defaultGetLocation(
        {
          ...params,
          cacheDuration: typeof cacheDuration === 'number' ? cacheDuration : undefined
        },
        externalGetLocation
      )
    }

    const getMapType = (): MapType | null => {
      if (config?.type === 'google' || config?.type === 'bmap' || config?.type === 'amap') {
        return config.type
      }
      return null
    }

    const openLocation: NonNullable<MapProviderProps['openLocation']> = (...args: unknown[]) => {
      if (typeof externalOpenLocation === 'function') {
        return externalOpenLocation(...args)
      }
      return defaultOpenLocation(...(args as Parameters<typeof defaultOpenLocation>))
    }

    const queryNearby: typeof mapQueryNearby = (params: QueryNearbyParams) => {
      return defaultQueryNearby(params, externalQueryNearby)
    }

    const [result, setResult] = useState<MapLoadSourceResult | null>(null)

    useEffect(() => {
      MapProvider.key = resolveMapKey(config)
      MapProvider.getMapType = getMapType

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config?.type, config?.bmapKeys, config?.googleKeys, config?.amapKeys])

    useEffect(() => {
      return () => {
        MapProvider.key = ''
        MapProvider.getMapType = null
      }
    }, [])

    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define -- loadData 声明在组件后部，与既有结构一致
      loadData()
      // eslint-disable-next-line
    }, [])

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    useImperativeHandle(ref, () => ({ reload: loadData }))

    async function loadData() {
      if (!hasMapConfigKey(config) || !config?.type) {
        setResult({
          status: 'error',
          message: LocaleUtil.locale(
            '没有key和地图类型, 无法使用地图',
            'lyrixi_b7129383ac7096e597c7f06db53ac352'
          )
        })
        return
      }

      let loadResult: MapLoadSourceResult = (await loadSource(config)) as MapLoadSourceResult
      if (loadResult?.status === 'error') {
        if (onError) {
          const newResult = await onError({ ...loadResult, reload: loadData })
          if (newResult !== undefined) {
            loadResult = newResult
          }
        }
      } else {
        onSuccess?.({ status: 'success' })
      }
      setResult(loadResult)
    }

    if (result === null) {
      if (loadingRender) {
        return <>{loadingRender()}</>
      }
      return null
    }

    if (result.status === 'error' && typeof result.message === 'string') {
      return (
        <Result title={result.message} className="lyrixi-map-container-result" status={'500'}>
          <Button
            radius="l"
            variant="solid"
            color="primary"
            style={{ margin: '10px 12px' }}
            onClick={() => {
              loadData()
            }}
          >
            {LocaleUtil.locale('重试', 'lyrixi_132c5cdcceb0f1f17c8c088a42959aa4')}
          </Button>
        </Result>
      )
    }

    if (result.message && React.isValidElement(result.message)) {
      return result.message as React.ReactElement
    }

    if (window.L) {
      canvasMarkers(window.L)
    }

    if (!hasMapConfigKey(config) || !config?.type) {
      return null
    }

    return (
      <MapProviderContext.Provider
        value={{
          config,
          reload: () => {
            loadData()
          },
          getAddress,
          getLocation,
          getMapType,
          openLocation,
          queryNearby
        }}
      >
        {children}
      </MapProviderContext.Provider>
    )
  }
)

export default Provider
