import { ACTION_SHEET_ANIMATION_DURATION_CLOSE } from './constants'
import actionSheetInstance from './ActionSheetInstance'

import type { ActionSheetCloseParams } from '../types'

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
  actionSheetInstance.root?.unmount()
  actionSheetInstance.root = null
  actionSheetInstance.rootElement?.remove()
  actionSheetInstance.rootElement = null
}

// 关闭当前 ActionSheet.open 实例（全局仅允许一个）
export default async function close(params?: ActionSheetCloseParams): Promise<void> {
  const { animated = true } = params ?? {}

  if (!actionSheetInstance.root || !actionSheetInstance.rootElement) {
    return
  }

  const currentGeneration = ++closeGeneration
  const root = actionSheetInstance.root
  const rootElement = actionSheetInstance.rootElement

  if (animated) {
    playCloseAnimation(rootElement)
    await delay(ACTION_SHEET_ANIMATION_DURATION_CLOSE)
    if (currentGeneration !== closeGeneration) {
      return
    }
  }

  if (actionSheetInstance.root === root && actionSheetInstance.rootElement === rootElement) {
    destroy()
  }
}
