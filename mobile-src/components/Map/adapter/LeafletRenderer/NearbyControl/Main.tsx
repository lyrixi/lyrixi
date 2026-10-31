import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react'

import queryNearby from '../../../utils/queryNearby'
import MapContainerContext from '../MapContainer/MapContainerContext'

import type { MapNearbyControlMainProps } from './Map.NearbyControl.Main.types'

// 内库使用-start
import GeoUtil from './../../../../../utils/GeoUtil'
import ListAsync from './../../../../ListAsync'
import type {
  ListAsyncItem,
  ListAsyncRef,
  ListAsyncViewItem,
  ListLoadResult
} from './../../../../ListAsync/types'
// 内库使用-end

/* 测试使用-start
import { ListAsync } from 'lyrixi-mobile'
import type { ListAsyncItem, ListAsyncRef, ListAsyncViewItem, ListLoadResult } from 'lyrixi-mobile'
测试使用-end */

// 附近结果
const Main = forwardRef<ListAsyncRef, MapNearbyControlMainProps>(function Main(
  { tab, value, radius, onChange, onSuccess, onError },
  ref
) {
  const mapContainerContext = useContext(MapContainerContext)
  const listAsyncRef = useRef<ListAsyncRef>(null)

  useImperativeHandle(ref, () => {
    const listAsync = listAsyncRef.current
    return {
      get element() {
        return listAsync?.element ?? null
      },
      scrollToLocation: listAsync?.scrollToLocation,
      reload: (action?: string) => {
        listAsync?.reload?.(action)
      },
      getResult: () => listAsync?.getResult?.() ?? null
    }
  })

  useEffect(() => {
    if (!tab?.name || !GeoUtil.isPoint(value) || !mapContainerContext) {
      return
    }
    listAsyncRef.current?.reload?.('load')
    // eslint-disable-next-line
  }, [JSON.stringify(tab), JSON.stringify(value), radius, mapContainerContext])

  const handleChange = (newValue: ListAsyncItem | ListAsyncItem[] | null) => {
    if (newValue && !Array.isArray(newValue)) {
      onChange?.(newValue as Record<string, unknown>)
    }
  }

  return (
    <ListAsync
      ref={listAsyncRef}
      className="lyrixi-map-nearbyControl-main"
      initialLoad={false}
      bottomRefreshEnabled={false}
      errorRetry
      emptyRetry
      loadData={async () => {
        if (!mapContainerContext || !GeoUtil.isPoint(value) || !value.type) {
          return { status: 'error' }
        }
        const queryResult = await queryNearby({
          keyword: String((tab as { id?: string; name?: string }).id || tab.name),
          longitude: value.longitude,
          latitude: value.latitude,
          type: value.type,
          radius
        })
        if (queryResult.status === 'noMore') {
          onSuccess?.(queryResult)
        } else {
          onError?.(queryResult)
        }
        return queryResult as ListLoadResult
      }}
      formatViewItem={(item: ListAsyncItem): ListAsyncViewItem => {
        const name = typeof item.name === 'string' ? item.name : String(item.name ?? '')
        const address = typeof item.address === 'string' ? item.address : ''
        const id = item.id
          ? `${String(item.id)}-${String(item.longitude)},${String(item.latitude)}`
          : undefined
        return {
          ...item,
          id,
          title: name,
          description: address
        }
      }}
      onChange={handleChange}
    />
  )
})

export default Main
