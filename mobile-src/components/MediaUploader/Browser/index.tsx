import React, { forwardRef, useRef, useImperativeHandle, type ReactNode } from 'react'
import _uploadItem from '../utils/uploadItem'

import type { MediaHandle, MediaUploaderCommonProps } from '../types'

// 内库使用-start
import type { FileItem } from './../../../utils/Bridge/types'
import LocaleUtil from './../../../utils/LocaleUtil'
import Toast from './../../Toast'
import Media from './../../Media'
import type { MediaProps } from './../../Media/types'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Toast, Media } from 'lyrixi-mobile'
测试使用-end */

// 照片上传
const Browser = forwardRef(
  (
    {
      list = [],
      maxCount = 5,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      maxChooseCount = 1,
      mediaType,
      ellipsis,
      sourceType = ['album', 'camera'],
      sizeType = ['compressed'],
      maxDuration,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isSaveToAlbum = 0,
      compressConfig,

      // Status
      async = false,
      verifyImage,
      reUpload = true,
      allowClear = true,
      allowChoose = true,
      previewAllowChoose,
      previewAllowClear,

      // Style
      style,
      className,
      uploadPlacement,
      previewSafeArea,
      navBarStyle,
      navBarClassName,
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      formatChoose,
      formatHeaders,
      formatPayload,
      formatResponse,

      // Events
      onBeforeChoose,
      onChange,
      onPreview
    }: MediaUploaderCommonProps,
    ref: React.ForwardedRef<MediaHandle>
  ) => {
    const mediaRef = useRef<MediaHandle | null>(null)

    useImperativeHandle(ref, () => {
      return {
        ...(mediaRef.current ?? ({} as MediaHandle)),
        chooseMedia: () => {
          Toast.open({
            content: LocaleUtil.locale(
              '浏览器上传模式, 不支持编程式调用拍照',
              'lyrixi_18a8c44715538c3079cf8bf9fd46fe82'
            ) as string
          })
          return false
        }
      }
    })

    // 上传文件
    async function uploadItem(item: FileItem) {
      let newItem = await _uploadItem(item, {
        getUploadUrl,
        formatHeaders,
        formatPayload,
        formatResponse,
        verifyImage,
        platform: 'browser'
      })

      console.log('浏览器上传后新item:', newItem)
      return newItem
    }

    // 选择文件
    async function handleFileChange(localFiles: FileItem[]) {
      const localFile = localFiles[0]
      if (!localFile) return null

      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        // 前置校验
        if (typeof onBeforeChoose === 'function') {
          let isOk = await onBeforeChoose()
          if (isOk === false) {
            resolve(false)
            return
          }
        }

        // 添加额外的item信息, 方便传递, 例如水印等
        let itemExtra: Record<string, unknown> | null = null
        if (typeof getItemExtra === 'function') {
          const extra = await getItemExtra({ platform: 'browser' })
          if (extra === false) {
            resolve(false)
            return
          }
          itemExtra = extra as Record<string, unknown> | null
        }

        resolve([
          {
            status: 'choose',
            localFile: localFile,
            fileThumbnail: (localFile as Record<string, unknown>).fileUrl,
            fileUrl: (localFile as Record<string, unknown>).fileUrl,
            fileType: (localFile as Record<string, unknown>).fileType,
            ...itemExtra
          }
        ])
      })
    }

    const mediaTypeList =
      mediaType === null || mediaType === undefined
        ? undefined
        : Array.isArray(mediaType)
        ? mediaType
        : [mediaType]

    const ellipsisForMedia =
      ellipsis === true
        ? { maxCount: 1 }
        : ellipsis && typeof ellipsis === 'object'
        ? ellipsis
        : undefined

    const uploadPlacementNarrow: 'start' | 'end' | undefined =
      uploadPlacement === 'start' || uploadPlacement === 'end' ? uploadPlacement : undefined

    const previewCancelNarrow: 'left' | 'right' | undefined =
      previewCancelPlacement === 'left' || previewCancelPlacement === 'right'
        ? previewCancelPlacement
        : undefined

    const renderUpload =
      uploadRender === null || uploadRender === undefined
        ? undefined
        : typeof uploadRender === 'function'
        ? (uploadRender as (options: { uploadType: string }) => ReactNode)
        : () => uploadRender

    const renderUploading =
      uploadingRender === null || uploadingRender === undefined
        ? undefined
        : typeof uploadingRender === 'function'
        ? (uploadingRender as (options: FileItem & { uploadingType: string }) => ReactNode)
        : // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (options: FileItem & { uploadingType: string }) => uploadingRender

    const renderItem =
      itemRender === null || itemRender === undefined
        ? undefined
        : typeof itemRender === 'function'
        ? (itemRender as (item: FileItem) => ReactNode)
        : // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (_item: FileItem) => itemRender as ReactNode

    const onBeforeChooseForMedia: MediaProps['onBeforeChoose'] =
      typeof onBeforeChoose === 'function'
        ? (e) => {
            void e
            return onBeforeChoose() as boolean | void | Promise<boolean | void>
          }
        : undefined

    return (
      <Media
        ref={mediaRef}
        // Value & Display Value
        list={list}
        maxCount={maxCount}
        mediaType={mediaTypeList}
        ellipsis={ellipsisForMedia}
        sourceType={sourceType}
        sizeType={sizeType}
        maxDuration={maxDuration}
        compressConfig={compressConfig}
        // Status
        async={async}
        reUpload={reUpload}
        allowChoose={allowChoose}
        allowClear={allowClear}
        previewAllowChoose={previewAllowChoose}
        previewAllowClear={previewAllowClear}
        // Style
        style={style}
        className={className}
        uploadPlacement={uploadPlacementNarrow}
        previewSafeArea={previewSafeArea}
        previewNavBarStyle={previewNavBarStyle ?? navBarStyle}
        previewNavBarClassName={previewNavBarClassName ?? navBarClassName}
        previewModalStyle={previewModalStyle}
        previewModalClassName={previewModalClassName}
        previewMaskStyle={previewMaskStyle}
        previewMaskClassName={previewMaskClassName}
        // Elements
        uploadRender={renderUpload}
        uploadingRender={renderUploading}
        itemRender={renderItem}
        previewPortal={previewPortal}
        previewCancelPlacement={previewCancelNarrow}
        // Events
        onBeforeChoose={onBeforeChooseForMedia}
        onFileChange={handleFileChange}
        onUpload={uploadItem}
        onChange={onChange}
        onPreview={async (item, { index }) => {
          if (typeof onPreview === 'function') {
            const goOn = await onPreview(item, { index })
            if (goOn !== true) {
              return goOn as boolean | void | 'nativeMedia' | 'nativeFile' | 'browser'
            }
          }
          return 'browser'
        }}
      />
    )
  }
)

export default Browser
