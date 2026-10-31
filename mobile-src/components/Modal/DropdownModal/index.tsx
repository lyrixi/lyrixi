import React, { forwardRef, useEffect, useRef, useImperativeHandle } from 'react'
import Modal from './../Modal'
import getAnimation from './getAnimation'

import type { ModalDropdownModalProps, ModalDropdownModalRef, ModalRef } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import updatePositionByReferenceElement from './../../Tooltip/api/updatePositionByReferenceElement'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Tooltip } from 'lyrixi-mobile'
测试使用-end */

// DropdownModal
const DropdownModal = forwardRef<ModalDropdownModalRef, ModalDropdownModalProps>(
  (
    {
      // Value & Display Value
      id,
      // Status
      open,
      maskClosable,

      // Style
      safeArea,
      offset,
      left,
      right,
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,

      // Elements
      portal,
      referenceElement: externalReferenceElement,
      children,

      // Events
      onClose
    },
    ref
  ) => {
    // 1. props（见上方参数解构）

    // 2. refs
    const modalRef = useRef<ModalRef>(null)

    // 3. state（无）

    // 4. derived values / memo
    const animation = getAnimation(left, right)
    const mergedDropdownSide =
      (left !== undefined && left !== null) || (right !== undefined && right !== null)

    // 5. internal helpers
    function updateModalPosition() {
      const maskElement = modalRef?.current?.maskElement

      const referenceElement =
        typeof externalReferenceElement === 'function'
          ? externalReferenceElement()
          : externalReferenceElement

      if (!referenceElement || !maskElement) return
      const topUnset = maskStyle?.top === undefined || maskStyle?.top === null
      const bottomUnset = maskStyle?.bottom === undefined || maskStyle?.bottom === null
      if (open && referenceElement && maskElement && topUnset && bottomUnset) {
        const parentEl =
          portal !== null && typeof portal === 'object' && portal instanceof HTMLElement
            ? portal
            : null
        updatePositionByReferenceElement(maskElement, {
          referenceElement: referenceElement,
          parentElement: parentEl,
          animation: animation,
          offset: offset,
          left: maskStyle?.left,
          right: maskStyle?.right
        })
      }
    }

    // 6. effects
    useEffect(() => {
      updateModalPosition()
      // eslint-disable-next-line
    }, [open])

    // 7. expose / imperative handle
    useImperativeHandle(ref, () => modalRef.current!)

    // 8. event handlers（无）

    // 9. render helpers（无）

    // 10. return
    return (
      <Modal
        id={id}
        ref={modalRef}
        safeArea={safeArea}
        portal={portal}
        open={open}
        animation={animation}
        // Style
        maskClosable={maskClosable}
        maskClassName={DOMUtil.classNames(
          maskClassName,
          mergedDropdownSide ? 'lyrixi-mask-dropdown-side' : 'lyrixi-mask-dropdown-center'
        )}
        maskStyle={{
          ...maskStyle,
          ...(left !== undefined && left !== null ? { left: left } : {}),
          ...(right !== undefined && right !== null ? { right: right } : {})
        }}
        modalStyle={modalStyle}
        modalClassName={DOMUtil.classNames(
          modalClassName,
          mergedDropdownSide ? 'lyrixi-modal-dropdown-side' : 'lyrixi-modal-dropdown-center'
        )}
        // Events
        onClose={onClose}
      >
        {children}
      </Modal>
    )
  }
)
export default DropdownModal
