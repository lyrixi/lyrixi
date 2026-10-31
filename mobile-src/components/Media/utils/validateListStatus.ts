import type { ReactNode } from 'react'
// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

// 校验照片是否已经上传完成
function validateListStatus(list: Array<{ status?: string }> | null | undefined): true | ReactNode {
  for (let item of list || []) {
    if (item.status === 'error' || item.status === 'choose' || item.status === 'uploading') {
      return LocaleUtil.locale(
        '当前页面存在尚未上传成功的文件，请等待上传成功或删除后再提交',
        'lyrixi_7ab7af85f0459b62fc2bf9e57af939f0'
      )
    }
  }

  return true
}

export default validateListStatus
