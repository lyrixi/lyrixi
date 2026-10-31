// 内库使用-start
import MathUtil from '../../../../utils/MathUtil'
// 内库使用-end

/* 测试使用-start
import { MathUtil } from 'lyrixi-mobile'
测试使用-end */

// 矫正最大值和最小值
function minMaxFormatter(val: string, { min, max }: { min?: number; max?: number }): string {
  if (MathUtil.isNumber(val)) {
    if (typeof max === 'number') {
      // eslint-disable-next-line
      if (Number(val) > max) val = String(max)
    }
    if (typeof min === 'number') {
      // eslint-disable-next-line
      if (Number(val) < min) val = String(min)
    }
  }
  return val
}

export default minMaxFormatter
