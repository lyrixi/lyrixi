import React, { forwardRef, useRef, useImperativeHandle, type ReactNode } from 'react'
import _uploadItem from '../utils/uploadItem'

import type { MediaHandle, MediaUploaderCommonProps } from '../types'

// 内库使用-start
import type { FileItem } from './../../../utils/Bridge/types'
import Bridge from './../../../utils/Bridge'
import Toast from './../../Toast'
import Loading from './../../Loading'
import Media from './../../Media'
import getRemainCount from './../../Media/utils/getRemainCount'
import type { MediaProps } from './../../Media/types'
// 内库使用-end

/* 测试使用-start
import { Bridge,Toast, Loading, Media } from 'lyrixi-mobile'
测试使用-end */

// 照片上传
const MediaUploader = forwardRef(
  (
    {
      list = [],
      maxCount = 5,
      maxChooseCount = 9,
      mediaType,
      ellipsis,
      sourceType = ['album', 'camera'],
      sizeType = ['compressed'],
      maxDuration,
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
          if (!mediaRef.current?.choose) return
          return mediaRef.current.choose()
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
        verifyImage
      })

      console.log('微信上传后新item:', newItem)
      return newItem
    }

    // 选择文件
    async function handleChoose() {
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
          const extra = await getItemExtra({ platform: 'wechat' })
          if (extra === false) {
            resolve(false)
            return
          }
          itemExtra = extra as Record<string, unknown> | null
        }

        let chooseMediaParams: Record<string, unknown> = {
          count: getRemainCount(maxCount, list?.length || 0, maxChooseCount),
          sizeType: sizeType,
          sourceType: sourceType,
          mediaType: mediaType,
          maxDuration: maxDuration,
          compressConfig: compressConfig,
          isSaveToAlbum: isSaveToAlbum || 0,
          onSuccess: async (res: { data?: { localFiles?: FileItem[] } }) => {
            const localFiles = res.data?.localFiles
            if (!Array.isArray(localFiles) || !localFiles.length) {
              resolve(null)
              return
            }

            Loading.open()

            let currentList = localFiles.map((localFile) => {
              return {
                status: 'choose',
                localFile: localFile,
                fileThumbnail: localFile.fileUrl,
                fileUrl: localFile.fileUrl,
                fileType: localFile.fileType,
                ...itemExtra
              }
            })

            console.log('选择完成:', currentList)
            resolve(currentList)
          },
          onError: function (err: { errMsg?: string }) {
            if (err && err.errMsg) Toast.open({ content: err.errMsg })
            resolve(false)
          },
          onCancel: function () {
            resolve(false)
          }
        }

        if (typeof formatChoose === 'function') {
          chooseMediaParams = await formatChoose(
            { ...chooseMediaParams, ...itemExtra },
            { platform: 'wechat' }
          )
        }

        Bridge.chooseMedia(chooseMediaParams)
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
        previewNavBarStyle={previewNavBarStyle}
        previewNavBarClassName={previewNavBarClassName}
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
        onChoose={handleChoose}
        onUpload={uploadItem}
        onChange={onChange}
        onPreview={async (item, { index }) => {
          if (typeof onPreview === 'function') {
            const goOn = await onPreview(item, { index })
            if (goOn !== true) {
              return goOn as boolean | void | 'nativeMedia' | 'nativeFile' | 'browser'
            }
          }
          return 'nativeMedia'
        }}
      />
    )
  }
)

export default MediaUploader
