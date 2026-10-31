// 内库使用-start
import type { BridgeUploadFileParams, FileItem } from '../../../../utils/Bridge/types'
import AssetUtil from './../../../../utils/AssetUtil'
import Bridge from './../../../../utils/Bridge'
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { AssetUtil, Bridge, LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

// 上传localFile
function uploadLocalFile({
  localFile,
  getUploadUrl,
  formatHeaders,
  formatPayload,
  formatResponse,
  verifyImage,
  item,
  platform
}: BridgeUploadFileParams): Promise<unknown> {
  let fileItem = item as FileItem
  return new Promise((resolve) => {
    Bridge.uploadFile(
      {
        getUploadUrl,
        localFile,
        formatHeaders,
        formatPayload,
        formatResponse,
        onSuccess: async function (response) {
          if ((response.status as string) === 'error') {
            resolve({
              ...fileItem,
              status: 'error',
              message: response.message
            })
            return
          }

          // response.data为新格式化后的新item: {fileThumbnail: '全路径', fileUrl: '全路径', filePath: '目录/年月/照片名.jpg', status: 'success' | 'error'}
          let newItem = response.data

          // 校验其是否真的是否法图片
          if (fileItem?.fileType === 'image' && verifyImage) {
            console.log('校验图片是否可访问:', newItem?.fileThumbnail)
            let isValid = await AssetUtil.accessImage(newItem?.fileThumbnail ?? '')
            if (!isValid) {
              resolve({
                ...fileItem,
                status: 'error',
                message: LocaleUtil.locale(
                  '图片加载失败，请重试',
                  'lyrixi_419ade42d1243fe183355b7930c4f830'
                )
              })
              return
            }
          }

          delete fileItem.message
          resolve({
            ...fileItem,
            ...newItem,
            status: 'success'
          })
        },
        onError: function (error) {
          resolve({
            ...fileItem,
            status: 'error',
            message: error.message
          })
        }
      },
      platform
    )
  })
}

export default uploadLocalFile
