import React, { useContext, useImperativeHandle, forwardRef, useRef } from 'react'
import getAddress from '../../../utils/getAddress'
import getLocation from '../../../utils/getLocation'
import MapContainerContext from '../MapContainer/MapContainerContext'
import type { GetAddressResult, GetLocationResult, MapPoint } from '../../../types'

import type { MapLocationControlProps, MapLocationControlRef } from '../../../types'

// 内库使用-start
import LocaleUtil from './../../../../../utils/LocaleUtil'
import GeoUtil from './../../../../../utils/GeoUtil'
import DOMUtil from './../../../../../utils/DOMUtil'
import Loading from './../../../../Loading'
import Toast from './../../../../Toast'
import Icon from '../../../../Icon'
import Icons from '../../../../../icons'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Loading, Toast } from 'lyrixi-mobile'
测试使用-end */

function isErrorResult(v: unknown): v is { status: 'error' | string; message?: string } {
  return (
    typeof v === 'object' &&
    v !== null &&
    'status' in v &&
    (v as { status: unknown }).status === 'error'
  )
}

// 定位控件
const LocationControl = forwardRef<MapLocationControlRef, MapLocationControlProps>(
  (
    {
      // Value & Display Value
      id,
      style,
      className,
      onChange
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const mapContainerContext = useContext(MapContainerContext)

    function location(): Promise<unknown> {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        if (!mapContainerContext) {
          resolve({ status: 'error', message: 'no map' })
          return
        }
        const msg = LocaleUtil.locale('定位中...', 'lyrixi_2c4006447f62bffd57686aabbdc3f5dd')
        Loading.open({
          content: typeof msg === 'string' ? msg : '…'
        })
        const locResult = (await getLocation({
          type: 'wgs84'
        })) as GetLocationResult
        if (isErrorResult(locResult) || !locResult?.data) {
          resolve(locResult)
          Loading.close()
          return
        }

        const addrResult = (await getAddress(locResult.data)) as GetAddressResult
        if (isErrorResult(addrResult) || !addrResult?.data) {
          resolve(addrResult)
          Loading.close()
          return
        }

        const point = addrResult.data as MapPoint
        if (GeoUtil.isPoint(point)) {
          mapContainerContext.panTo(point)
        }
        resolve(point)
        Loading.close()
      })
    }

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        },
        update: location
      }
    })

    async function handleLocation() {
      const result = await location()
      if (isErrorResult(result) && result.message) {
        Toast.open({ content: result.message })
        return
      }
      if (onChange) onChange(result)
    }

    return (
      <div
        id={id}
        ref={rootRef}
        style={style}
        className={DOMUtil.classNames('lyrixi-map-locationControl', className)}
        onClick={handleLocation}
      >
        <Icon svg={Icons.Location} size="s" className="lyrixi-map-locationControl-icon" />
      </div>
    )
  }
)

export default LocationControl
