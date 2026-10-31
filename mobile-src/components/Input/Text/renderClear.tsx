import React from 'react'

import type { InputTextRenderClearParams } from './Input.Text.renderClear.types'
import IconClear from './../Icons/Clear'

// 渲染清除按钮
function renderClear(params: InputTextRenderClearParams): React.ReactNode {
  const { id, clearRender, allowClear, clearable = false, onClear, onTouchStart } = params
  // 自定义渲染清空按钮
  if (typeof clearRender === 'function') {
    let clearNode = clearRender({
      clearable,
      allowClear,
      onClear: onClear,
      // 解决点击失焦后触发onBlur的问题
      onTouchStart: onTouchStart
    })

    if (clearNode !== undefined) return clearNode
  }

  // 默认渲染
  if (!clearable) return null
  return (
    <IconClear id={id ? `${id}-clear` : undefined} onTouchStart={onTouchStart} onClick={onClear} />
  )
}

export default renderClear
