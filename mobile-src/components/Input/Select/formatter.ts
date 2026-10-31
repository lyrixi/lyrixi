import type { ListItem } from '../../List/types'

// 内库使用-start
import ValidatorUtil from './../../../utils/ValidatorUtil'
// 内库使用-end

/* 测试使用-start
import { ValidatorUtil } from 'lyrixi-mobile'
测试使用-end */

// 显示名称
function getDisplayValue(value: unknown, { separator }: { separator?: string } = {}): string {
  if (typeof value !== 'object' || value === null) {
    return value as string
  }
  // 纯对象
  if (ValidatorUtil.isPlainObject(value)) {
    return String((value as ListItem)?.name ?? '')
  }
  // 数组
  else if (Array.isArray(value)) {
    let displayValues = (value as ListItem[]).map((item) => String(item?.name ?? ''))
    displayValues = displayValues.filter((item) => item)
    return displayValues.join(separator && typeof separator === 'string' ? separator : ',')
  }

  return ''
}

export default getDisplayValue
