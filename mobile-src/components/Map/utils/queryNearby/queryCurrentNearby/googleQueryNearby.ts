import pointsToMapPoints from '../../pointsToMapPoints'

import type { MapPointType, QueryNearbyParams, QueryNearbyResult } from '../../../types'
import type { GooglePlacesApi, GooglePlaceLatLngCallable } from './queryNearby.internal.types'

// 内库使用-start
import LocaleUtil from '../../../../../utils/LocaleUtil'
import GeoUtil from '../../../../../utils/GeoUtil'
import ValidatorUtil from '../../../../../utils/ValidatorUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, GeoUtil, ValidatorUtil } from 'lyrixi-mobile'
测试使用-end */

function hasNumberLatLng(loc: unknown): loc is GooglePlaceLatLngCallable {
  if (typeof loc !== 'object' || loc === null) {
    return false
  }
  const o = loc as { lat?: unknown; lng?: unknown }
  return typeof o.lat === 'function' && typeof o.lng === 'function'
}

function displayNameToString(name: unknown): string {
  if (typeof name === 'string') {
    return name
  }
  if (ValidatorUtil.isPlainObject(name)) {
    const nameRecord = name as Record<string, unknown>
    if (typeof nameRecord.text === 'string') {
      return nameRecord.text
    }
    if (typeof (nameRecord as { toString?: () => string }).toString === 'function') {
      return (nameRecord as { toString: () => string }).toString()
    }
  }
  return String(name)
}

// 搜索附近
async function nearbySearch({
  keyword,
  longitude,
  latitude,
  type,
  radius
}: QueryNearbyParams): Promise<QueryNearbyResult> {
  if (typeof longitude !== 'number' || typeof latitude !== 'number' || !type || !keyword) {
    return {
      status: 'error',
      message: String(LocaleUtil.locale('缺少参数', 'lyrixi_f06ec979541f5f1283216579ac421380'))
    }
  }

  const g = window.google
  if (!g?.maps?.importLibrary) {
    return {
      status: 'error' as const,
      message: String(LocaleUtil.locale('查询失败', 'lyrixi_0d66ed02d74d0bd89431d6d59533ffb3'))
    }
  }

  const { Place, SearchNearbyRankPreference } = (await g.maps.importLibrary(
    'places'
  )) as GooglePlacesApi
  const request: Record<string, unknown> = {
    fields: ['displayName', 'location', 'businessStatus', 'formattedAddress'],
    maxResultCount: 20,
    language: window.language || 'en-US',
    region: 'us'
  }

  // 中国转gcj02再搜索
  const centerPointRaw = pointsToMapPoints({
    longitude: Number(longitude),
    latitude: Number(latitude),
    type
  })
  if (!GeoUtil.isPoint(centerPointRaw)) {
    return {
      status: 'error' as const,
      message: String(LocaleUtil.locale('查询失败', 'lyrixi_0d66ed02d74d0bd89431d6d59533ffb3'))
    }
  }

  const isInChina =
    GeoUtil.isInChina({
      longitude: centerPointRaw.longitude,
      latitude: centerPointRaw.latitude
    }) === true

  const center = new g.maps.LatLng(centerPointRaw.latitude, centerPointRaw.longitude) as unknown

  if (!center) {
    return {
      status: 'error' as const,
      message: String(LocaleUtil.locale('查询失败', 'lyrixi_0d66ed02d74d0bd89431d6d59533ffb3'))
    }
  }

  // 结果列表
  let placeList: unknown[] = []

  // 搜索附近（有搜索半径时用附近搜索，否则全文）
  if (center && radius) {
    request.rankPreference = SearchNearbyRankPreference.DISTANCE
    request.locationRestriction = {
      center: center,
      radius: 500
    }
    request.includedPrimaryTypes = keyword.split(',')
    const { places } = await Place.searchNearby(request)
    placeList = places
  } else {
    // 搜索全部
    request.textQuery = keyword
    request.locationBias = center
    const { places } = await Place.searchByText(request)
    placeList = places
  }

  if (placeList.length) {
    const list: {
      longitude: number
      latitude: number
      name: string
      address: string
      type: MapPointType
    }[] = []
    for (const place of placeList) {
      if (!ValidatorUtil.isPlainObject(place)) {
        continue
      }
      const placeRecord = place as Record<string, unknown>
      if (!hasNumberLatLng(placeRecord.location)) {
        continue
      }
      const pLoc = placeRecord.location
      if (pLoc.lat() && pLoc.lng()) {
        list.push({
          longitude: pLoc.lng(),
          latitude: pLoc.lat(),
          name: displayNameToString(placeRecord.displayName),
          address:
            (typeof placeRecord.formattedAddress === 'string' && placeRecord.formattedAddress) ||
            displayNameToString(placeRecord.displayName),
          type: isInChina ? 'gcj02' : 'wgs84'
        })
      }
    }
    if (list.length) {
      return {
        status: 'noMore' as const,
        data: { list }
      }
    }
    return {
      status: 'empty',
      message: String(LocaleUtil.locale('暂无数据', 'lyrixi_21efd88b67a39834582ad99aabb9dc60'))
    }
  }

  return {
    status: 'error',
    message: String(LocaleUtil.locale('查询失败', 'lyrixi_0d66ed02d74d0bd89431d6d59533ffb3'))
  }
}

export default nearbySearch
