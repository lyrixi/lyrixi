import pointsToMapPoints from '../../pointsToMapPoints'
import MapProvider from '../../../components/Provider/MapProvider'
import bmapWebServiceJsonp from './bmapWebServiceJsonp'

import type { QueryNearbyParams, QueryNearbyResult, MapPoint } from '../../../types'
import type { BmapPlaceSearchResponse } from './queryNearby.internal.types'

// 内库使用-start
import LocaleUtil from '../../../../../utils/LocaleUtil'
import GeoUtil from '../../../../../utils/GeoUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, GeoUtil } from 'lyrixi-mobile'
测试使用-end */

const DEFAULT_SEARCH_RADIUS = 50000

const queryFailedMessage = (): string =>
  String(LocaleUtil.locale('查询失败', 'lyrixi_0d66ed02d74d0bd89431d6d59533ffb3'))

const missingParamsMessage = (): string =>
  String(LocaleUtil.locale('缺少参数', 'lyrixi_f06ec979541f5f1283216579ac421380'))

const emptyMessage = (): string =>
  String(LocaleUtil.locale('暂无数据', 'lyrixi_21efd88b67a39834582ad99aabb9dc60'))

// 百度 WebService 圆形区域检索
async function bmapQueryNearby({
  keyword,
  longitude,
  latitude,
  type,
  radius
}: QueryNearbyParams): Promise<QueryNearbyResult> {
  if (typeof longitude !== 'number' || typeof latitude !== 'number' || !type || !keyword) {
    return {
      status: 'error',
      message: missingParamsMessage()
    }
  }

  const ak = MapProvider.key
  if (!ak) {
    return {
      status: 'error',
      message: missingParamsMessage()
    }
  }

  const centerPoint = pointsToMapPoints({
    longitude: Number(longitude),
    latitude: Number(latitude),
    type
  }) as MapPoint | null

  if (!GeoUtil.isPoint(centerPoint)) {
    return { status: 'error', message: queryFailedMessage() }
  }

  const isInChina =
    GeoUtil.isInChina({
      longitude: Number(longitude),
      latitude: Number(latitude)
    }) === true

  const searchRadius = typeof radius === 'number' && radius > 0 ? radius : DEFAULT_SEARCH_RADIUS

  try {
    const response = await bmapWebServiceJsonp<BmapPlaceSearchResponse>({
      query: keyword,
      location: `${centerPoint.latitude},${centerPoint.longitude}`,
      radius: searchRadius,
      output: 'json',
      ak,
      scope: 2,
      page_size: 20,
      page_num: 0
    })

    if (response.status !== 0) {
      return {
        status: 'error',
        message: queryFailedMessage()
      }
    }

    const results = response.results
    if (!Array.isArray(results) || !results.length) {
      return {
        status: 'empty',
        message: emptyMessage()
      }
    }

    const list: MapPoint[] = []
    for (const item of results) {
      const loc = item.location
      if (typeof loc?.lng !== 'number' || typeof loc?.lat !== 'number') {
        continue
      }
      const name = typeof item.name === 'string' ? item.name : ''
      const address = typeof item.address === 'string' ? item.address : ''
      if (!name && !address) {
        continue
      }
      list.push({
        name,
        address,
        longitude: loc.lng,
        latitude: loc.lat,
        type: isInChina ? 'bd09' : 'wgs84'
      })
    }

    if (list.length) {
      return {
        status: 'noMore',
        data: { list }
      }
    }

    return {
      status: 'empty',
      message: emptyMessage()
    }
  } catch {
    return {
      status: 'error',
      message: queryFailedMessage()
    }
  }
}

export default bmapQueryNearby
