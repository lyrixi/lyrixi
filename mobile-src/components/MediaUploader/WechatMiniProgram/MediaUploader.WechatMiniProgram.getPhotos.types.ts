// 内库使用-start
import type { BridgeUploadFileParams } from '../../../utils/Bridge/types/index'
// 内库使用-end

/* 测试使用-start
import { BridgeUploadFileParams, BridgeSuccessCallback, FileItem } from 'lyrixi-mobile'
测试使用-end */

// export interface WechatMiniProgramCallback extends Omit<BridgeSuccessCallback<FileItem>, 'status'> {
//   status: 'success' | 'error'
// }

export interface WechatMiniProgramGetPhotosParams {
  url: string
  formatResponse?: BridgeUploadFileParams['formatResponse']
}
