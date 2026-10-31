import type {
  BridgeChooseMediaParams,
  BridgeConfigParams,
  BridgeDetectFaceParams,
  BridgeGetLocationParams,
  BridgeGetPhoneNumberParams,
  BridgeLoadParams,
  BridgeNavigateBackParams,
  BridgeNavigateParams,
  BridgeOnBackParams,
  BridgeOpenLocationParams,
  BridgePreviewFileParams,
  BridgePreviewMediaParams,
  BridgeScanCodeParams,
  BridgeSetTitleParams,
  BridgeShareParams,
  BridgeUploadFileParams
} from '../types'

function getLyrixi() {
  return (window.top ?? window).lyrixi
}

function whenLyrixiReady(fn: () => void) {
  const lyrixi = getLyrixi()
  if (lyrixi) {
    if (lyrixi.ready) {
      lyrixi.ready(fn)
    } else {
      fn()
    }
    return
  }
  const timer = window.setInterval(() => {
    const sdk = getLyrixi()
    if (sdk) {
      window.clearInterval(timer)
      if (sdk.ready) {
        sdk.ready(fn)
      } else {
        fn()
      }
    }
  }, 100)
}

let Bridge = {
  load: function (params?: BridgeLoadParams) {
    const { onSuccess } = params || {}
    whenLyrixiReady(() => {
      onSuccess?.({ status: 'success', data: undefined })
    })
  },
  config: function (params?: BridgeConfigParams) {
    const { onSuccess } = params || {}
    whenLyrixiReady(() => {
      onSuccess?.({ status: 'success', data: undefined })
    })
  },
  onBack: function (params?: BridgeOnBackParams) {
    getLyrixi()?.onBack?.(params)
  },
  setTitle: function (params?: BridgeSetTitleParams) {
    getLyrixi()?.setTitle?.(params)
  },
  navigatePush: function (params?: BridgeNavigateParams) {
    getLyrixi()?.navigatePush?.(params)
  },
  navigateReplace: function (params?: BridgeNavigateParams) {
    getLyrixi()?.navigateReplace?.(params)
  },
  navigateBack: function (params?: BridgeNavigateBackParams) {
    getLyrixi()?.navigateBack?.(params)
  },
  navigateLaunch: function (params?: BridgeNavigateParams) {
    getLyrixi()?.navigateLaunch?.(params)
  },
  openLocation: function (params?: BridgeOpenLocationParams) {
    getLyrixi()?.openLocation?.(params)
  },
  getLocation: function (params?: BridgeGetLocationParams) {
    getLyrixi()?.getLocation?.(params)
  },
  scanCode: function (params?: BridgeScanCodeParams) {
    getLyrixi()?.scanCode?.(params)
  },
  chooseMedia: function (params?: BridgeChooseMediaParams) {
    getLyrixi()?.chooseMedia?.(params)
  },
  uploadFile: function (params?: BridgeUploadFileParams) {
    getLyrixi()?.uploadFile?.(params)
  },
  previewMedia: function (params?: BridgePreviewMediaParams) {
    getLyrixi()?.previewMedia?.(params)
  },
  previewFile: function (params?: BridgePreviewFileParams) {
    getLyrixi()?.previewFile?.(params)
  },
  share: function (params?: BridgeShareParams) {
    getLyrixi()?.share?.(params)
  },
  detectFace: function (params?: BridgeDetectFaceParams) {
    getLyrixi()?.detectFace?.(params)
  },
  getPhoneNumber: function (params?: BridgeGetPhoneNumberParams) {
    getLyrixi()?.getPhoneNumber?.(params)
  }
}

export default Bridge
