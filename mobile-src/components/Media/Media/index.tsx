import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useRef,
  type CSSProperties,
  type SyntheticEvent,
  type ChangeEvent
} from 'react'
import fileChoose from './../utils/fileChoose'
import choose from './../utils/choose'
import uploadItem from './../utils/uploadItem'
import showLoading from './../utils/showLoading'
import hideLoading from './../utils/hideLoading'
import List from './../List'
import Choose from './../Choose'
import PreviewModal from './../PreviewModal'

import type { MediaProps } from './../types'
// 内库使用-start
import type { FileItem } from './../../../utils/Bridge/types'
import Bridge from './../../../utils/Bridge'
import Device from './../../../utils/Device'
import DOMUtil from './../../../utils/DOMUtil'
import LocaleUtil from './../../../utils/LocaleUtil'
import Toast from './../../Toast'
// 内库使用-end

/* 测试使用-start
import { Bridge, DOMUtil, LocaleUtil, Toast } from 'lyrixi-mobile'
测试使用-end */

function localeToastContent(key: string, id: string, args?: unknown[]) {
  const v = LocaleUtil.locale(key, id, args as string[] | undefined)
  return typeof v === 'string' ? v : String(v)
}

// 照片视频预览
const Media = forwardRef(
  (
    {
      id,
      // Value & Display Value
      list = [],
      maxCount,
      mediaType = ['image'], // video.录相 | 其它.为拍照
      ellipsis,
      sourceType = ['album', 'camera'],
      sizeType = ['compressed'], // ['original', 'compressed']
      maxDuration,
      compressConfig, // 浏览器选择图片压缩配置, { maxWidth: 最大宽度, quality: 质量 }

      // Status
      allowChoose = false,
      allowClear = false,
      async: asyncUpload = false,
      reUpload = true,
      previewAllowChoose,
      previewAllowClear,

      // Style
      itemStyle,
      chooseIconSize,
      ellipsisStyle,
      style,
      className,
      uploadPlacement = 'end', // start | end
      previewSafeArea,
      previewNavBarStyle,
      previewNavBarClassName,
      previewModalStyle,
      previewModalClassName,
      previewMaskStyle,
      previewMaskClassName,

      // Elements
      uploadRender, // 上传按钮覆盖的dom
      uploadingRender,
      itemRender,
      previewPortal,
      previewCancelPlacement,

      // Events
      onBeforeChoose,
      onChoose,
      onFileChange,
      onUpload,
      onChange,
      onPreview
    }: MediaProps,
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement | null>(null)

    // 因为在click事件内改变数据的可能性, 所以更新句柄, 防止synchronization模式读取创建时的状态
    const onFileChangeRef = useRef(onFileChange)
    onFileChangeRef.current = onFileChange

    const onChangeRef = useRef(onChange)
    onChangeRef.current = onChange

    // Judge wether to display choose button
    let chooseVisible = allowChoose
    if (typeof maxCount === 'number' && (list || []).length >= maxCount) {
      chooseVisible = false
    }

    // 预览类型: browser|native
    const previewTypeRef = useRef<string | null>(Device.platform === 'browser' ? 'browser' : null)
    const [previewVisible, setPreviewVisible] = useState<number | null>(null)

    // Refresh state (bump only; value is not read)
    const [, setUpdateStatus] = useState(0)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        },
        updateStatus: () => {
          setUpdateStatus((u) => u + 1)
        },
        chooseFile: _choose,
        choose: _choose,
        uploadList: uploadList,
        showLoading: _showLoading,
        hideLoading: _hideLoading,
        setPreviewVisible: setPreviewVisible
      }
    })

    // 显隐Loading
    function _showLoading(params?: { content?: string; index?: number }) {
      showLoading(rootRef.current, params)
    }

    function _hideLoading(params?: { failIndexes?: number[] }) {
      hideLoading(rootRef.current, params)
    }

    // Expose manual choose
    async function _choose(e?: SyntheticEvent) {
      if (!chooseVisible) {
        Toast.open({
          content: localeToastContent(
            '此照片控件无拍照功能, 请勿调用拍照',
            'lyrixi_35a3ca0b2cebe63e346eb2ef97193284'
          )
        })
        return false
      }
      const chooseElement = rootRef.current?.querySelector?.('[data-type="upload"]')
      if (!chooseElement) {
        Toast.open({
          content: localeToastContent(
            '未找到拍照按钮, 调用拍照失败',
            'lyrixi_76637d130a70149d956bf9acc14e2108'
          )
        })
        return false
      }

      const ev = e as { nativeEvent?: { target?: EventTarget } } | undefined
      const chooseCallBack = ev?.nativeEvent?.target ? handleFileChange : handleChoose
      const chooseOk = await chooseCallBack(e)
      return chooseOk
    }

    // 上传
    async function uploadList(newList?: FileItem[], { action }: { action?: string } = {}) {
      let workList: FileItem[] = newList ? [...newList] : [...list]
      if (!workList) return

      let hasUploaded = false
      // 开始上传
      _showLoading({
        content: localeToastContent('上传中', 'lyrixi_fc09a73e52b76f697cff129b4dddecd1')
      })
      for (let idx = 0; idx < workList.length; idx++) {
        const el = workList[idx]
        // 只上传未上传或上传失败的照片
        if (el.status === 'choose' || el.status === 'error') {
          workList[idx] = (await uploadItem(el, { onUpload })) as FileItem
          hasUploaded = true
        }
      }
      _hideLoading()

      // 不支持重新上传，则过滤上传失败的照片
      if (!reUpload) {
        if (Array.isArray(workList) && workList.length) {
          let failCount = 0
          // eslint-disable-next-line
          workList = workList.filter((photo) => {
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
          // 上传失败
          if (failCount) {
            Toast.open({
              content: `${localeToastContent(
                `网络异常，上传失败${failCount}张`,
                'lyrixi_a096455f5d98e5ead856c948379040a6',
                [failCount]
              )}`
            })
          }
        }
      }

      if (hasUploaded) {
        onChangeRef.current?.(workList, { action: action || 'upload' })
      }

      return workList
    }

    // 选择照片
    async function handleFileChange(e: ChangeEvent<HTMLInputElement> | SyntheticEvent | undefined) {
      const target =
        e && 'currentTarget' in e ? (e as ChangeEvent<HTMLInputElement>).currentTarget : undefined
      _showLoading()
      const chooseResult = await fileChoose({
        file: target,
        async: asyncUpload,
        sizeType,
        compressConfig,
        maxCount,
        list,
        uploadPlacement,
        uploadList,
        onFileChange: onFileChangeRef.current,
        onChange: onChangeRef.current
      } as any)
      _hideLoading()
      return chooseResult
    }

    // 选择照片
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function handleChoose(_e?: SyntheticEvent) {
      _showLoading()
      const chooseResult = await choose({
        async: asyncUpload,
        sizeType,
        maxCount,
        list,
        uploadPlacement,
        uploadList,
        onChoose,
        onChange: onChangeRef.current
      } as any)
      _hideLoading()
      return chooseResult
    }

    // 重新上传
    async function handleReUpload(item: FileItem, { index }: { index: number }) {
      if (typeof onChange !== 'function') {
        console.warn('Media: onChange is not a function')
        return
      }
      const newList: FileItem[] = [...list]
      // 开始上传
      _showLoading({
        content: localeToastContent('上传中', 'lyrixi_fc09a73e52b76f697cff129b4dddecd1'),
        index: index
      })
      newList[index] = (await uploadItem(item, { onUpload })) as FileItem
      _hideLoading(newList[index].status === 'error' ? { failIndexes: [index] } : undefined)

      onChangeRef.current?.(newList, { action: 'reUpload' })
    }

    // 点击预览
    async function handlePreview(item: FileItem, { index }: { index: number }) {
      // 自定义预览
      if (typeof onPreview === 'function') {
        const goOn = await onPreview(item, { index })
        if (goOn === false) return
        previewTypeRef.current = goOn as string | null
      }

      // 本地能力预览照片
      if (previewTypeRef.current === 'nativeMedia') {
        Bridge.previewMedia({
          sources: list,
          index: index
        })
      }
      // 视频使用previewFile预览
      else if (previewTypeRef.current === 'nativeFile') {
        Bridge.previewFile(item)
      }
      // 浏览器预览
      else {
        previewTypeRef.current = 'browser'
        setPreviewVisible(Number(index))
      }
    }

    // 上传node
    function renderChoose() {
      if (!chooseVisible) {
        return null
      }

      return (
        <Choose
          id={typeof id === 'string' ? `${id}-choose` : undefined}
          // Value & Display Value
          mediaType={mediaType}
          sourceType={sourceType}
          // Style
          style={itemStyle}
          iconSize={chooseIconSize}
          // Elements
          uploadRender={uploadRender}
          uploadingRender={uploadingRender}
          // Events
          onChoose={onChoose ? handleChoose : undefined}
          onFileChange={onFileChange ? handleFileChange : undefined}
          onBeforeChoose={
            typeof onBeforeChoose === 'function'
              ? async (e) => {
                  _showLoading()
                  const isOk = await onBeforeChoose(e)
                  _hideLoading()
                  return isOk
                }
              : undefined
          }
        />
      )
    }

    // Render
    return (
      <div
        id={id}
        ref={rootRef}
        // Style
        style={style as CSSProperties}
        className={DOMUtil.classNames('lyrixi-media', className)}
      >
        {/* Elements: 图片上传按钮(start) */}
        {uploadPlacement === 'start' && renderChoose()}

        {/* Elements: 图片列表 */}
        <List
          // Value & Display Value
          list={list as FileItem[]}
          ellipsis={ellipsis}
          itemStyle={itemStyle}
          ellipsisStyle={ellipsisStyle}
          // Status
          allowClear={allowClear}
          // Elements
          uploadingRender={uploadingRender}
          itemRender={itemRender}
          // Events
          onChange={onChangeRef.current}
          onReUpload={handleReUpload}
          onPreview={handlePreview}
        />

        {/* Elements: 图片上传按钮(end) */}
        {uploadPlacement === 'end' && renderChoose()}

        {/* Elements: 预览 */}
        {previewTypeRef.current === 'browser' && (
          <PreviewModal
            id={typeof id === 'string' ? `${id}-preview` : undefined}
            // Value & Display Value
            list={list as FileItem[]}
            index={previewVisible ?? undefined}
            mediaType={mediaType}
            maxCount={maxCount}
            sourceType={sourceType}
            sizeType={sizeType}
            maxDuration={maxDuration}
            compressConfig={compressConfig}
            // Style
            safeArea={previewSafeArea}
            navBarStyle={previewNavBarStyle}
            navBarClassName={previewNavBarClassName}
            modalStyle={previewModalStyle}
            modalClassName={previewModalClassName}
            maskStyle={previewMaskStyle}
            maskClassName={previewMaskClassName}
            // Status
            open={typeof previewVisible === 'number'}
            allowChoose={previewAllowChoose}
            allowClear={previewAllowClear}
            // Elements
            portal={previewPortal}
            cancelPlacement={previewCancelPlacement}
            // Events
            onBeforeChoose={onBeforeChoose}
            onChoose={onChoose}
            onFileChange={onFileChange}
            onUpload={onUpload}
            onChange={onChange}
            onClose={() => {
              setPreviewVisible(null)
            }}
          />
        )}
      </div>
    )
  }
)

export default Media
