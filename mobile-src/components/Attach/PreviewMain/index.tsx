import React, { useRef, forwardRef, useImperativeHandle, type Ref } from 'react'
import supportTypes from './../utils/supportTypes'

import type { AttachPreviewMainProps, AttachPreviewMainRef } from './Attach.PreviewMain.types'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Bridge from './../../../utils/Bridge'
import Result from './../../Result'
import Button from './../../Button'
import WebView from './../../WebView'
// 内库使用-end

/* 测试使用-start
import {
  LocaleUtil,
  Clipboard,
  Bridge,
  Result,
  Button,
  Toast,
  Message,
  WebView
} from 'lyrixi-mobile'
测试使用-end */

// 附件预览
const AttachPreviewMain = forwardRef<AttachPreviewMainRef, AttachPreviewMainProps>(
  (
    {
      fileName,
      previewServerUrl,
      fileUrl,
      previewServerSourceType = ['image', 'video', 'audio', 'pdf']
    },
    ref: Ref<AttachPreviewMainRef>
  ) => {
    const mainRef = useRef<HTMLDivElement | null>(null)
    // 节点
    useImperativeHandle(ref, () => {
      return {
        mainElement: mainRef.current,
        getMainElement: () => mainRef.current
      }
    })

    function getSrc() {
      if (typeof fileUrl !== 'string') {
        return ''
      }
      if (previewServerUrl && typeof previewServerUrl === 'string') {
        let urlParamSrc = encodeURIComponent(encodeURIComponent(fileUrl))
        return previewServerUrl.indexOf('?') === -1
          ? `${previewServerUrl}?url=${urlParamSrc}`
          : `${previewServerUrl}&url=${urlParamSrc}`
      }
      return fileUrl
    }

    let newSrc = getSrc()
    if (!newSrc) return null

    return (
      <div ref={mainRef} className="lyrixi-attach-preview-main" style={{ height: '600px' }}>
        {typeof fileUrl === 'string' && supportTypes(fileUrl, previewServerSourceType) === false ? (
          <Result
            status="error"
            title={fileName}
            description={LocaleUtil.locale(
              '暂不支持此类型',
              'lyrixi_82a46f8d675c89e11eb7dc7797df91c3'
            )}
          >
            <Button
              color="primary"
              onClick={() => {
                if (typeof fileUrl === 'string') {
                  Bridge.previewFile({ fileUrl })
                }
              }}
            >
              {LocaleUtil.locale('点击预览', 'lyrixi_52ad09ab6864e032eb8c416cb74dcb72')}
            </Button>
          </Result>
        ) : (
          <WebView src={newSrc} />
        )}
      </div>
    )
  }
)

export default AttachPreviewMain
