import type { CheckboxItem } from './../types'

// formatValue - 将传入的 value 规范化为标准对象格式
export default function formatValue(
  value: unknown,
  list: CheckboxItem[],
  multiple: boolean
): CheckboxItem | CheckboxItem[] | null {
  if (!Array.isArray(list)) {
    return multiple ? [] : null
  }

  if (multiple) {
    if (!Array.isArray(value)) {
      return []
    }

    return (value as unknown[])
      .map((item) => {
        if (item && typeof item === 'object' && (item as CheckboxItem).id) {
          return item as CheckboxItem
        }
        if (typeof item === 'string' || typeof item === 'number') {
          return list.find((listItem) => listItem.id === item) ?? null
        }
        return null
      })
      .filter((item): item is CheckboxItem => item !== null)
  }

  if (value && typeof value === 'object' && (value as CheckboxItem).id) {
    return value as CheckboxItem
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return list.find((item) => item.id === value) ?? null
  }

  return null
}
