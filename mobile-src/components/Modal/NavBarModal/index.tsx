import React, { forwardRef, type MouseEvent } from 'react'
import Modal from '../Modal'
import NavBar from './NavBar'

import type { ModalNavBarModalProps, ModalNavBarModalRef } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// NavBarModal
const NavBarModal = forwardRef<ModalNavBarModalRef, ModalNavBarModalProps>(
  (
    {
      // Value & Display Value
      id,
      // Status
      open,
      maskClosable,

      // Style
      safeArea,
      navBarStyle,
      navBarClassName,
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,

      // Elements
      portal,
      title,
      ok,
      okVisible,
      okPlacement,
      cancel,
      cancelVisible,
      cancelPlacement,
      children,

      // Events
      onCancel,
      onOk,
      onClose
    },
    ref
  ) => {
    // 事件
    function handleCancelClick(e: MouseEvent<HTMLDivElement>) {
      e.stopPropagation()

      onCancel?.()
      onClose?.()
    }

    async function handleOkClick(e: MouseEvent<HTMLDivElement>) {
      e.stopPropagation()
      if (onOk) {
        let goOn = await onOk()
        if (goOn === false) return
      }
      onClose?.()
    }

    return (
      <Modal
        id={id}
        ref={ref}
        safeArea={safeArea}
        portal={portal}
        open={open}
        animation={'slideUp'}
        // Style
        maskClosable={maskClosable}
        maskClassName={DOMUtil.classNames('lyrixi-mask-navbar', maskClassName)}
        maskStyle={maskStyle}
        modalClassName={DOMUtil.classNames('lyrixi-modal-navbar', modalClassName)}
        modalStyle={modalStyle}
        // Events
        onClose={onClose}
      >
        <NavBar
          // Value & Display Value
          id={id}
          // Style
          style={navBarStyle}
          className={navBarClassName}
          // Elements
          title={title}
          ok={ok}
          cancel={cancel}
          okVisible={okVisible}
          okPlacement={okPlacement}
          cancelVisible={cancelVisible}
          cancelPlacement={cancelPlacement}
          // Events
          onOk={handleOkClick}
          onCancel={handleCancelClick}
        />

        {/* 主体 */}
        {children}
      </Modal>
    )
  }
)
export default NavBarModal
