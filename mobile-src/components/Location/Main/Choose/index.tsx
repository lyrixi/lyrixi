import React, { forwardRef } from 'react'

import type { LocationMainChooseProps } from './Location.Main.Choose.types'
import type { LocationValue } from '../../types/Location.common.types'

// 内库使用-start
import Map from './../../../Map'
import type { MapContainerAPI, MapPoint } from './../../../Map/types'
// 内库使用-end

/* 测试使用-start
import { Map } from 'lyrixi-mobile'
测试使用-end */

const { MapChoosePage } = Map

const LocationChoose = forwardRef<MapContainerAPI, LocationMainChooseProps>(
  (
    {
      value,
      cacheDuration,
      // Status
      readOnly,
      // Value & Display Value
      autoLocation,
      // Status
      nearbyVisible,
      // Value & Display Value
      mapConfig,
      getLocation,
      getAddress,
      // Elements
      loadingRender,
      // Events
      onChange,
      onSuccess,
      onError
    },
    ref
  ) => {
    return (
      <Map.Provider
        config={mapConfig}
        cacheDuration={cacheDuration}
        getLocation={getLocation}
        getAddress={getAddress}
        loadingRender={loadingRender}
        onSuccess={onSuccess}
        onError={onError}
      >
        <MapChoosePage
          ref={ref}
          value={(value ?? undefined) as MapPoint | undefined}
          readOnly={readOnly}
          autoLocation={autoLocation}
          nearbyVisible={nearbyVisible}
          onChange={(v) => {
            console.log('地址选点:', v)
            onChange?.(v as LocationValue | null)
          }}
        />
      </Map.Provider>
    )
  }
)
export default LocationChoose
