// 转换为left/top体系
function getPosition(target: HTMLElement): { left: number; top: number } {
  const rect = target.getBoundingClientRect()
  const style = window.getComputedStyle(target)

  // 横向转换
  let left = rect.left
  if (style.left !== 'auto' && style.right === 'auto') {
    left = parseFloat(style.left) || 0
  } else if (style.right !== 'auto') {
    left = window.innerWidth - parseFloat(style.right) - rect.width
  }

  // 纵向转换
  let top = rect.top
  if (style.top !== 'auto' && style.bottom === 'auto') {
    top = parseFloat(style.top) || 0
  } else if (style.bottom !== 'auto') {
    top = window.innerHeight - parseFloat(style.bottom) - rect.height
  }

  return { left, top }
}

export default getPosition
