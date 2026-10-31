import isEqualFields from './isEqualFields'

// 内库使用-start
import ValidatorUtil from '../ValidatorUtil'
// 内库使用-end

/* 测试使用-start
import { ValidatorUtil } from 'lyrixi-mobile'
测试使用-end */

function isEqual(
  array1: Record<string, unknown>[],
  array2: Record<string, unknown>[],
  fieldNames?: string[]
): boolean {
  if (!Array.isArray(array1) || !Array.isArray(array2)) return false

  if (array1.length !== array2.length) {
    return false
  }
  if (array1.length === 0 && array2.length === 0) {
    return true
  }

  if (fieldNames && isEqualFields(array1, array2, fieldNames) === false) {
    return false
  }

  return ValidatorUtil.isEqual(array1, array2)
}

export default isEqual
