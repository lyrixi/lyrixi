import React, { forwardRef, useRef, useImperativeHandle, useEffect, type Ref } from 'react'
import Instance from './instance'
import type { QRLib } from './instance'

import type { QRCodeProps, QRCodeRef } from './types'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
import MathUtil from './../../utils/MathUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, MathUtil } from 'lyrixi-mobile'
测试使用-end */

function cssSizeToNumber(value: string | number | undefined, fallback: number): number {
  const n = Number(MathUtil.extractNumber(value ?? fallback))
  return Number.isFinite(n) && n > 0 ? n : fallback
}

// 生成二维码
const QRCode = forwardRef<QRCodeRef, QRCodeProps>(
  (
    {
      // Value & Display Value
      id,
      style,
      text,
      children,
      className
    },
    ref: Ref<QRCodeRef>
  ) => {
    // 节点
    const rootRef = useRef<HTMLSpanElement | null>(null)

    const instance = useRef<QRLib | null>(null)

    useEffect(() => {
      if (!text || typeof text !== 'string') return
      if (!instance.current) {
        instance.current = new Instance(rootRef.current, {
          text: text || '',
          width: cssSizeToNumber(style?.width, 230),
          height: cssSizeToNumber(style?.height ?? style?.width, 230),
          colorDark: style?.color || '#000000',
          colorLight: style?.backgroundColor || '#ffffff',
          correctLevel: Instance.CorrectLevel.M // L,M,Q,H
        })
      }

      const width = cssSizeToNumber(style?.width, 0)
      const height = cssSizeToNumber(style?.height, 0)
      const color = style?.color
      const backgroundColor = style?.backgroundColor
      if (width) instance.current._htOption.width = width
      if (height) instance.current._htOption.height = height
      if (color) instance.current._htOption.colorDark = color
      if (backgroundColor) instance.current._htOption.colorLight = backgroundColor
      instance.current.makeCode(text)
      // eslint-disable-next-line
    }, [text])

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    if (!text) return null

    return (
      <span
        id={id}
        style={style}
        className={DOMUtil.classNames('lyrixi-qrcode', className)}
        ref={rootRef}
      >
        {children}
      </span>
    )
  }
)

export default QRCode
