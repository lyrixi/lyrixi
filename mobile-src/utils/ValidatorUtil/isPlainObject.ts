import _isPlainObject from 'lodash/isPlainObject'

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return _isPlainObject(value)
}

export default isPlainObject
