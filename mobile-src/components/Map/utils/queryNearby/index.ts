import queryCurrentNearby from './queryCurrentNearby'

import type { MapProviderProps, QueryNearbyParams, QueryNearbyResult } from '../../types'

function queryNearby(
  params: QueryNearbyParams,
  externalQueryNearby?: MapProviderProps['queryNearby']
): Promise<QueryNearbyResult> {
  if (typeof externalQueryNearby === 'function') {
    return Promise.resolve(externalQueryNearby(params))
  }
  return queryCurrentNearby(params)
}

export default queryNearby
