// 内库使用-start
import MathUtil from './../../../../utils/MathUtil'
// 内库使用-end

/* 测试使用-start
import { MathUtil } from 'lyrixi-mobile'
测试使用-end */

// 矫正小数位截取
function precisionFormatter(
  value: string,
  { precision, trim }: { precision?: number; trim?: boolean }
): string {
  let val: string = value
  // 符合截取条件时
  if (typeof precision === 'number' && !isNaN(Number(val)) && val !== '') {
    if (trim) {
      val = String(Number(val || 0))
    }
    val = MathUtil.fixed(val, precision)
  }
  return val
}

export default precisionFormatter
