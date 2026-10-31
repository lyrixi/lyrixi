import type { RequestResponse } from './Request.format.types'

function formatResponse(response: RequestResponse): unknown {
  let result: unknown = response
  if (response.config && response.data !== undefined) {
    result = response.data
  }
  if (typeof result === 'string') {
    try {
      return JSON.parse(result)
    } catch (error) {
      console.log('result转换JSON失败' + error)
      return result
    }
  }
  return result
}

export default formatResponse
