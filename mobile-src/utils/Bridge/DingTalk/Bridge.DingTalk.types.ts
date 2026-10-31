// 钉钉 JSAPI 私有响应（仅 DingTalk 桥内使用，不通过 `types.ts` 导出）。

export type BridgeDingTalkGetLocationSuccessResponse = {
  latitude?: number
  longitude?: number
  accuracy?: number
  [key: string]: unknown
}

export type BridgeDingTalkScanCodeSuccessResponse = {
  text?: string
  [key: string]: unknown
}

export type BridgeDingTalkChooseImageSuccessResponse = {
  files?: Array<Record<string, unknown> & { path?: string; fileType?: string }>
  [key: string]: unknown
}

export type BridgeDingTalkUploadFileSuccessResponse = {
  statusCode?: number
  data?: unknown
  [key: string]: unknown
}

export type BridgeDingTalkFaceDetectSuccessResponse = {
  photoStatus?: number
  [key: string]: unknown
}
