// 滚动到报错的位置
function scrollToErrorElement() {
  // 错误消息
  let errMsg = ''

  let errorElement = document.querySelector('.adm-form-item-feedback-error')
  if (errorElement) {
    errMsg = errorElement?.innerHTML || ''

    // 滚动到错误位置
    errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  return errMsg
}

export default scrollToErrorElement
