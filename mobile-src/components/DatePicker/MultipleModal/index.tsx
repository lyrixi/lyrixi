import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react'
import { getTitle } from './../utils'
import MultipleMain from './../MultipleMain'
import type {
  DatePickerModalRef,
  DatePickerMultipleModalProps,
  DatePickerMultipleValue
} from './../types'

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
const Modal = forwardRef<DatePickerModalRef, DatePickerMultipleModalProps>(
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
      allowClear,

      // Style
      safeArea,
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,

      // Elements
      portal,
      separator,
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
    const [currentValue, setCurrentValue] = useState(value)

    const modalRef = useRef<ModalRef | null>(null)

    const mainRef = useRef<Record<string, unknown> | null>(null)

    // 同步外部value到内部currentValue
    useEffect(() => {
      setCurrentValue(value)
    }, [value])

    useImperativeHandle(ref, () => {
      return {
        ...(typeof modalRef.current === 'object' && modalRef.current !== null
          ? (modalRef.current as unknown as Record<string, unknown>)
          : {}),
        ...(typeof mainRef.current === 'object' && mainRef.current !== null ? mainRef.current : {})
      } as DatePickerModalRef
    })

    async function handleOk() {
      let next: DatePickerMultipleValue = currentValue ?? null
      if (onOk) {
        const goOn = await onOk(currentValue ?? null)
        if (goOn === false) return false
        if (Array.isArray(goOn)) {
          next = goOn
          setCurrentValue(goOn)
        }
      }

      onChange?.(next)
      onClose?.()
    }

    function handleChange(newValue: DatePickerMultipleValue) {
      setCurrentValue(newValue ?? null)
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
        title={titleNode || getTitle(currentValue, { type, separator })}
        ok={ok}
        cancel={cancel}
        okVisible={true}
        cancelVisible={cancelVisible}
        // Events
        onClose={onClose}
        onOk={handleOk}
      >
        <MultipleMain
          ref={mainRef}
          open={open}
          value={currentValue ?? null}
          allowClear={allowClear}
          onChange={handleChange}
          type={type}
          min={min}
          max={max}
          hourStep={hourStep}
          minuteStep={minuteStep}
          separator={separator}
        />
      </NavBarModal>
    )
  }
)

export default Modal
