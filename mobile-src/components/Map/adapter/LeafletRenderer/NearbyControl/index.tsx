import React, { forwardRef, useContext, useImperativeHandle, useState, useRef } from 'react'

import MapContainerContext from '../MapContainer/MapContainerContext'
import getTabs from './utils/getTabs'
import Current from './Current'
import Toggle from './Toggle'
import Tabs from './Tabs'
import Main from './Main'

import type {
  MapNearbyControlProps,
  MapNearbyControlRef,
  MapNearbyTabItem,
  MapPointType
} from '../../../types'
import type { CardRef } from '../../../../Card/types'

// 内库使用-start
import Card from '../../../../Card'
import type { ListAsyncRef } from './../../../../ListAsync/types'
// 内库使用-end

/* 测试使用-start
import type { ListAsyncRef } from 'lyrixi-mobile'
测试使用-end */

// 附近推荐
const Nearby = forwardRef<MapNearbyControlRef | null, MapNearbyControlProps>(
  ({ value, radius, readOnly, nearbyVisible = true, onChange, onSuccess, onError }, ref) => {
    const rootRef = useRef<CardRef>(null)
    const mainRef = useRef<ListAsyncRef>(null)
    const mapContainerContext = useContext(MapContainerContext)

    const [tab, setTab] = useState<MapNearbyTabItem>(getTabs()[0])

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current?.element ?? null
        },
        reload: () => {
          mainRef.current?.reload?.()
        }
      }
    })

    return (
      <Card className="lyrixi-map-nearbyControl" ref={rootRef}>
        <Current
          readOnly={readOnly}
          value={value}
          onChange={(item) => {
            onChange?.(item)
          }}
        />

        {!nearbyVisible || readOnly ? null : (
          <>
            <Toggle />

            <div className="lyrixi-map-nearbyControl-body">
              <Tabs tab={tab} onChange={setTab} />

              <Main
                ref={mainRef}
                tab={tab}
                value={value}
                radius={radius}
                onSuccess={onSuccess}
                onError={onError}
                onChange={(item: Record<string, unknown>) => {
                  if (mapContainerContext) {
                    mapContainerContext.panTo({
                      longitude: Number(item.longitude),
                      latitude: Number(item.latitude),
                      type: item.type as MapPointType | undefined
                    })
                  }
                  onChange?.(item)
                }}
              />
            </div>
          </>
        )}
      </Card>
    )
  }
)

export default Nearby
