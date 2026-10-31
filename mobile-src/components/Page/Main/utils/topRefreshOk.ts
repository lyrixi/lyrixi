// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

// 刷新完成
function topRefreshOk(
  topContainer: HTMLDivElement | null,
  isOk: boolean | string | undefined
): Promise<boolean> {
  return new Promise((resolve) => {
    const topText = topContainer?.querySelector?.('.lyrixi-page-main-pull-push-text')

    let finishMsg = ''
    if (isOk === false) {
      finishMsg = String(
        LocaleUtil.locale('刷新失败', 'lyrixi_245c7a0541c033776b61a33bda10bd99', undefined)
      )
    } else if (typeof isOk === 'string') {
      finishMsg = isOk
    } else {
      finishMsg = String(
        LocaleUtil.locale('刷新成功', 'lyrixi_efa2ebd79d14fa135072faa401a3154d', undefined)
      )
    }
    if (topText) topText.innerHTML = finishMsg

    setTimeout(() => {
      const topIcon = topContainer?.querySelector?.('.lyrixi-page-main-pull-push-icon')
      if (topIcon) {
        topIcon.classList.remove('lyrixi-page-main-pull-push-icon-down')
        topIcon.classList.remove('lyrixi-page-main-pull-push-icon-loading')
      }
      if (topContainer) topContainer.style.height = '0'

      resolve(true)
    }, 1000)
  })
}

export default topRefreshOk
