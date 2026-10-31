import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'

import { CanvasUtil } from './utils'

import type {
  SignatureCanvas,
  SignatureMainDrawProps,
  SignatureMainDrawRef
} from './Signature.Main.Signature.types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// 手写签名
const Signature = forwardRef<SignatureMainDrawRef, SignatureMainDrawProps>(
  (
    {
      // Value & Display Value
      suffix = 'png',
      quality = 0.92,

      // Style
      style, // 不能使用style制定宽高,canvas用style的width|height会导致绘图位置不正确
      color = '#000', // 绘画配置: 画笔颜色
      backgroundColor = '#fff', // 绘画配置: 背景颜色
      lineWidth = 3 // 绘画配置: 线条宽度
    }: SignatureMainDrawProps,
    ref: React.Ref<SignatureMainDrawRef>
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)

    const canvasRef = useRef<SignatureCanvas>(null)

    const isDrewRef = useRef(false)

    // 标识是否正在绘制，用于解决鼠标移动时，没有开始绘制，则不处理
    const isDrawingRef = useRef(false)

    // canvas坐标信息
    const clientRectRef = useRef<DOMRect | null>(null)

    // 触摸信息
    const touchesRef = useRef({
      beginX: 0,
      beginY: 0,
      endX: 0,
      endY: 0
    })

    useEffect(() => {
      updateContainer()
      if (canvasRef.current) {
        canvasRef.current.ctx = canvasRef.current.getContext('2d') ?? undefined
      }
      // eslint-disable-next-line
    }, [])

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        },
        getBase64: async () => {
          if (!canvasRef.current) return null
          if (CanvasUtil.isBlank(canvasRef.current)) {
            return null
          }
          let base64 = CanvasUtil.toBase64(canvasRef.current, { suffix, quality })

          // 旋转90度后返回
          base64 = await CanvasUtil.rotateBase64(base64, { backgroundColor })
          return base64
        },
        clear: () => {
          if (canvasRef.current) CanvasUtil.clear(canvasRef.current)
          isDrewRef.current = false
        }
      }
    })

    function updateContainer() {
      if (!rootRef.current || !canvasRef.current) return
      let width = rootRef.current.clientWidth
      let height = rootRef.current.clientHeight
      if (canvasRef.current.width !== width || canvasRef.current.height !== height) {
        canvasRef.current.width = width
        canvasRef.current.height = height
      }
    }

    function handleStart(
      e: React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>
    ) {
      e.stopPropagation()
      // 解决拖动时影响document弹性
      if (e.type === 'touchstart') {
        e.currentTarget.addEventListener('touchmove', DOMUtil.preventDefault, false)
      }

      // 鼠标开始绘制
      isDrawingRef.current = true

      // 防止尺寸变化
      updateContainer()

      // 防止下层还有焦点
      window.getSelection()?.removeAllRanges()
      if (!canvasRef.current?.ctx) return
      canvasRef.current.ctx.strokeStyle = color
      canvasRef.current.ctx.lineWidth = lineWidth
      clientRectRef.current = canvasRef.current.getBoundingClientRect()

      const pos = DOMUtil.getEventPosition(e)
      if (!clientRectRef.current) return
      canvasRef.current.ctx.beginPath()
      canvasRef.current.ctx.moveTo(
        pos.clientX - clientRectRef.current.left,
        pos.clientY - clientRectRef.current.top
      )
      touchesRef.current.beginX = pos.clientX - clientRectRef.current.left
      touchesRef.current.beginY = pos.clientY - clientRectRef.current.top
    }

    function handleMove(
      e: React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>
    ) {
      // 鼠标移动时，如果没有开始绘制，则不处理
      if (!isDrawingRef.current) {
        return
      }

      e.stopPropagation()
      if (!canvasRef.current?.ctx || !clientRectRef.current) return
      const pos = DOMUtil.getEventPosition(e)
      canvasRef.current.ctx.lineTo(
        pos.clientX - clientRectRef.current.left,
        pos.clientY - clientRectRef.current.top
      )
      touchesRef.current.endX = pos.clientX - clientRectRef.current.left
      touchesRef.current.endY = pos.clientY - clientRectRef.current.top
      canvasRef.current.ctx.stroke()
      // 标识是否绘制过
      isDrewRef.current = true
    }

    function handleEnd(
      e: React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>
    ) {
      // 鼠标结束绘制
      isDrawingRef.current = false

      // 解除对move时的弹性对当前div的锁定
      if (e.type === 'touchend') {
        e.currentTarget.removeEventListener('touchmove', DOMUtil.preventDefault, false)
      }
    }

    // 不能使用style制定宽高,canvas用style的width|height会导致绘图位置不正确
    const safeStyle = style ? { ...style } : undefined

    if (safeStyle) {
      delete safeStyle.width
      delete safeStyle.height
    }

    return (
      <div
        ref={rootRef}
        // Style
        style={safeStyle}
        className="lyrixi-signature-main-canvas"
      >
        {/* Elements: Canvas */}
        <canvas
          ref={canvasRef}
          // Events
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
        >
          Canvas画板
        </canvas>
      </div>
    )
  }
)
export default Signature
