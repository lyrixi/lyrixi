import uploadItem from './../uploadItem'

// 内库使用-start
import type { BridgeUploadFileParams, FileItem } from './../../../../utils/Bridge/types'
import ValidatorUtil from './../../../../utils/ValidatorUtil'
import Toast from './../../../Toast'
import Device from './../../../../utils/Device'
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { ValidatorUtil, Toast, Device, LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

/**
 * 导出给外部使用的工具类: 异步上传图片
 * @param {Array|Object} pendingList ImageUploader控件返回的待传列表
 * @param {Object} uploadConfig {platform: 'browser强制上传方式', getUploadUrl: function({platform}), formatHeaders: function(headers, {platform}), formatPayload: function(payload, {platform}), formatResponse: function(response, {platform})}
 * @returns {Array} [{原item属性, filePath: '', fileUrl: '', fileThumbnail: '', status: 'error|success'}]
 */

async function uploadList(
  pendingList: FileItem | FileItem[],
  uploadConfig: BridgeUploadFileParams
): Promise<FileItem | FileItem[] | null> {
  let currentPlatform = uploadConfig?.platform || Device.platform
  // 浏览器强制上传方式：PC、browser/lark 平台，或鸿蒙钉钉（钉钉 uploadFile 不带 token）
  let forceBrowser =
    Device.device === 'pc' ||
    ['browser', 'lark'].includes(currentPlatform) ||
    (currentPlatform === 'dingtalk' && Device?.os === 'harmony')

  if (ValidatorUtil.isEmpty(pendingList)) {
    return null
  }

  let list: FileItem[] | null = null

  // 如果是对象则转为数组
  if (toString.call(pendingList) === '[object Object]') {
    list = [pendingList as FileItem]
  }
  // 如果是数组
  else if (Array.isArray(pendingList)) {
    list = pendingList as FileItem[]
  }

  if (!list) {
    return null
  }

  // 过滤非法的list
  list = list.filter((item) => {
    return !ValidatorUtil.isEmpty(item) && ValidatorUtil.isPlainObject(item)
  })
  if (ValidatorUtil.isEmpty(list)) {
    Toast.open({
      content: LocaleUtil.locale(
        'uploadList参数列表错误',
        'lyrixi_02e1574baeddc79ed7bfa5931dde85f0'
      ) as string
    })
    return null
  }

  // 开始上传
  for (let index = 0; index < list.length; index++) {
    const item = list[index]
    // 已经上传成功
    if (item?.status === 'success') {
      console.log('此项无需上传:', item)
      continue
    }
    // 已经上传成功的图片无需上传
    if (item?.fileUrl?.startsWith('http') && !item?.fileUrl?.startsWith?.('https://resource/')) {
      console.log('此项无需上传:', item)
      continue
    }

    console.log('上传此项:', item)
    // 开始上传, 返回结果 {...item, status: 'success' | 'error'}
    let newItem = await uploadItem(item, {
      getUploadUrl: uploadConfig?.getUploadUrl,
      formatHeaders: uploadConfig?.formatHeaders,
      formatPayload: uploadConfig?.formatPayload,
      formatResponse: uploadConfig?.formatResponse,
      verifyImage: uploadConfig?.verifyImage,
      ...(forceBrowser ? { platform: 'browser' } : {})
    })

    console.log(`上传结果：`, newItem)

    // 重新设置list
    list[index] = newItem as FileItem
  }
  return toString.call(pendingList) === '[object Object]' ? list[0] : list
}

export default uploadList
