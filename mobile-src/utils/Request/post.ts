import axios from 'axios'
import getCache from './getCache'
import setCache from './setCache'
import formatResponse from './formatResponse'
import formatError from './formatError'
import serializeParams from './serializeParams'

async function post(
  url: string,
  params?: unknown,
  config?: Record<string, unknown>
): Promise<unknown> {
  // Priority reading of cache
  if (config?.cacheKey) {
    let cacheResponse = await getCache(url, config?.cacheKey as string | number)
    if (cacheResponse !== undefined) return cacheResponse
  }

  const headers = config?.headers as Record<string, unknown> | undefined
  const contentType =
    (headers?.['content-type'] as string | undefined) ||
    (headers?.['Content-Type'] as string | undefined)

  let newParams = params
  if (
    contentType?.indexOf('x-www-form-urlencoded') !== -1 &&
    toString.call(params) !== '[object Object]'
  ) {
    newParams = serializeParams(params)
  }

  return new Promise((resolve, reject) => {
    axios
      .post(url, newParams, config)
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

export default post
