import React, { forwardRef, useEffect, useRef, useState } from 'react'

// 内部组件
import Interval from './utils/Interval'
import CompatibleToggle from './CompatibleToggle'
import WechatMiniProgram from './WechatMiniProgram'
import Browser from './Browser'
import Wechat from './Wechat'
import Dingtalk from './Dingtalk'
import Custom from './Custom'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
import Device from './../../utils/Device'
import Toast from './../Toast'
import LocaleUtil from './../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, LocaleUtil, Device, Toast } from 'lyrixi-mobile'
测试使用-end */

import type { MediaHandle, MediaUploaderProps } from './types'

// 照片上传
const MediaUploader = forwardRef<MediaHandle, MediaUploaderProps>(
  (
    {
      // Value & Display Value
      mediaType = ['image'],
      list = [],
      maxCount,
      maxChooseCount,
      platform,
      ellipsis,
      sourceType = ['album', 'camera'],
      sizeType = ['compressed'],
      maxDuration,
      isSaveToAlbum = 0,
      compressConfig,

      // Status
      async = false,
      verifyImage = true,
      reUpload = true,
      allowClear = false,
      allowChoose = false,
      previewAllowChoose,
      previewAllowClear,
      compatible = true,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      timeout,

      // Style
      style,
      className,
      uploadPlacement,
      previewSafeArea,
      previewNavBarStyle,
      previewNavBarClassName,
      previewModalStyle,
      previewModalClassName,
      previewMaskStyle,
      previewMaskClassName,

      // Elements
      uploadRender,
      uploadingRender,
      itemRender,
      previewPortal,
      previewCancelPlacement,
      getItemExtra,
      getUploadUrl,
      formatChoose,
      formatHeaders,
      formatPayload,
      formatResponse,

      // Events
      onBeforeChoose,
      onUpload,
      onChange,
      onPreview,

      chooseExtraParams,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onNavigateTo
    }: MediaUploaderProps,
    ref: React.ForwardedRef<MediaHandle>
  ) => {
    // 鸿蒙小程序微信8.0后报错: chooselmage: permission denied， 解决方法: 此版本鸿蒙微信有bug，强制同步上传(同步上传会用小程序和浏览器上传)
    if (Device?.os === 'harmony' && platform === 'wechatMiniProgram') {
      // eslint-disable-next-line
      async = false
    }

    // 5秒间隔自动切成浏览器定位
    const intervalRef = useRef(Interval(5000))

    // 间隔追踪器状态
    const [compatiblePlatform, setCompatiblePlatform] = useState(platform)

    useEffect(() => {
      if (['browser', 'wechatMiniProgram'].includes(platform ?? '')) {
        setCompatiblePlatform(platform)
      }
      // eslint-disable-next-line
    }, [platform])

    // 跳转小程序拍摄多媒体两次间隔小于5秒，则使用浏览器拍摄
    const handleWechatMiniProgramMedia = async (): Promise<boolean | void> => {
      let isTimeout = intervalRef.current.isTimeout()
      if (isTimeout === false) {
        Toast.open({
          duration: 1000,
          content: LocaleUtil.locale(
            '检测到您的机型不支持小程序拍照，已强制为您切换成浏览器拍照',
            'lyrixi_9e6eedcd7097658099a215f77cada387'
          ) as string,
          onClose: () => {
            setCompatiblePlatform('browser')
          }
        })
        return false
      }
      return true
    }

    // 公共属性对象，所有平台组件共享
    const commonProps = {
      // Value & Display Value
      mediaType,
      list,
      maxCount,
      maxChooseCount,
      ellipsis,
      sourceType,
      sizeType,
      maxDuration,
      isSaveToAlbum,
      compressConfig,

      // Status
      async,
      verifyImage,
      reUpload,
      allowClear,
      allowChoose,
      previewAllowChoose,
      previewAllowClear,
      // Style
      uploadPlacement,
      previewSafeArea,
      previewNavBarStyle,
      previewNavBarClassName,
      previewModalStyle,
      previewModalClassName,
      previewMaskStyle,
      previewMaskClassName,
      // Elements
      uploadRender,
      uploadingRender,
      itemRender,
      previewPortal,
      previewCancelPlacement,
      getItemExtra,
      getUploadUrl,
      formatChoose,
      formatHeaders,
      formatPayload,
      formatResponse,
      // Events
      onBeforeChoose,
      onUpload,
      onChange,
      onPreview
    }

    // file框模式上传 或 强制使用Browser模式（间隔检测）
    if (compatiblePlatform === 'browser' || Device.device === 'pc') {
      console.log('渲染浏览器Meida组件')
      return (
        <div style={style} className={DOMUtil.classNames('lyrixi-media-compatible', className)}>
          {/* 小程序拍照兼容方式切换, 小程序经常呼不起来 */}
          {platform === 'wechatMiniProgram' && allowChoose ? (
            <CompatibleToggle
              compatible={compatible}
              compatiblePlatform={compatiblePlatform || 'browser'}
              onCompatiblePlatformChange={setCompatiblePlatform}
            />
          ) : null}
          <Browser ref={ref} {...commonProps} />
        </div>
      )
    }

    // 最新的小程序
    if (platform === 'wechatMiniProgram' && !async) {
      console.log('渲染微信小程序Meida组件')
      return (
        <div style={style} className={DOMUtil.classNames('lyrixi-media-compatible', className)}>
          {allowChoose ? (
            <CompatibleToggle
              compatible={compatible}
              compatiblePlatform={compatiblePlatform || 'wechatMiniProgram'}
              onCompatiblePlatformChange={setCompatiblePlatform}
            />
          ) : null}
          <WechatMiniProgram
            ref={ref}
            onNavigateTo={handleWechatMiniProgramMedia}
            chooseExtraParams={chooseExtraParams}
            {...commonProps}
          />
        </div>
      )
    }

    // 钉钉上传
    if (platform === 'dingtalk') {
      // 鸿蒙钉钉有bug，上传方法不会带token，导致无法上传
      if (Device?.os === 'harmony') {
        console.log('渲染浏览器Meida组件')
        return <Browser ref={ref} {...commonProps} style={style} className={className} />
      }
      console.log('渲染钉钉Meida组件')
      return <Dingtalk ref={ref} {...commonProps} style={style} className={className} />
    }

    // 微信上传
    if (
      platform === 'wechat' ||
      platform === 'wecom' ||
      platform === 'wechatMiniProgram' ||
      platform === 'wecomMiniProgram'
    ) {
      console.log('渲染微信Meida组件')
      return <Wechat ref={ref} {...commonProps} style={style} className={className} />
    }

    // 自定义上传
    if (platform === Device.platform) {
      console.log('渲染自定义Meida组件', platform)
      return <Custom ref={ref} {...commonProps} style={style} className={className} />
    }

    console.log('渲染浏览器Meida组件')
    return <Browser ref={ref} {...commonProps} style={style} className={className} />
  }
)

export default MediaUploader
