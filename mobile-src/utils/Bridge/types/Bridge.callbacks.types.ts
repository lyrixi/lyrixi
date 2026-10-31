import type { CancelResult, ErrorResult, SuccessResult } from '../../../types'
import type { MapPointType } from '../../../components/Map/types/Map.common.types'

/** 微信 JSSDK `scanQRCode` 返回的 `resultStr` 前缀码制类型 */
export enum BridgeScanCodeType {
  QR = 'QR',
  EAN_13 = 'EAN_13',
  EAN_8 = 'EAN_8',
  AZTEC = 'AZTEC',
  DATAMATRIX = 'DATAMATRIX',
  UPCA = 'UPCA',
  UPC_A = 'UPC_A',
  UPCE = 'UPCE',
  UPC_E = 'UPC_E',
  CODABAR = 'CODABAR',
  CODE_39 = 'CODE_39',
  CODE_93 = 'CODE_93',
  CODE_128 = 'CODE_128',
  ITF = 'ITF',
  MAXICODE = 'MAXICODE',
  PDF_417 = 'PDF_417',
  RSS_14 = 'RSS_14',
  RSSEXPANDED = 'RSSEXPANDED'
}

// --- 适配层成功结果：`SuccessResult<T>` 中的 `data`（各桥一致，以 WeChat 为典型）---

// {@link Bridge.getLocation} 成功时 `data`
export type BridgeGetLocationResultData = {
  longitude: number
  latitude: number
  type: MapPointType
  accuracy?: number
}

// {@link Bridge.scanCode} 成功时 `data`
export type BridgeScanCodeResultData = {
  content: string
  /** 码制类型（微信 scanQRCode 解析前缀；其它平台可能无此字段） */
  type?: BridgeScanCodeType
}

// {@link Bridge.chooseMedia} 单条本地媒体（微信 chooseImage 映射后的项）
export type BridgeChooseMediaLocalFile = {
  fileThumbnail?: string
  fileUrl?: string
  filePath?: string
  fileType?: string
} & Record<string, unknown>

// {@link Bridge.chooseMedia} 成功时 `data`
export type BridgeChooseMediaResultData = {
  localFiles: BridgeChooseMediaLocalFile[]
}

// {@link Bridge.detectFace} 成功时 `data`
export type BridgeDetectFaceResultData = {
  match: boolean
  confidence: number | undefined
}

// {@link Bridge.getPhoneNumber} 成功时 `data`
export type BridgeGetPhoneNumberResultData = {
  code: string
  phoneNumber: string
}

export type BridgeSuccessCallback<T = undefined> = (result: SuccessResult<T>) => void

export type BridgeErrorCallback = (result: ErrorResult) => void

export type BridgeCancelCallback = (result: CancelResult) => void
