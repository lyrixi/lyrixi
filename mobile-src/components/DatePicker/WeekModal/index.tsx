import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react'
import { getTitle } from './../utils'
import WeekMain from './../WeekMain'
import type { DatePickerModalRef, DatePickerWeekModalProps } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import NavBarModal from './../../Modal/NavBarModal'
import type { CalendarRef } from '../../Calendar/types'
import type { ModalRef } from './../../Modal/types'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Modal } from 'lyrixi-mobile'
const NavBarModal = Modal.NavBarModal
测试使用-end */

// WeekModal
const WeekModal = forwardRef<DatePickerModalRef, DatePickerWeekModalProps>(
  (
    {
      // Value & Display Value
      id,
      value,
      min,
      max,

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

    const mainRef = useRef<CalendarRef | null>(null)

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
    const titleNode = titleRender?.(currentValue, { type: 'week' }) ?? null

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
        title={titleNode || getTitle(currentValue, { type: 'week' })}
        ok={ok}
        cancel={cancel}
        okVisible={true}
        cancelVisible={cancelVisible}
        // Events
        onClose={onClose}
        onOk={handleOk}
      >
        <WeekMain
          ref={mainRef}
          open={open}
          value={currentValue ?? null}
          allowClear={allowClear}
          onChange={handleChange}
          min={min}
          max={max}
          style={undefined}
          className={undefined}
        />
      </NavBarModal>
    )
  }
)

export default WeekModal
