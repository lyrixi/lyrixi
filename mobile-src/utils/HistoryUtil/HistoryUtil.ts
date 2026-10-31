import type { HistoryUtilBackHandler } from './types'

const HistoryUtil = {
  urlParameter: undefined as string | undefined,
  // 此方法将会自动调用
  back: () => {
    // 如果未返回, 则调用返回
    setTimeout(() => {
      if (
        HistoryUtil.urlParameter &&
        window.location.href.indexOf(HistoryUtil.urlParameter) !== -1
      ) {
        window.history.go(-1)
      }
    }, 100)

    // Remove handler
    window.removeEventListener('popstate', HistoryUtil.back, false)

    // Trigger onBack
    if (HistoryUtil.onBack) {
      HistoryUtil.onBack()
    }
  },
  onBack: null as HistoryUtilBackHandler,
  // 增加一条新的历史记录并且支持回调(此方法为新方法，不依赖History实例)
  /*
    HistoryUtil.navigate(`nestedRoute=true`, {
      onBack: () => {
        // Nested route back
      }
    })
  */
  navigate: function (urlParameter: string, { onBack }: { onBack?: () => void }) {
    HistoryUtil.onBack = onBack ?? null
    HistoryUtil.urlParameter = urlParameter

    // 路径增加routePath
    let path = window.location.href
    if (path.indexOf(urlParameter) === -1) {
      path += `${path.indexOf('?') === -1 ? '?' : '&'}${urlParameter}`

      // 增加历史记录
      window.history.pushState(
        {
          href: path
        },
        document.title,
        path
      )
    }

    // Add handler
    window.removeEventListener('popstate', HistoryUtil.back, false)
    window.addEventListener('popstate', HistoryUtil.back, false)
  }
}

export default HistoryUtil
