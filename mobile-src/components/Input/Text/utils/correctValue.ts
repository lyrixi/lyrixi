import maxLengthFormatter from './maxLengthFormatter'
import minMaxFormatter from './minMaxFormatter'
import precisionFormatter from './precisionFormatter'

import type { InputTextCorrectValueParams } from '../../types'

// 内库使用-start
import MathUtil from '../../../../utils/MathUtil'
// 内库使用-end

/* 测试使用-start
import { MathUtil } from 'lyrixi-mobile'
测试使用-end */

// 矫正最大长度和小数位截取
function correctValue(value: string, params: InputTextCorrectValueParams): string {
  const { type, min, max, maxLength, trim, precision } = params
  let val: string = value
  if (!val) return val
  if (typeof val !== 'string') return ''

  // 最大最小值矫正
  val = minMaxFormatter(val, { min, max })

  // 小数位截取
  val = precisionFormatter(val, { precision, trim })

  // 最大长度载取
  val = maxLengthFormatter(val, { maxLength })

  if (type === 'number') {
    val = MathUtil.extractNumber(val)
  }

  return val
}

export default correctValue
