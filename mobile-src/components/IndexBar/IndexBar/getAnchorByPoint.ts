// 滚动到指定位置
function getAnchor({ x, y }: { x: number; y: number }): string {
  const currentButtonElement = document.elementFromPoint(x, y)
  if (!currentButtonElement?.classList?.contains?.('lyrixi-indexbar-button')) return ''

  // 获取当前选中项
  const anchor = currentButtonElement.getAttribute('data-indexbar-anchor-button')
  if (!anchor) return ''

  return anchor
}

export default getAnchor
