import React, { type MouseEvent } from 'react'
import Uploading from './../../Uploading'

import type { MediaPreviewChooseProps } from './Media.PreviewMain.PreviewChoose.types'

// 内库使用-start
import Icon from '../../../Icon'
import Icons from '../../../../icons'
// 内库使用-end

// 上传按钮
const Choose = ({
  id,
  mediaType,
  sourceType,
  onBeforeChoose,
  onChoose,
  onFileChange
}: MediaPreviewChooseProps) => {
  // 点击选择框
  async function handleUploadClick(e: MouseEvent<HTMLDivElement>) {
    // Fix react 16 sync events lost issues
    if (e.persist && typeof e.persist === 'function') e.persist()
    let target = e.currentTarget
    e.stopPropagation()

    // 前置校验
    if (typeof onBeforeChoose === 'function') {
      let isOk = await onBeforeChoose(e)
      if (isOk === false) return
    }

    // 点击的是input框
    if (onFileChange) {
      // 防止选择重复图片时不触发
      const inputElement = target.querySelector('input') as HTMLInputElement | null
      if (!inputElement) return
      inputElement.value = ''
      inputElement.click()
      return
    }

    // 触发选择
    onChoose?.(e)
  }

  if (!onChoose && !onFileChange) return null

  // 判断是否仅相册或者仅拍照
  let fileProps: Record<string, string> = {}
  if (sourceType.length === 1 && sourceType[0] === 'camera') {
    fileProps = {
      capture: 'camera'
    }
  }
  // file框不支持仅相册
  // else if (sourceType.length === 1 && sourceType[0] === 'album') {
  //   fileProps = {
  //     capture: 'album'
  //   }
  // }

  return (
    <div
      id={id}
      className="lyrixi-media-preview-main-choose"
      data-type="upload"
      onClick={handleUploadClick}
    >
      <Icon
        svg={mediaType?.includes?.('video') ? Icons.VideoFill : Icons.Plus}
        size="xxs"
        color="white"
        className="lyrixi-media-preview-main-choose-icon"
      />
      <input
        id={id ? `${id}-input-file` : undefined}
        type="file"
        className="lyrixi-media-preview-main-choose-input-file"
        onChange={onFileChange}
        accept={mediaType?.includes?.('video') ? 'video/*' : 'image/*'}
        // 以下的属性值会导致: 部分安卓机会不显示拍照
        // accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"
        onClick={(e) => {
          e.stopPropagation()
        }}
        // file框属性
        {...(fileProps || {})}
      />
      {/* 上传中 */}
      <Uploading uploadingType="preview-choose" />
    </div>
  )
}
export default Choose
