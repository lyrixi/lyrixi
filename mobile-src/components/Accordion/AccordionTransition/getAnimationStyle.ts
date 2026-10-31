import React from 'react'

/**
 * 根据内容高度动态计算动画样式
 * @param contentHeight - 内容实际高度（scrollHeight）
 * @param minHeight - 收起时的最小高度
 * @param isExpanded - 是否展开
 * @returns 包含 maxHeight 和 transitionDuration 的样式对象
 */
export const getAnimationStyle = (
  contentHeight: number,
  minHeight: number = 0,
  isExpanded: boolean = false
): React.CSSProperties => {
  // 计算展开时的 max-height（实际高度 + 一点余量）
  const expandedMaxHeight = contentHeight + 50

  // 计算收起时的 max-height
  const collapsedMaxHeight = minHeight

  // 动态计算动画时长
  // 基础时长 200ms，每 100px 增加 50ms，最短 200ms，最长 600ms
  const heightDiff = Math.abs(expandedMaxHeight - collapsedMaxHeight)
  const baseDuration = 300 // ms
  const durationPerHundredPx = 50 // ms
  const minDuration = 300 // ms
  const maxDuration = 800 // ms

  const calculatedDuration = baseDuration + (heightDiff / 100) * durationPerHundredPx
  const duration = Math.min(Math.max(calculatedDuration, minDuration), maxDuration)

  return {
    '--lyrixi-accordion-max-height': isExpanded
      ? `${expandedMaxHeight}px`
      : `${collapsedMaxHeight}px`,
    '--lyrixi-accordion-duration': `${duration}ms`
  } as React.CSSProperties
}

export default getAnimationStyle
