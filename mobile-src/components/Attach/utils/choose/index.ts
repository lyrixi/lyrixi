import convertBytes from './../../utils/convertBytes'
import validateMaxSize from './../../utils/validateMaxSize'
import supportTypes from './../../utils/supportTypes'

import type { AttachChooseParams } from './Attach.utils.choose.types'

// 内库使用-start
import type { FileItem } from '../../../../utils/Bridge/types'
import ValidatorUtil from './../../../../utils/ValidatorUtil'
import LocaleUtil from './../../../../utils/LocaleUtil'
import Toast from './../../../Toast'
import Media from './../../../Media'
// 内库使用-end

/* 测试使用-start
import { ValidatorUtil, LocaleUtil, Toast, Media } from 'lyrixi-mobile'
测试使用-end */

function toToastString(s: string | import('react').ReactNode): string {
  return typeof s === 'string' ? s : ''
}

// 选择文件
async function choose(params: AttachChooseParams) {
  const {
    async: asyncMode,
    maxSize,
    maxCount,
    sourceType,
    list,
    uploadPlacement,
    uploadList,
    onChoose,
    onChange
  } = params
  // 大于总数禁止选择
  if (typeof maxCount === 'number' && Media.getRemainCount(maxCount, list?.length || 0) <= 0) {
    Toast.open({
      content: toToastString(
        LocaleUtil.locale(`总数不能大于${maxCount}`, 'lyrixi_2d5162e5511eccd2b3d50796122c6e6e', [
          maxCount
        ])
      ),
      maskClickable: true
    })
    return false
  }

  let currentList: FileItem[] | null = null
  if (typeof onChoose === 'function') {
    const r = await Promise.resolve(onChoose())
    currentList = Array.isArray(r) ? (r as FileItem[]) : null
  }

  if (!Array.isArray(currentList) || ValidatorUtil.isEmpty(currentList)) {
    return null
  }

  // 判断文件选中的类型
  for (const item of currentList) {
    if (!item.fileName) {
      Toast.open({
        content: toToastString(
          LocaleUtil.locale(
            `未返回fileName, 无法上传`,
            'lyrixi_45e987cc2779b005b900456f27379057',
            undefined
          )
        ),
        maskClickable: true
      })
      return
    }
    const n = Number(item.fileSize)
    if (!Number.isFinite(n) || n < 0) {
      Toast.open({
        content: toToastString(
          LocaleUtil.locale(
            `未返回fileSize, 无法上传`,
            'lyrixi_e5b09f4014f2ebe2a1e0825b0595666d',
            undefined
          )
        ),
        maskClickable: true
      })
      return false
    }
    if (!supportTypes(item.fileName, sourceType)) {
      Toast.open({
        content: toToastString(
          LocaleUtil.locale(
            `只支持选择${sourceType.join(',')}格式的文件`,
            'lyrixi_457455da3092979a928191f95101f15e',
            [sourceType.join(',')]
          )
        ),
        maskClickable: true
      })
      return false
    }

    if (maxSize && !validateMaxSize(n, maxSize)) {
      Toast.open({
        content: toToastString(
          LocaleUtil.locale(
            `文件大小不能超过${Math.abs(convertBytes(maxSize))}M`,
            'lyrixi_e547fe1eb4fcf8bef4514d7519ee6eb9',
            [Math.abs(convertBytes(maxSize))]
          )
        )
      })
      return false
    }
  }

  // 构建新的列表
  let newList: FileItem[] = []
  // 新放前面
  if (uploadPlacement === 'start') {
    newList = [...currentList, ...(list || [])]
  }
  // 新放后面
  else {
    newList = [...(list || []), ...currentList]
  }

  // 异步上传
  if (asyncMode) {
    if (onChange) onChange(newList, { action: 'choose' })
    return newList
  }

  // 同步上传: list发生变化即开始上传
  const uploaded = await uploadList(newList, { action: 'upload' })
  return uploaded ?? newList
}

export default choose
