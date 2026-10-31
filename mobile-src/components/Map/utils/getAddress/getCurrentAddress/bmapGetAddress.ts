import pointsToMapPoints from '../../pointsToMapPoints'

import type { GetAddressResult, MapPoint } from '../../../types'

// 内库使用-start
import LocaleUtil from '../../../../../utils/LocaleUtil'
import GeoUtil from '../../../../../utils/GeoUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

// 百度地址逆解析
function bmapGetAddress(params: MapPoint): Promise<GetAddressResult> {
  return new Promise((resolve) => {
    const bmap = window.BMap
    if (!bmap) {
      resolve({ status: 'error', message: 'BMap not loaded' })
      return
    }
    const [point] = pointsToMapPoints([
      {
        longitude: params.longitude,
        latitude: params.latitude,
        type: params.type
      }
    ]) as { longitude?: number; latitude?: number }[]

    if (!GeoUtil.isPoint(point)) {
      resolve({ status: 'error', message: 'invalid coordinates' })
      return
    }

    const bdPoint = new bmap.Point(Number(point.longitude), Number(point.latitude))
    const geocoder = new bmap.Geocoder()
    geocoder.getLocation(bdPoint, (res: unknown) => {
      const r = res as { address?: string }
      if (!r?.address) {
        resolve({
          status: 'error',
          message: String(
            LocaleUtil.locale('获取地址失败, 请稍后重试', 'lyrixi_f1f199dd46c73946aa4b3140e98752a4')
          )
        })
        return
      }

      resolve({
        status: 'success',
        data: {
          ...params,
          address: r.address
        }
      })
    })
  })
}

export default bmapGetAddress
