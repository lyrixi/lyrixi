import type { ListAsyncScrollToLocationParams } from './../types'

// 滚动到指定 id 的 Item（实体列表：按 DOM id 定位）
function scrollToLocation(
  params: ListAsyncScrollToLocationParams,
  options: { scrollerElement: HTMLElement | null | undefined }
): void {
  const { id } = params
  const { scrollerElement } = options
  if (!scrollerElement || !id) return

  const idStr = String(id)
  const byId = typeof document !== 'undefined' ? document.getElementById(idStr) : null
  const targetElement =
    byId && scrollerElement.contains(byId)
      ? byId
      : (scrollerElement.querySelector(
          `[id="${idStr.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"]`
        ) as HTMLElement | null)

  if (!targetElement) return

  scrollerElement.scrollTop =
    scrollerElement.scrollTop +
    targetElement.getBoundingClientRect().top -
    scrollerElement.getBoundingClientRect().top
}

export default scrollToLocation
