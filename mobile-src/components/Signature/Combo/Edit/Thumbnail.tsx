import React, { useRef, useState } from 'react'

import type { SignatureComboEditThumbnailProps } from './Signature.Combo.Edit.Thumbnail.types'

// 内库使用-start
import Media from './../../../Media'
// 内库使用-end

/* 测试使用-start
import { Media } from 'lyrixi-mobile'
测试使用-end */

// 预览
function Thumbnail({ src, onPreview }: SignatureComboEditThumbnailProps) {
  const previewTypeRef = useRef<string | null>('browser')
  const [previewCurrent, setPreviewCurrent] = useState<number | null>(null)

  // 图片加载完成
  function handleImgLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const parent = e.currentTarget.parentNode as HTMLElement | null
    if (parent) {
      parent.classList.add('lyrixi-success')
      parent.style.backgroundImage = `url(${src})`
    }
  }
  // 图片加载失败
  function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
    const parent = e.currentTarget.parentNode as HTMLElement | null
    if (parent) {
      parent.classList.add('lyrixi-error')
    }
  }

  // 未签显示签名
  return (
    <>
      <div
        className="lyrixi-signature-edit-image"
        onClick={async () => {
          // 自定义预览
          if (typeof onPreview === 'function' && src) {
            let goOn = await onPreview(src)
            if (goOn === false) return
            if (typeof goOn === 'string') previewTypeRef.current = goOn
          }

          // 浏览器预览
          previewTypeRef.current = 'browser'
          setPreviewCurrent(0)
        }}
      >
        <img src={src} alt="" onLoad={handleImgLoad} onError={handleImgError} />
      </div>

      {/* 预览 */}
      {previewTypeRef.current === 'browser' && (
        <Media.PreviewModal
          open={typeof previewCurrent === 'number'}
          onClose={() => {
            setPreviewCurrent(null)
          }}
          list={[{ fileUrl: src }]}
          current={previewCurrent ?? undefined}
        />
      )}
    </>
  )
}

export default Thumbnail
