import _isEqual from 'lodash/isEqual'

function isEqual(...params: Parameters<typeof _isEqual>): boolean {
  return _isEqual(...params)
}

export default isEqual
