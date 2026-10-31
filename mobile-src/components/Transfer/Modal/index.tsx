import React, { forwardRef, useState, useRef, useImperativeHandle, useEffect } from 'react'
import formatValue from './formatValue'
import Main from './../Main'

import type {
  TransferItem,
  TransferMainRef,
  TransferModalProps,
  TransferModalRef
} from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import NavBarModal from './../../Modal/NavBarModal'
import type { ModalRef } from './../../Modal/types'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Modal } from 'lyrixi-mobile'
const NavBarModal = Modal.NavBarModal
测试使用-end */

// Modal
const Modal = forwardRef<TransferModalRef, TransferModalProps>(
  (
    {
      // Value & Display Value
      id,
      value,

      // Main
      // Main: Value & Display Value
      list,
      titles,

      // Status
      open,

      // Modal
      // Modal: Status
      maskClosable,
      safeArea,

      // Main: Status
      allowClear,
      // Modal: Style
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,
      // Modal: Elements
      portal,
      title,
      ok,
      cancel,
      // Modal: Status
      okVisible,
      cancelVisible,
      // Events
      onClose,
      onOk,
      onChange
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState<TransferItem[] | undefined>(value)

    const modalRef = useRef<ModalRef | null>(null)

    const mainRef = useRef<TransferMainRef | null>(null)

    // 同步外部 value 到内部
    useEffect(() => {
      if (open) {
        setCurrentValue(formatValue(value))
      }
    }, [open, value])

    useImperativeHandle(ref, () => {
      return {
        ...(modalRef.current ?? {}),
        ...(mainRef.current ?? {})
      } as TransferModalRef
    })

    async function handleOk() {
      if (onOk) {
        const v = currentValue ?? []
        const goOn = await onOk(v)
        if (goOn === false) return false
      }

      onChange?.(currentValue ?? [])
      onClose?.()
    }

    function handleChange(newValue: TransferItem[]) {
      setCurrentValue(newValue)
    }

    return (
      <NavBarModal
        id={id}
        ref={modalRef}
        // Status
        open={open}
        maskClosable={maskClosable}
        // Style
        safeArea={safeArea}
        modalStyle={modalStyle}
        modalClassName={DOMUtil.classNames('lyrixi-modal-transfer', modalClassName)}
        maskStyle={maskStyle}
        maskClassName={maskClassName}
        // Elements
        portal={portal}
        title={title}
        ok={ok}
        okVisible={okVisible !== undefined ? okVisible : true}
        cancel={cancel}
        cancelVisible={cancelVisible}
        // Events
        onClose={onClose}
        onOk={handleOk}
      >
        <Main
          ref={mainRef}
          value={currentValue ?? []}
          list={list ?? []}
          titles={titles}
          allowClear={allowClear}
          onChange={handleChange}
        />
      </NavBarModal>
    )
  }
)

export default Modal
