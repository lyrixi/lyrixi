// Clipboard 剪贴板

import type { ClipboardCopyParams } from './Clipboard.types'

// 内库使用-start
import LocaleUtil from './../LocaleUtil' // 国际化数据
// 内库使用-end

const Clipboard = {
  // 选择元素的内容
  selectContent: function (element: Node) {
    // 首先创建一个范围
    let rangeToSelect = document.createRange()
    rangeToSelect.selectNodeContents(element)

    // 选择内容
    let selection = window.getSelection()
    if (!selection) return
    selection.removeAllRanges()
    selection.addRange(rangeToSelect)
  },
  // 为execCommand方法创建一个临时元素
  createElementForExecCommand: function (textToClipboard: string) {
    let forExecElement = document.createElement('div')
    // 放置在可见区域之外
    forExecElement.style.position = 'absolute'
    forExecElement.style.left = '-10000px'
    forExecElement.style.top = '-10000px'
    // 将必要的文本写入元素并追加到文档中
    forExecElement.textContent = textToClipboard
    document.body.appendChild(forExecElement)
    // contentEditable模式对于Firefox中的execCommand方法是必需的
    forExecElement.contentEditable = 'true'

    return forExecElement
  },
  // 复制到剪贴板
  copy: function (input: string, params: ClipboardCopyParams = {}) {
    let textToClipboard = input

    let success = true
    if (window.clipboardData) {
      // Internet Explorer
      window.clipboardData.setData('Text', textToClipboard)
    } else {
      // 为execCommand方法创建一个临时元素
      let forExecElement = this.createElementForExecCommand(textToClipboard)

      // 选择元素的内容 ('copy'方法的execCommand在选择上起作用)
      this.selectContent(forExecElement)

      // UniversalXPConnect是Firefox中剪贴板访问所必需的
      try {
        window.netscape?.security?.PrivilegeManager?.enablePrivilege('UniversalXPConnect')
        // 将选定内容复制到剪贴板
        // 适用于Firefox和Safari 5之前的版本
        success = document.execCommand('copy', false, undefined)
      } catch (e) {
        success = false
      }

      // 删除临时元素
      document.body.removeChild(forExecElement)
    }

    if (success) {
      if (params?.onSuccess)
        params.onSuccess({
          status: 'success',
          message: LocaleUtil.locale(
            '复制到剪贴板成功',
            'lyrixi_4972304451f2ae7687888100446cbb99',
            undefined
          ) as string
        })
    } else {
      if (params?.onError)
        params.onError({
          status: 'error',
          message: LocaleUtil.locale(
            '当前设备不允许访问剪贴板',
            'lyrixi_4a3bc2967c96d7a27a8d217a151b7734',
            undefined
          ) as string
        })
    }
  }
}

export default Clipboard
