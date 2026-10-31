// 与Attach.uploadItem共用

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import Toast from './../../../Toast'
import type { FileItem } from './../../../../utils/Bridge/types'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Toast } from 'lyrixi-mobile'
测试使用-end */

// 上传文件
async function uploadItem(
  item: FileItem,
  {
    onUpload
  }: {
    onUpload?: (item: FileItem) => void | FileItem | unknown | Promise<FileItem | void | unknown>
  }
) {
  if (typeof onUpload !== 'function') {
    Toast.open({
      content: `没有onUpload入参, 无法上传`
    })
    return {
      ...item,
      status: 'error',
      message: LocaleUtil.locale(
        '没有onUpload入参, 无法上传',
        'lyrixi_114065b26f3ec38db673063aa5cd36c8'
      )
    }
  }

  // 已经上传成功, 无需要再次上传(钉钉本地照片开头为https://resource/)
  if (item?.fileUrl?.startsWith?.('http') && !item?.fileUrl?.startsWith?.('https://resource/')) {
    item.status = 'success'
    return item
  }

  // 开始上传, 返回结果 {...item, status: 'success' | 'error'}
  const raw = await onUpload(item)
  if (raw === undefined || raw === null) {
    return { ...item, status: 'success' }
  }
  const newItem = raw as FileItem

  // 上传失败
  if (newItem.status === 'error') {
    Toast.open({
      content: newItem.message
    })
    return { ...item, status: 'error', ...newItem }
  }

  // 更新状态
  return { ...item, status: 'success', ...newItem }
}

export default uploadItem
