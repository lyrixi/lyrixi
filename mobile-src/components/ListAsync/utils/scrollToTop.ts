function scrollToTop(container: HTMLElement | null | undefined) {
  if (!container) return
  container.scrollTop = 0
}

export default scrollToTop
