import _isEmpty from 'lodash/isEmpty'

function isEmpty(value: unknown): boolean {
  if (typeof value === 'number' || typeof value === 'boolean') {
    return false
  }
  if (value instanceof Date) {
    return isNaN(value.getTime())
  }
  return _isEmpty(value)
}

export default isEmpty
