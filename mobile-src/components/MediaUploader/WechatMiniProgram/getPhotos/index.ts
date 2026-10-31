import type { ErrorResult, SuccessResult } from '../../../../types'
import type { WechatMiniProgramGetPhotosParams } from '../MediaUploader.WechatMiniProgram.getPhotos.types'

// 内库使用-start
import type { FileItem } from '../../../../utils/Bridge/types'
import Request from './../../../../utils/Request'
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { Request, LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

function getPhotos(
  id: string,
  params: WechatMiniProgramGetPhotosParams
): Promise<string | FileItem | null> {
  const { url, formatResponse } = params
  return new Promise((resolve) => {
    Request.get(`${url}?fileCheckKey=${id}`)
      .then(async (result) => {
        console.log('服务器返回照片结果:', result)
        let response = {
          status: 'success',
          code: '',
          message: '',
          data: result as Record<string, unknown>
        } as { status: string; [key: string]: unknown }

        if (typeof formatResponse === 'function') {
          response = (await formatResponse(
            { status: 'success', code: '', message: '', data: result },
            { platform: 'wechatMiniProgram' }
          )) as ErrorResult | SuccessResult<FileItem>
        }

        console.log('照片格式化完成:', response)
        if (response.status === 'success') {
          resolve(response.data as FileItem)
        } else if (response.status === 'error') {
          resolve(response.message as string)
        } else {
          resolve(null)
        }
      })
      .catch(() => {
        resolve(
          LocaleUtil.locale('获取照片异常', 'lyrixi_a189fb8a40ac4d851d6888b886c0022f') as string
        )
      })
  })
}

export default getPhotos
