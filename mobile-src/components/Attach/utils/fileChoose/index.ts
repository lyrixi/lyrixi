import validateMaxSize from './../../utils/validateMaxSize'
import supportTypes from './../../utils/supportTypes'
import convertBytes from './../../utils/convertBytes'

import type { FileChooseParams } from './Attach.utils.fileChoose.types'

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
async function fileChoose(params: FileChooseParams) {
  const {
    file,
    async: asyncMode,
    maxSize,
    maxCount,
    sourceType,
    list,
    uploadPlacement,
    uploadList,
    onFileChange,
    onChange
  } = params
  if (file.type !== 'file') return false

  if (!file.files?.[0]) {
    Toast.open({
      content: toToastString(
        LocaleUtil.locale(
          '没有选择文件，无法上传！',
          'lyrixi_9f6cc6e6521fd4edd8d40704b83e4ef7',
          undefined
        )
      ),
      maskClickable: true
    })
    return false
  }

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

  // 数据
  const fileData = file.files?.[0]
  if (!fileData) return false

  const fileName = fileData.name || file.value
  const fileURL = URL.createObjectURL(fileData)
  const fileSize = fileData.size
  let fileType: string
  if (fileData.type?.includes?.('image')) {
    fileType = 'image'
  } else if (fileData.type?.includes?.('video')) {
    fileType = 'video'
  } else {
    fileType = 'file'
  }

  if (maxSize && !validateMaxSize(fileSize, maxSize)) {
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

  // 未获取到文件名
  if (!fileName) {
    Toast.open({
      content: toToastString(
        LocaleUtil.locale(
          `未获取到文件名, 无法上传`,
          'lyrixi_2d3425258de2a42e62df1e9c55201ea2',
          undefined
        )
      ),
      maskClickable: true
    })
    return false
  }

  // 判断文件选中的类型
  if (!supportTypes(fileName, sourceType)) {
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

  let currentList: FileItem[] | null = null
  if (typeof onFileChange === 'function') {
    const r = await onFileChange([
      {
        fileName,
        fileSize,
        fileType,
        filePath: fileData,
        fileUrl: fileURL,
        status: 'choose'
      }
    ])
    currentList = Array.isArray(r) ? (r as FileItem[]) : null
  }

  if (!Array.isArray(currentList) || ValidatorUtil.isEmpty(currentList)) {
    console.error('onFileChange返回的数据不正确, 请返回数组', currentList)
    if (onChange) onChange([], { action: 'choose' })
    return null
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

export default fileChoose
