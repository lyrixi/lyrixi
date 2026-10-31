// 选中 sidebar 的 anchor
function activeAnchor(
  anchor: string,
  {
    sidebarElement,
    tooltipElement,
    tooltipText
  }: {
    sidebarElement?: HTMLElement | null
    tooltipElement?: HTMLElement | null
    tooltipText?: string
  }
): void {
  const buttonsElement = sidebarElement?.querySelectorAll?.('.lyrixi-indexbar-button')
  if (buttonsElement && buttonsElement.length) {
    for (let i = 0, buttonElement; (buttonElement = buttonsElement[i++] as Element | undefined); ) {
      buttonElement.classList.remove('lyrixi-active')
    }
  }

  const currentButtonElement = sidebarElement?.querySelector?.(
    `[data-indexbar-anchor-button="${anchor}"]`
  )
  if (currentButtonElement) {
    currentButtonElement.classList.add('lyrixi-active')
    if (tooltipElement) {
      tooltipElement.innerHTML = tooltipText ?? anchor ?? ''
    }
  }
}

export default activeAnchor
