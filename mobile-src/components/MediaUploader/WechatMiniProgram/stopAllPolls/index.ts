declare global {
  interface Window {
    wechatMiniProgramPolls?: Record<string, boolean>
  }
}

function stopAllPolls(currentId?: string): void {
  if (!window.wechatMiniProgramPolls) window.wechatMiniProgramPolls = {}
  if (currentId !== undefined) {
    window.wechatMiniProgramPolls[currentId] = true
  }

  const wins = window as unknown as Record<string, unknown>
  for (const id in window.wechatMiniProgramPolls) {
    if (Object.prototype.hasOwnProperty.call(window.wechatMiniProgramPolls, id)) {
      window.clearTimeout(wins[id] as ReturnType<typeof setTimeout>)
    }
  }
}

export default stopAllPolls
