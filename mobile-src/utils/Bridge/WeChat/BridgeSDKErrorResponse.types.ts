/**
 * 各平台原生 JSAPI fail / cancel 等错误对象的共通形态（仅 Bridge 各端实现内使用，不通过 `types.ts` 导出）。
 * - `errMsg`：微信 / 飞书常见
 * - `errorMessage` / `errorCode`：钉钉常见
 * - `message`：飞书部分接口（如 share）
 */
export type BridgeSDKErrorResponse = {
  errMsg?: string
  errorMessage?: string
  message?: string
  errorCode?: string | number
  [key: string]: unknown
}
