import type {
  WechatMiniProgramClearPhotosParams,
  WechatMiniProgramClearPhotosResult
} from '../MediaUploader.WechatMiniProgram.clearPhotos.types'

// 内库使用-start
import Toast from './../../../Toast'
import Request from './../../../../utils/Request'
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { Toast, Request, LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

function clearPhotos(id: string, params: WechatMiniProgramClearPhotosParams): Promise<boolean> {
  const { url } = params
  return new Promise((resolve) => {
    console.log('清除照片:', url, id)
    Request.post(url, {
      fileCheckKey: id,
      imageParamList: []
    })
      .then((result) => {
        console.log('照片清除成功:', result)
        const res = result as WechatMiniProgramClearPhotosResult
        if (res.code === '1') {
          resolve(true)
        } else {
          Toast.open({ content: res.message })
          resolve(false)
        }
      })
      .catch(() => {
        Toast.open({
          content: LocaleUtil.locale(
            '照片删除异常',
            'lyrixi_c6def5fa7c7e41ced1921c9e09ce97bb'
          ) as string
        })
        resolve(false)
      })
  })
}

export default clearPhotos
