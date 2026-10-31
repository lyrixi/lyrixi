import pointsToMapPoints from '../../pointsToMapPoints'

import type { GetAddressResult, MapPoint } from '../../../types'

// 内库使用-start
import LocaleUtil from '../../../../../utils/LocaleUtil'
import GeoUtil from '../../../../../utils/GeoUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

// 地址逆解析
function googleGetAddress(params: MapPoint): Promise<GetAddressResult> {
  return new Promise((resolve) => {
    const g = window.google
    if (!g?.maps?.LatLng || !g.maps.Geocoder) {
      resolve({ status: 'error', message: 'Google Maps not loaded' })
      return
    }
    const [point] = pointsToMapPoints([
      {
        longitude: params.longitude,
        latitude: params.latitude,
        type: params.type
      }
    ]) as { latitude?: number; longitude?: number }[]

    if (!GeoUtil.isPoint(point)) {
      resolve({ status: 'error', message: 'invalid coordinates' })
      return
    }

    const latLng = new g.maps.LatLng(Number(point.latitude), Number(point.longitude))
    const geocoder = new g.maps.Geocoder()
    geocoder.geocode({ location: latLng }, function (results: unknown, status: unknown) {
      if (status === 'OK' && Array.isArray(results) && results[0]) {
        const first = results[0] as { formatted_address?: string }
        resolve({
          status: 'success',
          data: {
            ...params,
            address: first.formatted_address
          }
        })
      } else {
        resolve({
          status: 'error',
          message: String(
            LocaleUtil.locale('获取地址失败, 请稍后重试', 'lyrixi_f1f199dd46c73946aa4b3140e98752a4')
          )
        })
      }
    })
  })
}

export default googleGetAddress
