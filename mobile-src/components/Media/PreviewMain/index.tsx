import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type Ref,
  type SyntheticEvent
} from 'react'
// Compatible with lower version
// import 'core-js/es/array/flat'
import { Swiper, SwiperSlide, type SwiperClass, type SwiperRef } from 'swiper/react'
import { Zoom, Pagination } from 'swiper/modules'
import fileChoose from './../utils/fileChoose'
import choose from './../utils/choose'
import uploadItem from './../utils/uploadItem'
import showLoading from './../utils/showLoading'
import hideLoading from './../utils/hideLoading'
import isAllowClear from './../utils/isAllowClear'
import getActiveIndex from './getActiveIndex'

import PreviewDelete from './PreviewDelete'
import PreviewClose from './PreviewClose'
import PreviewChoose from './PreviewChoose'
import PreviewReload from './PreviewReload'
import PreviewToolbar from './PreviewToolbar'

import type { MediaProps, MediaPreviewMainProps, MediaPreviewMainRef } from './../types'
import type { MediaFileChooseParams } from '../utils/fileChoose/Media.utils.fileChoose.types'
// 内库使用-start
import type { FileItem } from './../../../utils/Bridge/types'
import LocaleUtil from './../../../utils/LocaleUtil'
import DOMUtil from './../../../utils/DOMUtil'
import Device from './../../../utils/Device'
import SafeArea from './../../SafeArea'
import Toast from './../../Toast'
import VideoPlayer from './../../VideoPlayer'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, DOMUtil, Device, SafeArea, Toast, VideoPlayer } from 'lyrixi-mobile'
测试使用-end */

function toToastString(s: string | import('react').ReactNode): string {
  return typeof s === 'string' ? s : ''
}

function itemMediaUrl(item: FileItem): string {
  const raw = item?.localFile?.tempFileUrl ?? item?.fileUrl
  return raw === null || raw === undefined || raw === '' ? '' : String(raw)
}

function itemPosterUrl(item: FileItem): string {
  const raw = item?.localFile?.tempFileThumbnail ?? item?.fileThumbnail
  return raw === null || raw === undefined || raw === '' ? '' : String(raw)
}

