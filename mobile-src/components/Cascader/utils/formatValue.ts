import type { CascaderTab } from '../types'

// 格式化选中项, 补充parentid
function formatValue(value: CascaderTab[] | null | undefined): CascaderTab[] | null {
  if (!Array.isArray(value) || !value.length) return null
  for (let index = 0; index < value.length; index++) {
    const item = value[index]
    if (item.id && typeof item.id === 'number') {
      item.id = String(item.id)
    }
    if (item.parentid && typeof item.parentid === 'number') {
      item.parentid = String(item.parentid)
    }
    if (index !== 0 && !item.parentid) {
      item.parentid = value?.[index - 1]?.id || ''
    }
  }
  return value
}

export default formatValue
