import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'

import type { VideoPlayerProps, VideoPlayerRef } from './types'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

// 视频预览
const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  (
    {
      // Value & Display Value
      autoPlay = false,
      // Style
      style,
      className,
      // Elements
      portal,
      children,
      headerRender
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)

    // Playing status: true: playing, false: paused
    const [playing, setPlaying] = useState(autoPlay)

    // Expose methods via ref
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        },
        pause: () => {
          setPlaying(false)
        },
        play: () => {
          setPlaying(true)
        }
      }
    })

    const Node = (
      <div
        className={DOMUtil.classNames('lyrixi-videoplayer-page', className)}
        style={style}
        ref={rootRef}
        onClick={() => {
          setPlaying(!playing)
        }}
      >
        {headerRender ? headerRender() : null}
        not support react-player
        {children}
      </div>
    )

    if (portal) {
      return createPortal(Node, portal)
    }
    return Node
  }
)

VideoPlayer.displayName = 'VideoPlayer'

export default VideoPlayer
