import type { BridgeScanCodeResultData } from '../types'
import scanCodeTypes from './scanCodeTypes'

export function parseWeChatScanCodeResult(rawResultStr: string): BridgeScanCodeResultData {
  for (const codeType of scanCodeTypes) {
    const prefix = `${codeType},`
    if (rawResultStr.indexOf(prefix) >= 0) {
      return {
        content: rawResultStr.substring(prefix.length),
        type: codeType
      }
    }
  }
  return { content: rawResultStr }
}
