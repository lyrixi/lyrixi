// 与Attach.showLoading共用

// 内库使用-start
import Loading from './../../../Loading'
// 内库使用-end

/* 测试使用-start
import { Loading } from 'lyrixi-mobile'
测试使用-end */

// 显隐Loading
function showLoading(
  element: Element | null | undefined,
  { content, index }: { content?: string; index?: number } = {}
) {
  if (!element) return
  // 根节点遮罩
  element.classList.add('lyrixi-uploading')
  // 新增按钮遮罩
  let chooseElement = element.querySelector('[data-type="upload"]')
  if (chooseElement) chooseElement.classList.add('lyrixi-uploading')
  // 当前项遮罩
  let itemElement =
    typeof index === 'number' ? element.querySelector(`[data-index="${index}"]`) : null
  if (itemElement) {
    itemElement.classList.remove('lyrixi-error')
    itemElement.classList.add('lyrixi-uploading')
  }

  Loading.open(content ? { content } : { modalClassName: 'lyrixi-hide' })
}

export default showLoading
