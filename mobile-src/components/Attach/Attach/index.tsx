import React, {
  useState,
  useMemo,
  forwardRef,
  useRef,
  useImperativeHandle,
  type ChangeEvent,
  type SyntheticEvent
} from 'react'
import fileChoose from './../utils/fileChoose'
import choose from './../utils/choose'
import List from './../List'
import Choose from './../Choose'
import PreviewModal from './../PreviewModal'
import copyFileUrl from './copyFileUrl'

import type { AttachProps, AttachRef } from '../types'

// 内库使用-start
import type { FileItem } from '../../../utils/Bridge/types'
import Bridge from './../../../utils/Bridge'
import DOMUtil from './../../../utils/DOMUtil'
import LocaleUtil from './../../../utils/LocaleUtil'
import Toast from './../../Toast'
import Media from './../../Media'
// 内库使用-end

/* 测试使用-start
import { Bridge, DOMUtil, LocaleUtil, Toast, Media } from 'lyrixi-mobile'
测试使用-end */

// 文件上传
const Attach = forwardRef<AttachRef, AttachProps>(
  (
    {
      // Value & Display Value
      list = [] as FileItem[],
      /*
  [
    {
      fileUrl: "全路径(必传)",
      filePath: "入库路径(必传)",
      fileName: "文件名(必传)",
      fileSize: "文件大小(字节)",
      status: "choose|uploading|error|success",
    },
  ]
  */
      maxCount,
      sourceType,

      // Status
      disabled,
      allowChoose = false,
      allowClear = false,
      async = false,
      reUpload = true,

      maxSize,

      // Style
      style,
      className,
      uploadPlacement = 'end', // start | end

      // Elements
      uploadRender, // 上传按钮覆盖的dom
      uploadingRender,
      children,
      itemRender,

      // Preview Server
      previewPortal,
      previewServerUrl,
      previewServerSourceType,

      // Events
      onBeforeChoose,
      onChoose,
      onFileChange,
      onUpload,
      onChange,
      onPreview
    }: AttachProps,
    ref: React.ForwardedRef<AttachRef>
  ) => {
    const rootRef = useRef<HTMLDivElement | null>(null)
    const onChangeRef = useRef<AttachProps['onChange']>(undefined)
    onChangeRef.current = onChange

    const previewTypeRef = useRef<unknown>(null)

    const [previewVisible, setPreviewVisible] = useState<number | null>(null)

    // Refresh state
    // eslint-disable-next-line
    const [updateStatus, setUpdateStatus] = useState(0)

    const sourceTypeList = useMemo((): string[] => {
      if (sourceType === null || sourceType === undefined) return []
      return Array.isArray(sourceType) ? sourceType : [sourceType]
    }, [sourceType])

    const previewSourceTypes = useMemo((): string[] => {
      if (previewServerSourceType === null || previewServerSourceType === undefined) {
        return ['image', 'video', 'audio', 'pdf']
      }
      return Array.isArray(previewServerSourceType)
        ? previewServerSourceType
        : [previewServerSourceType]
    }, [previewServerSourceType])

    // Judge wether to display choose button
    let chooseVisible = allowChoose
    if (typeof maxCount === 'number' && (list || []).length >= maxCount) {
      chooseVisible = false
    }

    // 显隐Loading
    function _showLoading(params?: { content?: string; index?: number }) {
      Media.showLoading(rootRef.current, params ?? {})
    }

    function _hideLoading(params?: { failIndexes?: number[] }) {
      Media.hideLoading(rootRef.current, params ?? {})
    }

    // 上传
    async function uploadList(
      newList: FileItem[] | null | undefined,
      { action }: { action?: string } = {}
    ) {
      if (!newList) {
        // eslint-disable-next-line
        newList = [...list]
      }
      if (!newList) return [] as FileItem[]

      let hasUploaded = false
      // 开始上传
      _showLoading({
        content: String(LocaleUtil.locale('上传中', 'lyrixi_fc09a73e52b76f697cff129b4dddecd1'))
      })
      for (let index = 0; index < newList.length; index++) {
        const item = newList[index]
        // 只上传未上传的文件
        if (item.status === 'choose') {
          newList[index] = (await Media.uploadItem(item as unknown as FileItem, {
            onUpload: onUpload as unknown as ((item: FileItem) => unknown) | undefined
          })) as FileItem
          hasUploaded = true
        }
      }
      _hideLoading()

      // 不支持重新上传，则过滤上传失败的文件
      if (!reUpload) {
        if (Array.isArray(newList) && newList.length) {
          let failCount = 0
          // eslint-disable-next-line
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
          // 上传失败
          if (failCount) {
            Toast.open({
              content: `${LocaleUtil.locale(
                '网络异常，上传失败',
                'lyrixi_18904cde640c2efd37bc6ed3e9dedc77'
              )}${failCount}`
            })
          }
        }
      }

      if (hasUploaded && onChangeRef.current) {
        onChangeRef.current(newList, { action: action || 'upload' })
      }

      return newList
    }

    // 重新上传
    async function handleReUpload(item: FileItem, { index }: { index: number }) {
      let newList = [...list]
      // 开始上传
      _showLoading({ index })
      newList[index] = (await Media.uploadItem(item as unknown as FileItem, {
        onUpload: onUpload as unknown as ((item: FileItem) => unknown) | undefined
      })) as FileItem
      _hideLoading(newList[index].status === 'error' ? { failIndexes: [index] } : undefined)

      onChangeRef.current?.(newList, { action: 'reUpload' })
    }

    // 选择文件
    function getFileInputElement(
      e: ChangeEvent<HTMLInputElement> | SyntheticEvent<HTMLInputElement>
    ): HTMLInputElement {
      const fromEvent = (e as SyntheticEvent<HTMLInputElement>).nativeEvent
        ?.target as HTMLInputElement | null
      if (fromEvent && fromEvent.type === 'file') {
        return fromEvent
      }
      return (e as ChangeEvent<HTMLInputElement>).currentTarget
    }

    async function handleFileChange(
      e: ChangeEvent<HTMLInputElement> | SyntheticEvent<HTMLInputElement>
    ) {
      const inputEl = getFileInputElement(e)
      if (inputEl.type !== 'file') {
        return
      }
      _showLoading()
      let chooseResult = await fileChoose({
        file: inputEl,
        async,
        maxSize,
        maxCount,
        sourceType: sourceTypeList,
        list,
        uploadPlacement,
        uploadList,
        onFileChange,
        onChange: onChangeRef.current
      })
      _hideLoading()
      return chooseResult
    }

    // 选择文件（相机/系统选择器，无 file input target 时）
    async function handleChoose(e?: SyntheticEvent) {
      void e
      _showLoading()
      const chooseResult = await choose({
        async,
        maxSize,
        maxCount,
        sourceType: sourceTypeList,
        list,
        uploadPlacement,
        uploadList,
        onChoose: onChoose ? () => onChoose() : undefined,
        onChange: onChangeRef.current
      })
      _hideLoading()
      return chooseResult
    }

    async function _choose(e: SyntheticEvent) {
      if (!chooseVisible) {
        Toast.open({
          content: String(
            LocaleUtil.locale(
              '此控件无上传功能, 请勿调用拍照',
              'lyrixi_c4b36524143372bf6821ce50ab843844'
            )
          )
        })
        return false
      }
      const root = rootRef.current
      const uploadElement = root?.querySelector('.lyrixi-attach-choose')
      if (!uploadElement) {
        Toast.open({
          content: String(
            LocaleUtil.locale(
              '未找到上传按钮, 调用上传失败',
              'lyrixi_9e65d8453742238201afa78f9f37ff8c'
            )
          )
        })
        return false
      }

      if (e?.nativeEvent?.target) {
        return handleFileChange(e as ChangeEvent<HTMLInputElement>)
      }
      return handleChoose(e)
    }

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        },
        updateStatus: () => {
          setUpdateStatus((s) => s + 1)
        },
        chooseFile: _choose,
        choose: _choose,
        uploadList: uploadList,
        showLoading: _showLoading,
        hideLoading: _hideLoading
      }
    })

    // 点击预览
    async function handlePreview(item: FileItem, { index }: { index: number }) {
      // 自定义预览
      if (typeof onPreview === 'function') {
        let goOn = await onPreview(item, { index })
        if (goOn === false) return
        previewTypeRef.current = goOn
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
      else if (previewTypeRef.current === 'browser') {
        previewTypeRef.current = 'browser'
        setPreviewVisible(Number(index))
      }
      // 复制到剪贴板
      else {
        const u = item.fileUrl
        if (typeof u === 'string' && u) {
          copyFileUrl(u)
        }
      }
    }

    // 上传node
    function renderChoose() {
      if (!chooseVisible || typeof onChange !== 'function') {
        return null
      }

      return (
        <Choose
          // Value & Display Value
          sourceType={sourceTypeList}
          // Status
          disabled={disabled}
          className={className}
          // Elements
          uploadRender={uploadRender}
          uploadingRender={uploadingRender}
          // Events
          onChoose={onChoose ? handleChoose : undefined}
          onFileChange={onFileChange ? handleFileChange : undefined}
          // File框不支持onBeforeChoose
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

    return (
      <div ref={rootRef} style={style} className={DOMUtil.classNames('lyrixi-attach', className)}>
        {/* 头部上传按钮 */}
        {uploadPlacement === 'start' && (onChoose || onFileChange) && renderChoose()}

        {/* 列表（可由 children 完全替换） */}
        {children ?? (
          <List
            // Value & Display Value
            list={list}
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
        )}

        {/* 底部上传按钮 */}
        {uploadPlacement === 'end' && (onChoose || onFileChange) && renderChoose()}

        {/* 预览 */}
        {previewTypeRef.current === 'browser' &&
          previewVisible !== null &&
          previewVisible !== undefined && (
            <PreviewModal
              // Value & Display Value
              fileName={list[previewVisible]?.fileName as string | undefined}
              previewServerUrl={previewServerUrl}
              fileUrl={list[previewVisible]?.fileUrl}
              previewServerSourceType={previewSourceTypes}
              // Status
              open={typeof previewVisible === 'number'}
              // Elements
              portal={previewPortal}
              // Events
              onClose={() => {
                setPreviewVisible(null)
              }}
            />
          )}
      </div>
    )
  }
)

export default Attach
