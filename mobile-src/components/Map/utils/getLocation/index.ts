import getCacheLocation from './getCacheLocation'
import type { GetLocationFn, GetLocationParams, GetLocationResult } from '../../types'

function getLocation(
  params: GetLocationParams = { type: 'wgs84' },
  externalGetLocation?: GetLocationFn | null
): Promise<GetLocationResult> {
  if (typeof externalGetLocation === 'function') {
    return Promise.resolve(externalGetLocation(params))
  }
  return getCacheLocation({
    ...params,
    type: params.type || 'wgs84'
  })
}

export default getLocation
