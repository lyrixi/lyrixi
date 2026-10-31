import React, { forwardRef, useRef, useImperativeHandle, useMemo } from 'react'

import type { AttachUploaderBrowserProps } from './AttachUploader.Browser.types'
import type { AttachRef } from './../../Attach/types'
import type { FileItem } from '../../../utils/Bridge/types'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Toast from './../../Toast'
import Attach from './../../Attach'
import MediaUploader from './../../MediaUploader'
// 内库使用-end

/* 测试使用-start
import { MediaUploader, LocaleUtil, Toast, Attach } from 'lyrixi-mobile'
测试使用-end */

function toToastString(s: string | import('react').ReactNode): string {
  return typeof s === 'string' ? s : ''
}

const Browser = forwardRef<AttachRef, AttachUploaderBrowserProps>(
  (
    {
      list = [],
      maxCount = 5,
      maxChooseCount = 1,
      sourceType: externalSourceType = ['album', 'camera'],
      maxSize,
      async = false,
      reUpload = true,
      allowChoose = true,
      uploadPlacement,
      previewPortal,
      previewServerUrl,
      previewServerSourceType,
      getUploadUrl,
      formatHeaders,
      formatPayload,
      formatResponse,
      // Status
      allowClear = true,
      // Style
      className,
      // Elements
      uploadRender,
      uploadingRender,
      itemRender,
      // Events
      onBeforeChoose,
      onChange,
      onPreview
    },
    ref
  ) => {
    void maxChooseCount
    const attachRef = useRef<AttachRef | null>(null)

    const sourceTypeList = useMemo((): string[] => {
      if (externalSourceType === null || externalSourceType === undefined)
        return ['album', 'camera']
      return Array.isArray(externalSourceType) ? externalSourceType : [externalSourceType]
    }, [externalSourceType])

    useImperativeHandle(ref, (): AttachRef => {
      const base = attachRef.current
      return {
        get element() {
          return base?.element ?? null
        },
        updateStatus: () => {
          base?.updateStatus()
        },
        chooseFile: async () => {
          Toast.open({
            content: toToastString(
              LocaleUtil.locale(
                '浏览器上传模式, 不支持编程式调用拍照',
                'lyrixi_18a8c44715538c3079cf8bf9fd46fe82',
                undefined
              )
            )
          })
          return false
        },
        choose: (e) => (base ? base.choose(e) : Promise.resolve(false)),
        uploadList: (nl, m) => (base ? base.uploadList(nl, m) : Promise.resolve([])),
        showLoading: (o) => {
          base?.showLoading(o)
        },
        hideLoading: (o) => {
          base?.hideLoading(o)
        }
      }
    })

    async function uploadItem(item: FileItem) {
      const newItem = await MediaUploader.uploadItem(item, {
        getUploadUrl,
        formatHeaders,
        formatPayload,
        formatResponse,
        platform: 'browser'
      })
      console.log('浏览器上传后新item:', newItem)
      return newItem
    }

    async function handleFileOrNative(fileItems: FileItem[]): Promise<unknown> {
      const arg = fileItems[0]
      if (!arg) return
      if (typeof onBeforeChoose === 'function') {
        const isOk = await onBeforeChoose()
        if (isOk === false) {
          return
        }
      }
      return [
        {
          status: 'choose',
          localFile: { ...arg },
          fileSize: arg.fileSize,
          fileUrl: arg.fileUrl,
          fileName: arg.fileName
        } as unknown as FileItem
      ]
    }

    return (
      <Attach
        ref={attachRef}
        list={list as FileItem[]}
        maxCount={maxCount}
        sourceType={sourceTypeList}
        maxSize={maxSize}
        async={async}
        reUpload={reUpload}
        allowChoose={allowChoose}
        allowClear={allowClear}
        className={className}
        uploadPlacement={uploadPlacement}
        uploadRender={uploadRender}
        uploadingRender={uploadingRender}
        itemRender={itemRender}
        previewPortal={previewPortal}
        previewServerUrl={previewServerUrl}
        previewServerSourceType={previewServerSourceType}
        onBeforeChoose={onBeforeChoose}
        onFileChange={handleFileOrNative}
        onUpload={uploadItem}
        onChange={onChange}
        onPreview={onPreview}
      />
    )
  }
)

export default Browser
