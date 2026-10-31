import { pickBy as _pickBy } from 'lodash'

// 按谓词从对象中挑选属性：仅保留 predicate(value, key) 为真的键值对，返回新对象
function pickBy(...params: Parameters<typeof _pickBy>) {
  return _pickBy(...params)
}

export default pickBy
