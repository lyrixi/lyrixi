import { BridgeScanCodeType } from '../types'

/** 与历史 if-else 链一致的匹配顺序 */
const scanCodeTypes: BridgeScanCodeType[] = [
  BridgeScanCodeType.QR,
  BridgeScanCodeType.EAN_13,
  BridgeScanCodeType.EAN_8,
  BridgeScanCodeType.AZTEC,
  BridgeScanCodeType.DATAMATRIX,
  BridgeScanCodeType.UPCA,
  BridgeScanCodeType.UPC_A,
  BridgeScanCodeType.UPCE,
  BridgeScanCodeType.UPC_E,
  BridgeScanCodeType.CODABAR,
  BridgeScanCodeType.CODE_39,
  BridgeScanCodeType.CODE_93,
  BridgeScanCodeType.CODE_128,
  BridgeScanCodeType.ITF,
  BridgeScanCodeType.MAXICODE,
  BridgeScanCodeType.PDF_417,
  BridgeScanCodeType.RSS_14,
  BridgeScanCodeType.RSSEXPANDED
]

export default scanCodeTypes
