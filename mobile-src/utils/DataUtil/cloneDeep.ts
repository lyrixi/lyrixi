import _cloneDeep from 'lodash/cloneDeep'

function cloneDeep<T>(value: T): T {
  return _cloneDeep(value)
}

export default cloneDeep
