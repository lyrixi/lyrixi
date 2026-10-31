import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react'
import MultipleModal from './../MultipleModal'
import getDisplayValue from './getDisplayValue'
import type { DatePickerMultipleValue } from './../types'
import type {
  DatePickerModalRef,
  DatePickerMultipleComboProps,
  DatePickerMultipleComboRef
} from './../types'

// 内库使用-start
import type { InputSelectProps, InputSelectRef as InputComboSelectRef } from './../../Input/types'
import Input from './../../Input'
// 内库使用-end

/* 测试使用-start
import { Input } from 'lyrixi-mobile'
测试使用-end */

// DatePicker
const MultipleCombo = forwardRef<DatePickerMultipleComboRef, DatePickerMultipleComboProps>(
  (
    {
      // Combo
      // Combo: Value & Display Value
      id,
      value,
      placeholder,
      formatter,
      autoSize,
      separator,
      // Combo: Status
      readOnly,
      disabled,
      allowClear,
      // Combo: Style
      style,
      className,
      // Combo: Elements
      leftIconRender,
      leftIconSvg,
      rightIconRender,
      rightIconSvg,
      clearRender,

      // Modal
      // Modal: Value & Display Value
      type = 'date',
      min,
      max,
      hourStep,
      minuteStep,
      // Modal: Status
      maskClosable,
      // Modal: Style
      safeArea,
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,
      // Modal: Elements
      portal,
      titleRender,
      ok,
      cancel,
      okVisible,
      cancelVisible,

      // Events
      onChange,
      onBeforeOpen,
      onOk
    },
    ref
  ) => {
    const [open, setOpen] = useState(false)
    const comboRef = useRef<InputComboSelectRef | null>(null)
    const modalRef = useRef<DatePickerModalRef | null>(null)

    useImperativeHandle(ref, () => {
      return {
        ...(comboRef.current ?? {}),
        ...(modalRef.current ?? {}),
        close: () => setOpen(false),
        open: () => setOpen(true)
      } as DatePickerMultipleComboRef
    })

    async function handleOpen() {
      if (typeof onBeforeOpen === 'function') {
        let goOn = await onBeforeOpen()
        if (goOn === false) return
      }
      setOpen(true)
    }

    function handleClose() {
      setOpen(false)
    }

    const handleInputChange: InputSelectProps['onChange'] = (v, options) => {
      onChange?.(v as DatePickerMultipleValue, options as { action: string })
    }

    const handleFormatter: InputSelectProps['formatter'] = (_v, options) => {
      const display = formatter
        ? formatter(undefined, options)
        : getDisplayValue({
            type: type,
            value: value,
            separator: separator
          })
      return display ?? ''
    }

    return (
      <>
        <Input.Select
          ref={comboRef}
          id={id}
          // Combo: Value & Display Value
          value={value}
          placeholder={placeholder}
          formatter={handleFormatter}
          autoSize={autoSize}
          separator={separator}
          // Combo: Status
          readOnly={readOnly}
          disabled={disabled}
          allowClear={allowClear}
          // Combo: Style
          style={style}
          className={className}
          // Combo: Elements
          leftIconRender={leftIconRender}
          leftIconSvg={leftIconSvg}
          rightIconRender={rightIconRender}
          rightIconSvg={rightIconSvg}
          clearRender={clearRender}
          // Events
          onChange={handleInputChange}
          onClick={handleOpen}
        />
        <MultipleModal
          ref={modalRef}
          // Modal: Value & Display Value
          value={value}
          type={type}
          min={min}
          max={max}
          hourStep={hourStep}
          minuteStep={minuteStep}
          // Modal: Status
          open={open}
          maskClosable={maskClosable}
          allowClear={allowClear}
          // Modal: Elements
          portal={portal}
          titleRender={titleRender}
          ok={ok}
          cancel={cancel}
          okVisible={okVisible}
          cancelVisible={cancelVisible}
          // Modal: Style
          safeArea={safeArea}
          modalStyle={modalStyle}
          modalClassName={modalClassName}
          maskStyle={maskStyle}
          maskClassName={maskClassName}
          // Events
          onClose={handleClose}
          onChange={onChange}
          onOk={onOk}
        />
      </>
    )
  }
)

export default MultipleCombo
