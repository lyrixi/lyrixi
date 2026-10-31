import type { CSSProperties } from 'react'
// 内库使用-start
import VariablesUtil from './../../utils/VariablesUtil'
import DOMUtil from './../../utils/DOMUtil'
import type { FontColor, FontSize, FontWeight } from './../../utils/VariablesUtil/types'
// 内库使用-end

/* 测试使用-start
import { VariablesUtil, DOMUtil } from 'lyrixi-mobile'
import type { FontColor, FontSize, FontWeight } from 'lyrixi-mobile'
测试使用-end */

function getStyle({
  // Style
  color,
  fontSize,
  fontWeight,
  style,
  className
}: {
  color?: FontColor | string
  fontSize?: FontSize | string | number
  fontWeight?: FontWeight | string | number
  style?: CSSProperties
  className?: string
}) {
  // 判断颜色是否在枚举值中（含类名 token 的需与 design token 字符串比较）
  const colorClass = color ? VariablesUtil.getColorClass(color) : ''
  const fontSizeClass = typeof fontSize === 'string' ? VariablesUtil.getFontSizeClass(fontSize) : ''
  const fontWeightClass =
    typeof fontWeight === 'string' ? VariablesUtil.getFontWeightClass(fontWeight) : ''

  // 构建自定义样式
  const newStyle: CSSProperties = {
    ...(!colorClass && color ? { color } : {}),
    ...(!fontSizeClass && fontSize ? { fontSize: fontSize } : {}),
    ...(!fontWeightClass && fontWeight ? { fontWeight: fontWeight } : {}),
    ...style
  }

  const newClassName = DOMUtil.classNames(colorClass, fontSizeClass, fontWeightClass, className)

  return { style: newStyle, className: newClassName }
}

export default getStyle
