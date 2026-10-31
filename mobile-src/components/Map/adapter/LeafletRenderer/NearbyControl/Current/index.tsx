import React, { forwardRef, useContext, useMemo } from 'react'

import Navigation from './Navigation'
import MapContainerContext from '../../MapContainer/MapContainerContext'

import type { MapNearbyControlCurrentProps } from './Map.NearbyControl.Current.types'
import type { ListItem, ListRef, ListViewItem } from './../../../../../List/types'

// 内库使用-start
import LocaleUtil from './../../../../../../utils/LocaleUtil'
import List from './../../../../../List'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, List } from 'lyrixi-mobile'
import type { ListItem, ListRef, ListViewItem } from 'lyrixi-mobile'
测试使用-end */

// 当前位置
const Current = forwardRef<ListRef, MapNearbyControlCurrentProps>(
  ({ value, readOnly, onChange }, ref) => {
    const mapContainerContext = useContext(MapContainerContext)
    const locale = LocaleUtil.locale

    const list = useMemo((): ListItem[] => {
      return [(value ?? {}) as ListItem]
    }, [value])

    const handleChange = () => {
      mapContainerContext?.panTo?.({
        longitude: value?.longitude,
        latitude: value?.latitude,
        type: value?.type
      })
      if (!readOnly) {
        onChange?.(value)
      }
    }

    return (
      <List
        ref={ref}
        list={list}
        itemClassName="lyrixi-map-nearbyControl-item"
        onChange={handleChange}
        formatViewItem={(item: ListItem): ListViewItem => {
          const name =
            typeof item.name === 'string'
              ? item.name
              : locale('当前位置', 'lyrixi_5eac11b4b636ca69e08fa158ca2cc13d')
          const address = typeof item.address === 'string' ? item.address : ''
          return {
            ...item,
            _raw: item,
            title: name,
            description: address,
            note: (
              <Navigation
                type={item.type as string | undefined}
                name={typeof item.name === 'string' ? item.name : undefined}
                longitude={item.longitude as number | undefined}
                latitude={item.latitude as number | undefined}
                address={typeof item.address === 'string' ? item.address : undefined}
              />
            )
          }
        }}
      />
    )
  }
)

export default Current
