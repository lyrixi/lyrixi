// Bridge 类型唯一出口：业务与其它模块请从此文件引入类型（适配层入参、`SuccessResult` 等见 `src/types`）。

import type {
  BridgeChooseMediaParams,
  BridgeConfigParams,
  BridgeDetectFaceParams,
  BridgeGetPhoneNumberParams,
  BridgeGetBrowserLocationParams,
  BridgeGetLocationParams,
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
  BridgeTelParams,
  BridgeUploadFileParams
} from './Bridge.params.types'

// `_getCurrentBridge` Bridge实例类型
export interface BridgeAdapter {
  load: (params?: BridgeLoadParams) => void
  config: (params?: BridgeConfigParams) => void | Promise<void>
  onBack: (params?: BridgeOnBackParams) => void
  setTitle?: (params?: BridgeSetTitleParams) => void
  navigatePush?: (params?: BridgeNavigateParams) => void
  navigateReplace?: (params?: BridgeNavigateParams) => void
  navigateBack?: (params?: BridgeNavigateBackParams) => void
  navigateLaunch?: (params?: BridgeNavigateParams) => void
  tel?: (params?: BridgeTelParams) => void
  openLocation: (params?: BridgeOpenLocationParams) => void
  getLocation: (params?: BridgeGetLocationParams) => void
  getBrowserLocation?: (params?: BridgeGetBrowserLocationParams) => void
  scanCode?: (params?: BridgeScanCodeParams) => void
  chooseMedia?: (params?: BridgeChooseMediaParams) => void
  uploadFile?: (params?: BridgeUploadFileParams) => void
  previewMedia: (params?: BridgePreviewMediaParams) => void
  previewFile?: (params?: BridgePreviewFileParams) => void
  share?: (params?: BridgeShareParams) => void
  detectFace?: (params?: BridgeDetectFaceParams) => void
  getPhoneNumber?: (params?: BridgeGetPhoneNumberParams) => void
}
