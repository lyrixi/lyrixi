import bmapQueryNearby from './bmapQueryNearby'
import googleQueryNearby from './googleQueryNearby'
import pointsToWgs84 from '../../pointsToWgs84'
import getMapType from '../../getMapType'

import type { MapPoint, QueryNearbyParams, QueryNearbyResult } from '../../../types'

// 内库使用-start
import LocaleUtil from '../../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

const queryFailedResult = (): QueryNearbyResult => ({
  status: 'error',
  message: String(LocaleUtil.locale('查询失败', 'lyrixi_0d66ed02d74d0bd89431d6d59533ffb3'))
})

// 将附近搜索结果列表统一转为业务侧 WGS84
function formatNearbyResult(result: QueryNearbyResult): QueryNearbyResult {
  const list = result.data?.list
  if (result.status !== 'noMore' || !Array.isArray(list) || !list.length) {
    return result
  }
  const wgs84List = pointsToWgs84(list)
  return {
    status: 'noMore',
    code: result.code,
    message: result.message,
    data: {
      list: wgs84List.filter((item): item is MapPoint => item !== null)
    }
  }
}

// 搜索附近（出参 list 统一为 WGS84）
function queryCurrentNearby(params: QueryNearbyParams): Promise<QueryNearbyResult> {
  return new Promise((resolve) => {
    let queryNearbyTimeout = false
    const queryNearbyTimer = window.setTimeout(() => {
      queryNearbyTimeout = true
      resolve({
        status: 'error',
        message: String(LocaleUtil.locale('查询超时', 'lyrixi_82105ffb651ae5b2c2a08fa1b1b506ef'))
      })
    }, 5000)

    const run = async (): Promise<void> => {
      let result: QueryNearbyResult | null = null

      const mapType = getMapType()
      if (mapType === 'google') {
        result = await googleQueryNearby(params)
      } else if (mapType === 'bmap') {
        result = await bmapQueryNearby(params)
      } else {
        result = queryFailedResult()
      }
      if (queryNearbyTimeout) {
        return
      }
      window.clearTimeout(queryNearbyTimer)
      resolve(formatNearbyResult(result ?? queryFailedResult()))
    }
    void run()
  })
}

export default queryCurrentNearby
