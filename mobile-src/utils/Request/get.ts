import axios from 'axios'
import getCache from './getCache'
import setCache from './setCache'
import formatResponse from './formatResponse'
import formatError from './formatError'

async function get(
  url: string,
  params?: unknown,
  config?: Record<string, unknown>
): Promise<unknown> {
  // Priority reading of cache
  if (config?.cacheKey) {
    let cacheResponse = await getCache(url, config?.cacheKey as string | number)
    if (cacheResponse !== undefined) return cacheResponse
  }

  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
        ...(config as Record<string, unknown>)
      })
      .then((response) => {
        let newResponse = formatResponse(response as unknown as Record<string, unknown>)
        if (config?.cacheKey) setCache(url, config?.cacheKey as string | number, newResponse)
        resolve(newResponse)
      })
      .catch((error) => {
        reject(formatError(error))
      })
  })
}

export default get
