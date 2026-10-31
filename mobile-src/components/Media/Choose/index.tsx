import React, { type ChangeEvent, type MouseEvent } from 'react'
import Uploading from './../Uploading'

import type { MediaChooseProps } from './Media.Choose.types'

// 内库使用-start
import type { FileItem } from './../../../utils/Bridge/types'
import DOMUtil from './../../../utils/DOMUtil'
import Icon from '../../Icon'
import Icons from '../../../icons'
// 内库使用-end

// 上传按钮
const Choose = ({
  id,
  // Value & Display Value
  mediaType = ['image'],
  sourceType = ['album', 'camera'],

  // Style
  style,
  iconSize,
  className,

  // Elements
  uploadRender,

  uploadingRender,

  // Events
  onBeforeChoose,
  onChoose,
  onFileChange
}: MediaChooseProps) => {
  // 选择文件
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    onFileChange?.(e)
  }

  // 点击选择框
  async function handleUploadClick(e: MouseEvent<HTMLDivElement>) {
    // Fix react 16 sync events lost issues
    if (e.persist && typeof e.persist === 'function') e.persist()
    const target = e.currentTarget
    e.stopPropagation()

    // 前置校验
    if (typeof onBeforeChoose === 'function') {
      const isOk = await onBeforeChoose(e)
      if (isOk === false) return
    }

    // 点击的是input框
    if (onFileChange) {
      // 防止选择重复图片时不触发
      const inputElement = target.querySelector('input') as HTMLInputElement | null
      if (inputElement) {
        inputElement.value = ''
        inputElement.click()
      }
      return
    }

    // 触发选择
    onChoose?.(e)
  }

  // 上传node
  function renderUpload() {
    if (typeof uploadRender === 'function') {
      return uploadRender({ uploadType: 'choose' })
    }
    return null
  }

  const uploadNode = renderUpload()

  if (!onChoose && !onFileChange) return null

  const cameraOnly = sourceType.length === 1 && sourceType[0] === 'camera'
  const itemStub: FileItem = {}

  return (
    <div
      id={id}
      // Style
      style={style}
      className={DOMUtil.classNames('lyrixi-media-item', 'lyrixi-media-choose', className)}
      data-type="upload"
      // Events
      onClick={handleUploadClick}
    >
      {/* 拍照或者视频图标 */}
      <Icon
        svg={mediaType?.includes?.('video') ? Icons.VideoFill : Icons.Plus}
        size={iconSize}
        className="lyrixi-media-choose-icon"
      />
      {/* 启用file框 */}
      {onFileChange && (
        <input
          id={id ? `${id}-input-file` : undefined}
          type="file"
          className="lyrixi-media-choose-input-file"
          accept="image/*"
          capture={cameraOnly ? ('camera' as never) : undefined}
          // Events
          onChange={handleFileChange}
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      )}
      {uploadNode && uploadNode}
      {/* 上传中 */}
      <Uploading uploadingType="choose" item={itemStub} uploadingRender={uploadingRender} />
    </div>
  )
}
export default Choose
