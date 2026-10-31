import type { SnapToEdgeParams } from './../types'

// 贴边逻辑（修复纵向越界）
const snapToEdge = (target: HTMLElement, params: SnapToEdgeParams): void => {
  const { gap, onChange } = params
  const rect = target.getBoundingClientRect()
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  const elementWidth = rect.width
  const elementHeight = rect.height
  // 最大高距(已贴底)
  const maxTop = screenHeight - elementHeight
  // 最大左距(已贴右)
  const maxLeft = screenWidth - elementWidth

  // 横向边界处理
  let finalLeft = rect.left
  if (rect.left < 0) {
    finalLeft = 0
  } else if (rect.right > screenWidth) {
    finalLeft = maxLeft
  }

  // 纵向边界处理(越界处理)
  let finalTop = rect.top
  if (rect.top < 0) {
    finalTop = 0
  } else if (rect.bottom > screenHeight) {
    finalTop = maxTop
  }

  // 横向自动贴边(未越界时, 贴边处理)
  if (finalLeft >= 0 && finalLeft <= maxLeft) {
    finalLeft = finalLeft < screenWidth / 2 ? 0 : maxLeft
  }

  // 应用最终位置
  target.style.transition = 'left 0.3s ease, right 0.3s ease, top 0.3s ease'

  // 横向定位
  if (finalLeft === 0) {
    target.style.left = gap?.left ? `${gap.left}px` : '0'
    target.style.right = 'auto'
  } else {
    target.style.right = gap?.right ? `${gap.right}px` : '0'
    target.style.left = 'auto'
  }

  console.log('最小高度:')

  // 纵向定位（修复点：应用修正后的top）
  let top = 0
  // 上半区
  if (finalTop < screenHeight / 2) {
    top = finalTop < (gap?.top || 0) ? gap?.top || 0 : finalTop
  }
  // 下半区
  else {
    // top = finalTop
    top = finalTop > maxTop - (gap?.bottom || 0) ? maxTop - (gap?.bottom || 0) : finalTop
  }
  target.style.top = `${top}px`
  target.style.bottom = 'auto' // 清除底部定位

  if (onChange) {
    onChange({
      top: target.style.top,
      right: target.style.right,
      bottom: target.style.bottom,
      left: target.style.left
    })
  }
}
export default snapToEdge
