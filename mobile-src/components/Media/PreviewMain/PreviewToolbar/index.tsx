import React from 'react'

import type { MediaPreviewToolbarProps } from './Media.PreviewMain.PreviewToolbar.types'

// 内库使用-start
import Icon from '../../../Icon'
import Icons from '../../../../icons'
// 内库使用-end

const PreviewToolbar = ({
  // Value & Display Value
  id,
  onRotateAnticlockwise,
  onRotateClockwise,
  onZoomOut,
  onZoomIn
}: MediaPreviewToolbarProps) => {
  return (
    <div className="lyrixi-media-preview-main-toolbar">
      <div
        id={id ? `${id}-rotate-anticlockwise` : undefined}
        className="lyrixi-media-preview-main-toolbar-btn"
        onClick={(e) => {
          e.stopPropagation()
          onRotateAnticlockwise?.(e)
        }}
        role="button"
        aria-label="逆时针旋转90度"
      >
        <Icon svg={Icons.ImageAnticlockwise} size="xxxs" color="white" />
      </div>
      <div
        id={id ? `${id}-rotate-clockwise` : undefined}
        className="lyrixi-media-preview-main-toolbar-btn"
        onClick={(e) => {
          e.stopPropagation()
          onRotateClockwise?.(e)
        }}
        role="button"
        aria-label="顺时针旋转90度"
      >
        <Icon svg={Icons.ImageClockwise} size="xxxs" color="white" />
      </div>
      <div
        id={id ? `${id}-zoom-out` : undefined}
        className="lyrixi-media-preview-main-toolbar-btn"
        onClick={(e) => {
          e.stopPropagation()
          onZoomOut?.(e)
        }}
        role="button"
        aria-label="缩小"
      >
        <Icon svg={Icons.ImageZoomout} size="xxxs" color="white" />
      </div>
      <div
        id={id ? `${id}-zoom-in` : undefined}
        className="lyrixi-media-preview-main-toolbar-btn"
        onClick={(e) => {
          e.stopPropagation()
          onZoomIn?.(e)
        }}
        role="button"
        aria-label="放大"
      >
        <Icon svg={Icons.ImageZoomin} size="xxxs" color="white" />
      </div>
    </div>
  )
}

export default PreviewToolbar
