// 判断滚动条是否在底部
function isBottom(container: HTMLElement | null): boolean {
  if (!container) return false

  const clientHeight = container.clientHeight
  const scrollHeight = container.scrollHeight
  const scrollTop =
    container === document.body ? document.documentElement.scrollTop : container.scrollTop
  if (scrollTop + clientHeight >= scrollHeight - 2) {
    return true
  }
  return false
}
export default isBottom
