import { MESSAGE_ANIMATION_DURATION_CLOSE } from './constants'
import messageInstance from './MessageInstance'

import type { MessageCloseParams } from '../types'

let closeGeneration = 0

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function playCloseAnimation(rootElement: HTMLDivElement) {
  rootElement.querySelector('.lyrixi-mask')?.classList.remove('lyrixi-active')
  rootElement.querySelector('.lyrixi-modal-animation')?.classList.remove('lyrixi-active')
}

function destroy() {
  messageInstance.root?.unmount()
  messageInstance.root = null
  messageInstance.rootElement?.remove()
  messageInstance.rootElement = null
}

// 关闭当前 Message.open 实例（全局仅允许一个）
export default async function close(params?: MessageCloseParams): Promise<void> {
  const { animated = true } = params ?? {}

  if (!messageInstance.root || !messageInstance.rootElement) {
    return
  }

  const currentGeneration = ++closeGeneration
  const root = messageInstance.root
  const rootElement = messageInstance.rootElement

  if (animated) {
    playCloseAnimation(rootElement)
    await delay(MESSAGE_ANIMATION_DURATION_CLOSE)
    if (currentGeneration !== closeGeneration) {
      return
    }
  }

  if (messageInstance.root === root && messageInstance.rootElement === rootElement) {
    destroy()
  }
}
