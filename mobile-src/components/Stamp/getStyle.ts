import type { CSSProperties } from 'react'

import type { StampStyleInput } from './types'

// 内库使用-start
import VariablesUtil from './../../utils/VariablesUtil'
// 内库使用-end

/* 测试使用-start
import { VariablesUtil } from 'lyrixi-mobile'
测试使用-end */

function getStyle({ color, style }: StampStyleInput) {
  // 判断颜色是否在枚举值中
  const colorClass =
    color !== null && color !== undefined && color !== '' ? VariablesUtil.getColorClass(color) : ''
  // 构建自定义样式
  const newStyle: CSSProperties = {
    ...(!colorClass
      ? ({
          color: color,
          // 如果不考虑兼容性问题, 可以使用自定义样式:
          '--lyrixi-stamp-color': color
        } as CSSProperties)
      : {}),
    ...style
  }

  const newClassName = colorClass ? `lyrixi-${color}` : undefined

  return { style: newStyle, className: newClassName }
}

export default getStyle
