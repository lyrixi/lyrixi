import React, { useImperativeHandle, useRef, forwardRef, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import getClassNameByAnimation from './../api/getClassNameByAnimation'

import type { ModalProps, ModalRef } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import SafeArea from './../../SafeArea'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, SafeArea, Tooltip } from 'lyrixi-mobile'
测试使用-end */

const Modal = forwardRef<ModalRef, ModalProps>(
  (
    {
      // Value & Display Value
      id,
      // Status
      open,
      maskClosable = true,

      // Style
      safeArea = false,
      animation = 'zoom', // none | slideLeft | slideRight | slideUp | slideDown | zoom | fade
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,

      // Elements
      portal,
      children,

      // Events
      onClose
    },
    ref
  ) => {
    const maskRef = useRef<HTMLDivElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => {
      return {
        get maskElement() {
          return maskRef.current
        },
        get modalElement() {
          return modalRef.current
        }
      }
    })

    // 构建动画
    let animationClassName = getClassNameByAnimation(animation)

    // 点击遮罩
    function handleMaskClick(e: MouseEvent<HTMLDivElement>) {
      if (maskClosable) {
        onClose?.(e)
      }
      e.stopPropagation()
    }

    // 点击模态框
    function handleModalClick(e: MouseEvent<HTMLDivElement>) {
      e.stopPropagation()
    }

    const activeClass = open ? 'lyrixi-active' : ''

    let ModalNode = (
      <div
        id={id}
        data-animation={animation}
        style={maskStyle}
        className={DOMUtil.classNames('lyrixi-mask', maskClassName, activeClass)}
        onClick={handleMaskClick}
        ref={maskRef}
      >
        <div
          id={id ? `${id}-modal` : undefined}
          className={DOMUtil.classNames(
            'lyrixi-modal-animation',
            animationClassName ? ' ' + animationClassName : '',
            modalClassName,
            activeClass
          )}
          style={modalStyle}
          data-animation={animation}
          onClick={handleModalClick}
          ref={modalRef}
        >
          {children}
          {safeArea === true && <SafeArea />}
        </div>
      </div>
    )

    if (portal === null || portal === false) {
      return ModalNode
    }
    const portalTarget =
      portal instanceof HTMLElement ? portal : document.getElementById('root') || document.body
    return createPortal(ModalNode, portalTarget)
  }
)
export default Modal
