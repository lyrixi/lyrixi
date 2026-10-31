import getCacheAddress from './getCacheAddress'
import type { GetAddressFn, GetAddressParams, GetAddressResult } from '../../types'

function getAddress(
  params: GetAddressParams,
  externalGetAddress?: GetAddressFn | null
): Promise<GetAddressResult> {
  if (typeof externalGetAddress === 'function') {
    return Promise.resolve(externalGetAddress(params))
  }
  if (typeof params.latitude !== 'number' || typeof params.longitude !== 'number') {
    return Promise.resolve({
      status: 'error',
      message: 'getAddress must pass longitude and latitude'
    })
  }
  return getCacheAddress({
    extendCacheDuration: params.extendCacheDuration,
    cacheDuration: params.cacheDuration,
    type: params.type || 'wgs84',
    latitude: params.latitude,
    longitude: params.longitude
  })
}

export default getAddress
