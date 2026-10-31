import type { TransferItem } from './../types'

// 格式化value, 过滤不合法的值
function formatValue(value: unknown): TransferItem[] {
  if (Array.isArray(value)) {
    return value as TransferItem[]
  }
  return []
}

export default formatValue
