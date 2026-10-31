import React, { forwardRef, useState, useRef, useImperativeHandle, type Ref } from 'react'
import Modal from './../Modal'
import type { PickerComboProps, PickerComboRef, PickerItem, PickerModalRef } from '../types'

// 内库使用-start
import Input from './../../Input'
import type { InputSelectProps, InputSelectRef } from './../../Input/types'
// 内库使用-end

/* 测试使用-start
import { Input } from 'lyrixi-mobile'
测试使用-end */

// Picker
const PickerCombo = forwardRef<PickerComboRef, PickerComboProps>(
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
      mode,
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
      list,
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
      title,
      ok,
      cancel,
      okVisible,
      cancelVisible,

      // Events
      onChange,
      onBeforeOpen
    },
    ref: Ref<PickerComboRef>
  ) => {
    const [open, setOpen] = useState(false)
    const comboRef = useRef<InputSelectRef | null>(null)
    const modalRef = useRef<PickerModalRef | null>(null)

    useImperativeHandle(ref, () => {
      return {
        ...(comboRef.current ?? {}),
        ...(modalRef.current ?? {}),
        close: () => setOpen(false),
        open: () => setOpen(true)
      } as PickerComboRef
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

    const handleInputChange: InputSelectProps['onChange'] = (newValue) => {
      onChange?.(newValue as PickerItem[])
    }

    return (
      <>
        <Input.Select
          ref={comboRef}
          id={id}
          // Combo: Value & Display Value
          value={value}
          placeholder={placeholder}
          formatter={formatter as InputSelectProps['formatter']}
          autoSize={autoSize}
          separator={separator}
          mode={mode}
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
        <Modal
          ref={modalRef}
          // Modal: Value & Display Value
          value={value}
          list={list}
          // Modal: Status
          open={open}
          maskClosable={maskClosable}
          allowClear={allowClear}
          // Modal: Elements
          portal={portal}
          title={title}
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
        />
      </>
    )
  }
)

export default PickerCombo
