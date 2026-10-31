import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  type ReactNode
} from 'react'

import getPhotos from './getPhotos'
import clearPhotos from './clearPhotos'
import stopAllPolls from './stopAllPolls'
import generateId from './generateId'

import type { MediaHandle } from '../types'
import type { MediaUploaderWechatMiniProgramProps } from './MediaUploader.WechatMiniProgram.types'

// 内库使用-start
import type { FileItem } from './../../../utils/Bridge/types'
import LocaleUtil from './../../../utils/LocaleUtil'
import Toast from './../../Toast'
import Media from './../../Media'
import Loading from './../../Loading'
import ActionSheet from './../../ActionSheet'
import type { ListItem } from './../../List/types'
import type { MediaProps, MediaSourceType } from './../../Media/types'
// 内库使用-end

/* 测试使用-start
import { Toast, LocaleUtil, Media, Loading, ActionSheet } from 'lyrixi-mobile'
测试使用-end */

// 微信小程序拍照上传, 通过前端id，通过接口与小程序通信，轮询接口获取小程序上传的照片
const WechatMiniProgram = forwardRef(
  (
    {
      // Value & Display Value
      list = [],
      maxCount = 5,
      maxChooseCount = 9,
      mediaType,
      ellipsis,
      sourceType = ['album', 'camera'],
      sizeType = ['compressed'],
      maxDuration,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isSaveToAlbum = 0,
      compressConfig,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      chooseExtraParams,

      // Status
      async = false,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      formatChoose,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      formatHeaders,
      formatPayload,
      formatResponse,

      // Events
      onBeforeChoose,
      onChange,
      onPreview,
      onNavigateTo
    }: MediaUploaderWechatMiniProgramProps,
    ref: React.ForwardedRef<MediaHandle>
  ) => {
    // 返回{saveMediaUrl, getMediaUrl}
    const uploadUrl = getUploadUrl?.({ platform: 'wechatMiniProgram' }) || {}

    const saveMediaUrl = ((uploadUrl as Record<string, unknown>).saveMediaUrl as string) || ''

    const getMediaUrl = ((uploadUrl as Record<string, unknown>).getMediaUrl as string) || ''

    // Auto generate id, used to get item form server
    const idRef = useRef(generateId())

    // Photo and Album select actionsheet open
    const [open, setOpen] = useState(false)

    const mediaRef = useRef<MediaHandle | null>(null)

    // Newest List
    const listRef = useRef(Array.isArray(list) ? list : [])

    // Change event
    const onChangeRef = useRef<((list: FileItem[]) => void) | undefined>(undefined)

    onChangeRef.current = onChange

    // 组件移除时, 停止轮询
    useEffect(() => {
      return () => {
        console.log('组件移除, 停止轮询, 并清除照片')
        Loading.close()
        stopAllPolls()
        // eslint-disable-next-line
        clearPhotos(idRef.current, { url: saveMediaUrl })
      }
      // eslint-disable-next-line
    }, [])

    // 外部强行修改list, 需要同步到服务器
    useEffect(() => {
      if (Array.isArray(list) === false) return
      listRef.current = list
      // eslint-disable-next-line
    }, [list])

    useImperativeHandle(ref, () => {
      return {
        ...(mediaRef.current ?? ({} as MediaHandle)),
        chooseMedia: async () => {
          let uploadElement = mediaRef.current?.element?.querySelector?.(
            '.lyrixi-media-item.image-choose'
          )
          if (!uploadElement) {
            Toast.open({
              content: LocaleUtil.locale(
                '未找到拍照按钮, 调用拍照失败',
                'lyrixi_76637d130a70149d956bf9acc14e2108'
              ) as string
            })
            return false
          }

          let chooseOk = await handleChoose()
          return chooseOk
        },
        uploadList: () => {
          Toast.open({
            content: LocaleUtil.locale(
              '小程序不支持异步上传',
              'lyrixi_34b5161adb0dd53091258a0558e9c2f1'
            ) as string
          })
        }
      }
    })

    // Get item by polling interval
    async function updatePhotos() {
      let item = await getPhotos(idRef.current, {
        url: getMediaUrl,
        formatResponse
      })
      console.log('结果:', item)
      // Get item failed, stop interval
      if (typeof item === 'string') {
        console.log('获取结果异常, 停止轮询')
        stopAllPolls()
        Toast.open({ content: item })
        Loading.close()
        return
      }
      // Get item success
      if (item) {
        stopAllPolls()
        listRef.current = [...listRef.current, item as FileItem]
        console.log('当前照片', listRef.current)
        onChangeRef.current?.(listRef.current)
        Loading.close()
        await clearPhotos(idRef.current, { url: saveMediaUrl })
        return
      }
      // Null Get item by polling interval 3s
      ;(window as unknown as Record<string, unknown>)[idRef.current] = setTimeout(() => {
        updatePhotos()
      }, 3000)
    }

    // Jump to WeChat mini program to photo
    async function goCamera(sourceTypeParam: MediaSourceType[]) {
      const navigateToFn = (uploadUrl as Record<string, unknown>).navigateToMiniProgram
      if (typeof navigateToFn !== 'function') {
        Toast.open({ content: 'uploadUrl.navigateToMiniProgram is not a function' })
        return false
      }
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        // Stop others polling
        stopAllPolls(idRef.current)

        // 添加额外的item信息, 方便传递, 例如水印等
        let itemExtra: Record<string, unknown> | null = null
        if (typeof getItemExtra === 'function') {
          const extra = await getItemExtra({ platform: 'wechatMiniProgram' })
          if (extra === false) {
            resolve(false)
            return
          }
          itemExtra = extra as Record<string, unknown> | null
        }

        // Protect click
        Loading.open({
          content: LocaleUtil.locale(
            '打开小程序拍照',
            'lyrixi_e55618c26ebea1724e7f5d8a0489995c'
          ) as string
        })
        setTimeout(() => {
          Loading.close()
          resolve(true)
        }, 1000)

        console.log('进入小程序拍照')
        try {
          let payload: Record<string, unknown> | undefined = undefined
          if (typeof formatPayload === 'function') {
            const itemExtraObj: Record<string, unknown> = itemExtra !== null ? itemExtra : {}
            payload = await formatPayload({ ...itemExtraObj }, { platform: 'wechatMiniProgram' })
          }

          const itemExtraForNav: Record<string, unknown> = itemExtra !== null ? itemExtra : {}
          const navParams: Record<string, unknown> = {
            id: idRef.current,
            sourceType: sourceTypeParam,
            maxChooseCount: maxChooseCount,
            maxDuration: maxDuration,
            payload: payload,
            ...itemExtraForNav
          }

          if (typeof onNavigateTo === 'function') {
            let goOn = await onNavigateTo(navParams)
            if (goOn === false) {
              return
            }
          }

          let goOn = await (navigateToFn as (p: Record<string, unknown>) => Promise<boolean>)(
            navParams
          )

          if (goOn === false) {
            return
          }

          // Invoke camera start interval list
          updatePhotos()
        } catch (err) {
          Toast.open({ content: '呼起小程序拍照异常,请点击重试' })
          // If this fails, stop polling
          stopAllPolls()
        }
      })
    }

    // 选择文件
    async function handleChoose() {
      // 前置校验
      if (typeof onBeforeChoose === 'function') {
        let isOk = await onBeforeChoose()
        if (isOk === false) return false
      }

      // Camera and Album actionsheet select
      if (sourceType.includes('album') && sourceType.includes('camera')) {
        setOpen(true)
        return true
      }

      // goCamera
      mediaRef.current?.showLoading?.()
      let isOk = await goCamera(sourceType)
      mediaRef.current?.hideLoading?.()

      return isOk
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
      <>
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

        <ActionSheet.Modal
          open={open}
          list={[
            {
              id: 'camera',
              name: String(LocaleUtil.locale('拍照', 'lyrixi_bed9ec1e84486baa0422c80414edd31a'))
            },
            {
              id: 'album',
              name: String(
                LocaleUtil.locale('从相册选择', 'lyrixi_83c39abd16cd6a770fc1c3c326aabbdd')
              )
            }
          ]}
          onChange={(item: ListItem | null) => {
            if (!item) return
            void (async () => {
              mediaRef.current?.showLoading?.()
              await goCamera([item.id as MediaSourceType])
              mediaRef.current?.hideLoading?.()
              setOpen(false)
            })()
          }}
          onClose={() => {
            setOpen(false)
          }}
        />
      </>
    )
  }
)

export default WechatMiniProgram
