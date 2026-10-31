import React, { forwardRef, useRef, useImperativeHandle, type CSSProperties } from 'react'

import type { TooltipPopupProps, TooltipPopupRef } from './Tooltip.Popup.types'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
import Modal from './../Modal'
import getClassNameByAnimation from './../Modal/api/getClassNameByAnimation'
import type { ModalAnimation, ModalRef } from './../Modal/types'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Modal } from 'lyrixi-mobile'
const getClassNameByAnimation = Modal.getClassNameByAnimation
测试使用-end */

const Popup = forwardRef<TooltipPopupRef, TooltipPopupProps>(
  (
    {
      // Value & Display Value
      id,
      // Status
      open,
      maskClosable = true,
      // Value & Display Value
      animation,
      // Style
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
    const modalRef = useRef<ModalRef>(null)

    const position = getClassNameByAnimation(String(animation ?? ''))

    useImperativeHandle(ref, () => {
      return modalRef.current!
    })

    const backgroundColor = modalStyle?.backgroundColor
    const borderColor = modalStyle?.borderColor
    // position 形如 lyrixi-bottom-left / lyrixi-top-center，不能用 indexOf === 0
    const isBottom = position.includes('bottom')

    let arrowStyle: CSSProperties | null = null
    let arrowOuterStyle: CSSProperties | null = null
    if (isBottom) {
      arrowStyle = backgroundColor
        ? {
            borderTopColor: String(backgroundColor)
          }
        : null
      arrowOuterStyle = borderColor
        ? {
            borderTopColor: String(borderColor)
          }
        : null
    } else {
      arrowStyle = backgroundColor
        ? {
            borderBottomColor: String(backgroundColor)
          }
        : null
      arrowOuterStyle = borderColor
        ? {
            borderBottomColor: String(borderColor)
          }
        : null
    }

    return (
      <Modal
        ref={modalRef}
        id={id}
        open={open}
        maskClosable={maskClosable}
        animation={animation as ModalAnimation | undefined}
        modalStyle={modalStyle}
        modalClassName={DOMUtil.classNames('lyrixi-tooltip', modalClassName)}
        maskStyle={maskStyle}
        maskClassName={DOMUtil.classNames('lyrixi-mask-tooltip', maskClassName)}
        portal={portal}
        onClose={onClose}
      >
        <div className="lyrixi-tooltip-content">{children}</div>
        <div className="lyrixi-tooltip-arrow-outer" style={arrowOuterStyle ?? undefined}></div>
        <div className="lyrixi-tooltip-arrow" style={arrowStyle ?? undefined}></div>
      </Modal>
    )
  }
)
export default Popup
