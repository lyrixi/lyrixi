// 飞书 JSAPI 私有响应（仅 Lark 桥内使用，不通过 `types.ts` 导出）。

export type BridgeLarkGetLocationSuccessResponse = {
  longitude?: number
  latitude?: number
  accuracy?: number
  type?: string
  [key: string]: unknown
}

export type BridgeLarkScanCodeSuccessResponse = {
  resultStr?: string
  [key: string]: unknown
}
