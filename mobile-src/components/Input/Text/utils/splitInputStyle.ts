import type { CSSProperties } from 'react'

function splitStyle(externalStyle?: CSSProperties): {
  style: CSSProperties
  inputStyle: CSSProperties
} {
  const {
    color,
    fontSize,
    height,
    lineHeight,
    minHeight,
    maxHeight,
    textAlign,
    textIndent,
    ...rest
  } = externalStyle || {}

  const inputStyle: CSSProperties = {}
  if (color) {
    inputStyle.color = color
  }
  if (fontSize) {
    inputStyle.fontSize = fontSize
  }
  if (height) {
    inputStyle.height = height
  }
  if (minHeight) {
    inputStyle.minHeight = minHeight
  }
  if (maxHeight) {
    inputStyle.maxHeight = maxHeight
  }
  if (textAlign) {
    inputStyle.textAlign = textAlign
  }
  if (textIndent) {
    inputStyle.textIndent = textIndent
  }
  if (lineHeight) {
    inputStyle.lineHeight = lineHeight
  }

  const style: CSSProperties = rest

  // 强制宽度
  if (style?.width && !style?.flex) {
    style.flex = 'none'
  }

  return {
    style: style,
    inputStyle: inputStyle
  }
}

export default splitStyle
