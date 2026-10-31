import uploadLocalFile from './uploadLocalFile'

// 内库使用-start
import type { BridgeUploadFileParams, FileItem } from './../../../../utils/Bridge/types'
import ValidatorUtil from './../../../../utils/ValidatorUtil'
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { ValidatorUtil, LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

// 单张照片上传
function uploadItem(
  item: FileItem,
  {
    getUploadUrl,
    formatHeaders,
    formatPayload,
    formatResponse,
    verifyImage,
    platform
  }: BridgeUploadFileParams
): Promise<unknown> {
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    let errMsg = ''
    if (ValidatorUtil.isEmpty(item?.localFile)) {
      errMsg = LocaleUtil.locale(
        '没有localFile，无法上传！',
        'lyrixi_8ac73a3ce4e53db295057aaab0e6b1cf'
      ) as string
      resolve(errMsg)
      return
    }

    // 上传到阿里云
    let newItem = await uploadLocalFile({
      localFile: item.localFile!,
      getUploadUrl,
      formatHeaders,
      formatPayload: (payload: Record<string, unknown>, payloadExtra: { platform: string }) => {
        const merged = { ...payload, ...(item as Record<string, unknown>) }
        const result = formatPayload?.(merged, payloadExtra)
        return result ?? {}
      },
      formatResponse,
      verifyImage,
      item,
      platform
    })

    resolve(newItem)
  })
}

export default uploadItem
