import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react'
import { getTitle } from './../utils'
import formatValue from './formatValue'
import Main from './../Main'
import type { DatePickerMainRef, DatePickerModalProps, DatePickerModalRef } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import NavBarModal from './../../Modal/NavBarModal'
import type { ModalRef } from './../../Modal/types'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Modal as BaseModal } from 'lyrixi-mobile'
const NavBarModal = BaseModal.NavBarModal
测试使用-end */

// Modal
const Modal = forwardRef<DatePickerModalRef, DatePickerModalProps>(
  (
    {
      // Value & Display Value
      id,
      value,
      type = 'date',
      min,
      max,
      hourStep,
      minuteStep,

      // Status
      open,
      maskClosable,

      // Style
      safeArea,
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,

      // Elements
      portal,
      titleRender,
      ok,
      cancel,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      okVisible,
      cancelVisible,

      // Events
      onClose,
      onChange,
      onOk
    },
    ref
  ) => {
    let [currentValue, setCurrentValue] = useState<Date | null | undefined>(value)

    const modalRef = useRef<ModalRef | null>(null)

    const mainRef = useRef<DatePickerMainRef | null>(null)

    // 同步外部value到内部currentValue
    useEffect(() => {
      setCurrentValue(formatValue(value, type, { hourStep, minuteStep }))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    useImperativeHandle(ref, () => {
      return {
        ...(modalRef.current ?? {}),
        ...(mainRef.current ?? {})
      } as DatePickerModalRef
    })

    async function handleOk() {
      // 触发 onOk
      if (onOk) {
        let goOn = await onOk(currentValue)
        if (goOn === false) return false
        if (goOn instanceof Date) {
          currentValue = goOn
        }
      }

      onChange?.(currentValue ?? null)
      onClose?.()
    }

    function handleChange(newValue: Date | null) {
      setCurrentValue(newValue)
    }

    // 自定义标题节点
    const titleNode = titleRender?.(currentValue, { type: type ?? 'date' }) ?? null

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
        modalClassName={DOMUtil.classNames('lyrixi-modal-picker', modalClassName)}
        maskStyle={maskStyle}
        maskClassName={maskClassName}
        // Elements
        portal={portal}
        title={titleNode || getTitle(currentValue, { type, separator: undefined })}
        ok={ok}
        cancel={cancel}
        okVisible={true}
        cancelVisible={cancelVisible}
        // Events
        onClose={onClose}
        onOk={handleOk}
      >
        <Main
          ref={mainRef}
          // Modal: Status
          open={open}
          // Value & Display Value
          value={currentValue ?? null}
          // Status
          type={type}
          min={min}
          max={max}
          hourStep={hourStep}
          minuteStep={minuteStep}
          // Events
          onChange={handleChange}
        />
      </NavBarModal>
    )
  }
)

export default Modal
