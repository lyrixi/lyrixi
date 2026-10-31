import React, { forwardRef } from 'react'
import Choose from './../Choose'
import type { LocationMainPreviewProps } from './Location.Main.Preview.types'

// 内库使用-start
import type { MapContainerAPI } from './../../../Map/types'
// 内库使用-end

// 查看
const Preview = forwardRef<MapContainerAPI, LocationMainPreviewProps>(
  (
    {
      value,
      autoLocation,
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
      <Choose
        ref={ref}
        // Value & Display Value
        value={value}
        // Status
        readOnly={true}
        autoLocation={autoLocation}
        // Elements
        mapConfig={mapConfig}
        getLocation={getLocation}
        getAddress={getAddress}
        loadingRender={loadingRender}
        // Events
        onChange={onChange}
        onSuccess={onSuccess}
        onError={onError}
      />
    )
  }
)
export default Preview
