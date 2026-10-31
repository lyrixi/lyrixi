// 与Attach.hideLoading共用

// 内库使用-start
import Loading from './../../../Loading'
// 内库使用-end

/* 测试使用-start
import { Loading } from 'lyrixi-mobile'
测试使用-end */

function hideLoading(
  element: Element | null | undefined,
  { failIndexes }: { failIndexes?: number[] } = {}
) {
  if (!element) return
  // 根节点遮罩
  element.classList.remove('lyrixi-uploading')
  // 新增按钮遮罩
  let chooseElement = element.querySelector('[data-type="upload"]')
  if (chooseElement) chooseElement.classList.remove('lyrixi-uploading')
  // 当前项遮罩
  let itemsElement = element.querySelectorAll(`[data-index]`)
  if (itemsElement) {
    for (let i = 0; i < itemsElement.length; i++) {
      const itemElement = itemsElement[i] as HTMLElement
      let itemIndex = Number(itemElement.getAttribute('data-index'))
      itemElement.classList.remove('lyrixi-uploading')
      // 更新失败状态
      if (Array.isArray(failIndexes) && failIndexes.includes(itemIndex)) {
        itemElement.classList.add('lyrixi-error')
      }
    }
  }

  Loading.close()
}

export default hideLoading
