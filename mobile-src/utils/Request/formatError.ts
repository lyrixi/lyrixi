import type { RequestError } from './Request.format.types'

function formatError(response: RequestError): RequestError {
  let result: RequestError = response
  if (response.config && response.response) {
    result = response.response
  }
  return result
}

export default formatError
