import React, { useRef } from 'react'
import Uploading from './../Uploading'

import type { AttachFileIconType } from './getAttachFileIconSvg'
import type { AttachItemProps } from './Attach.Item.types'

// 内库使用-start
import type { FileItem } from '../../../utils/Bridge/types'
import DOMUtil from './../../../utils/DOMUtil'
import LocaleUtil from './../../../utils/LocaleUtil'
import Clipboard from './../../../utils/Clipboard'
import Device from './../../../utils/Device'
import Bridge from './../../../utils/Bridge'
import Toast from './../../Toast'
import Icon from './../../Icon'
import Icons from '../../../icons'
import {
  getAttachFileIconColor,
  getAttachFileIconSvg,
  getAttachFileIconType
} from './getAttachFileIconSvg'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, LocaleUtil, Clipboard, AssetUtil, Bridge, Toast, Message } from 'lyrixi-mobile'
测试使用-end */

function toToastString(text: string | import('react').ReactNode): string {
  return typeof text === 'string' ? text : ''
}

// Item
const Item = ({
  // Value & Display Value
  item,
  index,

  // Elements
  uploadingRender,
  itemRender,

  // Events
  onDelete,
  onReUpload,
  onPreview // 是否支持单击预览, readOnly为true时才生效
}: AttachItemProps) => {
  // 预览类型: browser|native
  const previewTypeRef = useRef<unknown>(Device.platform === 'browser' ? 'browser' : null)

  // 点击预览
  async function handlePreview(attach: FileItem, attachIndex: number) {
    // 自定义预览
    if (typeof onPreview === 'function') {
      const goOn = await onPreview(attach, { index: attachIndex })
      if (goOn === false) return
      previewTypeRef.current = goOn
    }

    // 失败的文件用localFileUrl预览
    if (attach.status === 'error') {
      Toast.open({
        content: toToastString(
          LocaleUtil.locale('图片未上传成功, 无法预览', 'lyrixi_48ec308c5a5abf2b6dc08111a4aa08bb')
        )
      })
      return
    }

    // 预览地址
    const fileUrl = attach.fileUrl
    let previewUrl =
      fileUrl === null || fileUrl === undefined
        ? ''
        : typeof fileUrl === 'string'
        ? decodeURIComponent(decodeURIComponent(fileUrl))
        : ''
    if (!previewUrl || typeof previewUrl !== 'string') {
      Toast.open({
        content: toToastString(
          LocaleUtil.locale('预览地址不合法', 'lyrixi_abbd8dd2fbc71bf8315e71e5e80d041a')
        )
      })
      return
    }

    // 只有客户端和企微支持预览文件
    if (previewTypeRef.current === 'nativeFile') {
      Bridge.previewFile(attach)
    }
    // 平台预览需要复制到剪贴板
    else {
      Clipboard.setString(previewUrl)
    }
  }

  // 获取附件类型图标
  const fileIconType = item.fileType || getAttachFileIconType(item.fileUrl)

  return (
    <div
      key={index}
      id={typeof item.id === 'string' ? item.id : undefined}
      data-index={index}
      // 状态status: choose|uploading|error|success
      className={DOMUtil.classNames('lyrixi-attach-item', item.className, `lyrixi-${item.status}`)}
      onClick={(e) => {
        e.stopPropagation()

        handlePreview(item, index)
      }}
    >
      {/* 文件图标 */}
      <Icon
        svg={getAttachFileIconSvg(fileIconType as AttachFileIconType)}
        size="m"
        color={getAttachFileIconColor(fileIconType as AttachFileIconType)}
        className={DOMUtil.classNames('lyrixi-attach-item-type', `lyrixi-${fileIconType}`)}
      />
      {/* 文件名称 */}
      <div className="lyrixi-attach-item-main">
        <div className="lyrixi-attach-item-title">{item.fileName || item.fileUrl}</div>
        {/* 重新上传 */}
        {onReUpload && (
          <div
            id={typeof item.id === 'string' ? `${item.id}-reload` : undefined}
            className="lyrixi-attach-item-right-icon lyrixi-attach-reload"
            onClick={(e) => {
              e.stopPropagation()

              onReUpload(item, { index })
            }}
          >
            <Icon svg={Icons.Update} size="xxxs" />
          </div>
        )}

        {/* 删除按钮 */}
        {onDelete && (
          <div
            id={typeof item.id === 'string' ? `${item.id}-delete` : undefined}
            className="lyrixi-attach-item-right-icon lyrixi-attach-delete"
            onClick={(e) => {
              e.stopPropagation()

              onDelete(item, { index })
            }}
          >
            <Icon svg={Icons.Close} size="xxxs" />
          </div>
        )}

        {/* 转圈 */}
        <Uploading
          uploadingType="item"
          uploadingRender={uploadingRender}
          className="lyrixi-attach-item-right-icon"
        />
      </div>

      {/* 自定义渲染 */}
      {itemRender?.(item, { index })}
    </div>
  )
}

export default Item