const PreviewMain = forwardRef<MediaPreviewMainRef, MediaPreviewMainProps>(
  (
    {
      // Value & Display Value
      id,
      list: externalList = [],
      index,
      mediaType,
      sourceType = ['album', 'camera'],
      sizeType = ['compressed'],
      maxCount,
      compressConfig,
      // Status
      open = true,
      // Value & Display Value
      closable = false,
      allowChoose = false,
      // Status
      allowClear = false,
      // Value & Display Value
      async: asyncUpload = false,
      reUpload = true,
      // Style
      className,
      style,
      // Status
      safeArea,
      // Events
      onBeforeChoose,
      onChoose,
      onFileChange,
      onUpload,
      onChange,
      onClose
    },
    ref: Ref<MediaPreviewMainRef>
  ) => {
    const list: FileItem[] = externalList

    const swiperRef = useRef<SwiperRef | null>(null)

    const [activeIndex, setActiveIndex] = useState(0)

    const [rotations, setRotations] = useState<Record<number, number>>({})

    const onFileChangeRef = useRef<MediaProps['onFileChange'] | undefined>(undefined)

    onFileChangeRef.current = onFileChange

    const onChangeRef = useRef<MediaProps['onChange'] | undefined>(undefined)

    onChangeRef.current = onChange

    // Judge wether to display choose button
    let chooseVisible = allowChoose

    if (typeof maxCount === 'number' && (list || []).length >= maxCount) {
      chooseVisible = false
    }

    const canClear = isAllowClear(allowClear, list?.[activeIndex])

    useEffect(() => {
      if (!open || typeof swiperRef?.current?.swiper?.slideTo !== 'function') return
      const newActiveIndex = getActiveIndex({ index, list })
      swiperRef.current.swiper.slideTo(newActiveIndex, 0)
      setActiveIndex(newActiveIndex)
      // eslint-disable-next-line
    }, [open])

    useImperativeHandle(ref, () => {
      return {
        mainElement: swiperRef.current,
        getMainElement: () => swiperRef.current
      }
    })

    function _showLoading(params?: { content?: string; index?: number }) {
      showLoading(swiperRef.current as unknown as Element, params)
    }

    function _hideLoading(params?: { failIndexes?: number[] }) {
      hideLoading(swiperRef.current as unknown as Element, params)
    }

    function handleSwipe(swiper: SwiperClass) {
      setActiveIndex(swiper.activeIndex)
    }

    async function uploadList(
      newList: FileItem[] | undefined,
      { action }: { action?: string } = {}
    ) {
      // eslint-disable-next-line
      if (!newList) newList = [...list]
      if (!newList) return

      let hasUploaded = false
      _showLoading({
        content: toToastString(
          LocaleUtil.locale('上传中', 'lyrixi_fc09a73e52b76f697cff129b4dddecd1')
        )
      })
      for (let index = 0; index < newList.length; index++) {
        const item = newList[index]
        if (item.status === 'choose' || item.status === 'error') {
          newList[index] = (await uploadItem(item, { onUpload })) as FileItem
          hasUploaded = true
        }
      }
      _hideLoading()

      if (!reUpload) {
        if (Array.isArray(newList) && newList.length) {
          let failCount = 0
          newList = newList.filter((photo) => {
            if (
              photo.status === 'error' ||
              photo.status === 'choose' ||
              photo.status === 'uploading'
            ) {
              failCount++
              return false
            }
            return true
          })
          if (failCount) {
            Toast.open({
              content: toToastString(
                LocaleUtil.locale(
                  `网络异常，上传失败${failCount}张`,
                  'lyrixi_a096455f5d98e5ead856c948379040a6',
                  [failCount]
                )
              )
            })
          }
        }
      }

      if (hasUploaded) {
        onChangeRef.current?.(newList, { action: action || 'upload' })
      }

      return newList
    }

    function handleDelete() {
      const delIndex = swiperRef.current?.swiper?.activeIndex
      if (typeof delIndex !== 'number') {
        console.error('PreviewMain: index is not a number', swiperRef.current)
        return
      }
      const newListDel = list.filter((_photo, photoIndex) => photoIndex !== delIndex)
      onChangeRef.current?.(newListDel, { action: 'delete' })
    }

    async function handleFileChange(e: SyntheticEvent<HTMLInputElement>) {
      _showLoading({})
      const chooseResult = await fileChoose({
        file: e.currentTarget,
        async: asyncUpload,
        sizeType,
        compressConfig,
        maxCount,
        list,
        uploadPlacement: 'end',
        uploadList,
        onFileChange: onFileChangeRef.current as MediaFileChooseParams['onFileChange'] | undefined,
        onChange: onChangeRef.current
      })
      _hideLoading()
      onClose?.()
      return chooseResult
    }

    async function handleChoose() {
      _showLoading({})
      const chooseResult = await choose({
        async: asyncUpload,
        maxCount,
        list,
        uploadPlacement: 'end',
        uploadList,
        onChoose: onChoose ? () => onChoose() : undefined,
        onChange: onChangeRef.current
      })
      _hideLoading()
      onClose?.()
      return chooseResult
    }

    async function handleReUpload() {
      if (typeof onChange !== 'function') {
        console.warn('Media: onChange is not a function')
        return
      }
      const reIdx = swiperRef.current?.swiper?.activeIndex
      if (typeof reIdx !== 'number') {
        console.error('PreviewMain: index is not a number', swiperRef.current)
        return
      }
      const reItem = list[reIdx]
      const newListRe = [...list]
      _showLoading({
        content: toToastString(
          LocaleUtil.locale('上传中', 'lyrixi_fc09a73e52b76f697cff129b4dddecd1')
        ),
        index: reIdx
      })
      newListRe[reIdx] = (await uploadItem(reItem, { onUpload })) as FileItem
      _hideLoading(newListRe[reIdx].status === 'error' ? { failIndexes: [reIdx] } : undefined)
      onChangeRef.current?.(newListRe, { action: 'reUpload' })
    }

    function handleTouchStart(_swiper: SwiperClass, e: MouseEvent | TouchEvent | PointerEvent) {
      e.stopPropagation()
      const t = e.currentTarget as HTMLElement & { touchMovePreventDefault?: boolean }
      if (t.touchMovePreventDefault) return
      t.touchMovePreventDefault = true
      t.addEventListener('touchmove', DOMUtil.preventDefault, false)
    }

    function handleRotateClockwise(e: React.MouseEvent) {
      e.stopPropagation()
      setRotations((prev) => ({
        ...prev,
        [activeIndex]: ((prev[activeIndex] ?? 0) + 90) % 360
      }))
    }

    function handleRotateAnticlockwise(e: React.MouseEvent) {
      e.stopPropagation()
      setRotations((prev) => ({
        ...prev,
        [activeIndex]: ((prev[activeIndex] ?? 0) - 90 + 360) % 360
      }))
    }

    function handleZoomIn(e: React.MouseEvent) {
      e.stopPropagation()
      void swiperRef.current?.swiper?.zoom?.in()
    }

    function handleZoomOut(e: React.MouseEvent) {
      e.stopPropagation()
      void swiperRef.current?.swiper?.zoom?.out()
    }

    return (
      <Swiper
        id={id}
        ref={swiperRef}
        spaceBetween={0}
        slidesPerView={1}
        // initialSlide={activeIndex}
        navigation={false}
        zoom={list?.[activeIndex]?.fileType !== 'video' ? true : false}
        // Bullet pagination
        pagination={{ type: 'fraction' }}
        modules={[Zoom, Pagination]}
        // Style
        className={DOMUtil.classNames(
          'lyrixi-media-preview-main',
          className,
          closable ? 'lyrixi-closable' : '',
          chooseVisible ? 'lyrixi-choosable' : '',
          allowClear ? 'lyrixi-clearable' : '',
          open ? '' : 'lyrixi-hide'
        )}
        style={{
          height: '100%',
          backgroundColor: 'black',
          ...style
        }}
        // fix touch move
        touchMoveStopPropagation={true}
        touchStartForcePreventDefault={true}
        touchStartPreventDefault={true}
        passiveListeners={true}
        // Events
        onSlideChange={handleSwipe}
        onTouchStart={handleTouchStart}
      >
        {Array.isArray(list) &&
          list
            .filter((item) => {
              return item?.localFile?.tempFileUrl || item?.fileUrl || false
            })
            .map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className={DOMUtil.classNames('lyrixi-media-preview-main-item', item.status)}
                >
                  <div className="swiper-zoom-container">
                    {list?.[index]?.fileType !== 'video' && (
                      <div
                        className="lyrixi-media-preview-main-image-container"
                        style={{ transform: `rotate(${rotations[index] ?? 0}deg)` }}
                      >
                        <img alt="" className="swiper-zoom-target" src={itemMediaUrl(item)} />
                      </div>
                    )}
                    {list?.[index]?.fileType === 'video' && (
                      <VideoPlayer
                        poster={itemPosterUrl(item)}
                        src={itemMediaUrl(item)}
                        autoPlay={false}
                      />
                    )}
                  </div>
                  {/* ReUpload: Display while parentNode has fail class  */}
                  <PreviewReload id={id ? `${id}-reload` : undefined} onReUpload={handleReUpload} />
                </SwiperSlide>
              )
            })}
        {/* 图片操作：旋转、放大缩小（仅当前为图片时显示） */}
        {list?.[activeIndex]?.fileType !== 'video' &&
          (Device as { device: string }).device === 'pc' && (
            <PreviewToolbar
              id={id}
              onRotateAnticlockwise={handleRotateAnticlockwise}
              onRotateClockwise={handleRotateClockwise}
              onZoomOut={handleZoomOut}
              onZoomIn={handleZoomIn}
            />
          )}
        {/* Close */}
        {closable && <PreviewClose id={id ? `${id}-close` : undefined} onClose={onClose} />}
        {/* Delete */}
        {canClear ? (
          <PreviewDelete id={id ? `${id}-delete` : undefined} onDelete={handleDelete} />
        ) : null}
        {/* Choose */}
        {chooseVisible ? (
          <PreviewChoose
            id={id ? `${id}-choose` : undefined}
            // Value & Display Value
            sourceType={sourceType}
            mediaType={mediaType}
            // Events
            onChoose={onChoose ? () => void handleChoose() : undefined}
            onFileChange={onFileChange ? handleFileChange : undefined}
            // File框不支持onBeforeChoose
            onBeforeChoose={
              typeof onBeforeChoose === 'function'
                ? async (e: Parameters<NonNullable<typeof onBeforeChoose>>[0]) => {
                    _showLoading({})
                    const isOk = await onBeforeChoose(e)
                    _hideLoading()
                    return isOk
                  }
                : undefined
            }
          />
        ) : null}
        {safeArea === true && <SafeArea />}
      </Swiper>
    )
  }
)
export default PreviewMain
