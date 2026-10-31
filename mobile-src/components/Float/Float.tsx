import React, { useImperativeHandle, useRef, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import getPosition from './AssistiveTouch/getPosition'
import snapToEdge from './AssistiveTouch/snapToEdge'

import type { FloatElement, FloatProps, FloatRef, SnapPosition } from './types'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
import SafeArea from './../SafeArea'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, SafeArea } from 'lyrixi-mobile'
测试使用-end */

// 悬浮按钮
const Float = forwardRef<FloatRef, FloatProps>(
  (
    {
      // Value & Display Value
      id,
      // Status
      draggable,

      // Style
      gap = { top: 8, right: 8, bottom: 8, left: 8 },
      safeArea = true,
      style,
      className,

      // Elements
      portal,
      children,

      // Events
      onDragEnd
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)

    // 拖动信息
    const touchesRef = useRef({
      isDragging: false,
      startX: 0,
      startY: 0,
      currentLeft: 0,
      currentTop: 0
    })

    // Expose
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    // 触摸开始
    function handleTouchStart(e: React.TouchEvent<HTMLDivElement>): void {
      e.stopPropagation()

      // 解决拖动时影响document弹性
      e.currentTarget.addEventListener('touchmove', DOMUtil.preventDefault as EventListener, false)

      touchesRef.current.isDragging = true
      const touch = e.touches[0]
      touchesRef.current.startX = touch.clientX
      touchesRef.current.startY = touch.clientY
      const pos = getPosition(e.currentTarget)
      touchesRef.current.currentLeft = pos.left
      touchesRef.current.currentTop = pos.top
      e.currentTarget.style.transition = 'none'
    }

    // 触摸移动
    function handleTouchMove(e: React.TouchEvent<HTMLDivElement>): void {
      e.stopPropagation()

      // 拖动前, 清除冲突定位
      const target = e.currentTarget as FloatElement
      if (!target.initialPosition) {
        target.initialPosition = true
        target.style.left = `${touchesRef.current.currentLeft}px`
        target.style.top = `${touchesRef.current.currentTop}px`
        target.style.right = 'auto'
        target.style.bottom = 'auto'
      }

      // e.preventDefault()
      const touch = e.touches[0]
      const deltaX = touch.clientX - touchesRef.current.startX
      const deltaY = touch.clientY - touchesRef.current.startY

      target.style.left = `${touchesRef.current.currentLeft + deltaX}px`
      target.style.top = `${touchesRef.current.currentTop + deltaY}px`
    }

    // 触摸结束
    function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>): void {
      e.stopPropagation()

      // 拖动前, 清除冲突定位
      ;(e.currentTarget as FloatElement).initialPosition = false

      // 解除对move时的弹性对当前div的锁定
      e.currentTarget.removeEventListener(
        'touchmove',
        DOMUtil.preventDefault as EventListener,
        false
      )

      // 拖拽结束
      touchesRef.current.isDragging = false

      // 点击时不要修改位置
      const changedTouch = e.changedTouches?.[0]
      const endX = changedTouch?.clientX ?? touchesRef.current.startX
      const endY = changedTouch?.clientY ?? touchesRef.current.startY
      const diffX = touchesRef.current.startX - endX
      const diffY = touchesRef.current.startY - endY

      // 判断是否是点击
      if (Math.abs(diffX) < 5 && Math.abs(diffY) < 5) {
        return
      }

      // 贴边
      snapToEdge(e.currentTarget, {
        gap,
        onChange:
          typeof onDragEnd === 'function'
            ? (pos: SnapPosition) => {
                onDragEnd({ position: pos })
              }
            : undefined
      })
    }

    // Node
    const Node = (
      <div
        ref={rootRef}
        id={id}
        style={style}
        className={(DOMUtil.classNames as (...args: unknown[]) => string)(
          'lyrixi-float-container',
          className
        )}
        onTouchStart={draggable ? handleTouchStart : undefined}
        onTouchMove={draggable ? handleTouchMove : undefined}
        onTouchEnd={draggable ? handleTouchEnd : undefined}
        // onTouchMove里已经阻止的点击事件, 所以这里就不需要加了
        // onClickCapture={(e) => {
        //   console.log('click', touchesRef.current.isDragging)
        //   if (touchesRef.current.isDragging) {
        //     console.log('click')
        //     e.stopPropagation()
        //     e.preventDefault()
        //   }
        // }}
      >
        {children}
        {safeArea === true && <SafeArea />}
      </div>
    )

    if (!portal) {
      return Node
    }
    return createPortal(Node, portal || document.getElementById('root') || document.body)
  }
)

export default Float
