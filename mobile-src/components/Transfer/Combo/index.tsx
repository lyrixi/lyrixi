import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react'
import Modal from './../Modal'

import type {
  TransferComboProps,
  TransferComboRef,
  TransferItem,
  TransferModalRef
} from './../types'

// 内库使用-start
import Input from './../../Input'
import type { InputSelectRef, InputSelectValue } from './../../Input/types'
// 内库使用-end

/* 测试使用-start
import { Input } from 'lyrixi-mobile'
测试使用-end */

// Transfer
const TransferCombo = forwardRef<TransferComboRef, TransferComboProps>(
  (
    {
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

      // Modal: Value & Display Value
      list,
      titles,
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
      onOk,
      onClose: userOnClose,

      // Events
      onChange,
      onBeforeOpen
    },
    ref
  ) => {
    const [open, setOpen] = useState(false)
    const comboRef = useRef<InputSelectRef | null>(null)
    const modalRef = useRef<TransferModalRef | null>(null)

    useImperativeHandle(ref, () => {
      return {
        ...(comboRef.current ?? {}),
        ...(modalRef.current ?? {}),
        close: () => setOpen(false),
        open: () => setOpen(true)
      } as TransferComboRef
    })

    async function handleOpen() {
      if (typeof onBeforeOpen === 'function') {
        const goOn = await onBeforeOpen()
        if (goOn === false) return
      }
      setOpen(true)
    }

    function handleClose() {
      setOpen(false)
      userOnClose?.()
    }

    function handleInputChange(v: unknown) {
      onChange?.(v as TransferItem[])
    }

    return (
      <>
        <Input.Select
          ref={comboRef}
          id={id}
          value={value as InputSelectValue}
          placeholder={placeholder}
          formatter={formatter}
          autoSize={autoSize}
          separator={separator}
          mode={mode}
          readOnly={readOnly}
          disabled={disabled}
          allowClear={allowClear}
          style={style}
          className={className}
          leftIconRender={leftIconRender}
          leftIconSvg={leftIconSvg}
          rightIconRender={rightIconRender}
          rightIconSvg={rightIconSvg}
          clearRender={clearRender}
          onChange={onChange ? handleInputChange : undefined}
          onClick={handleOpen}
        />
        <Modal
          ref={modalRef}
          value={value}
          list={list}
          titles={titles}
          open={open}
          maskClosable={maskClosable}
          allowClear={allowClear}
          portal={portal}
          title={title}
          ok={ok}
          cancel={cancel}
          okVisible={okVisible}
          cancelVisible={cancelVisible}
          safeArea={safeArea}
          modalStyle={modalStyle}
          modalClassName={modalClassName}
          maskStyle={maskStyle}
          maskClassName={maskClassName}
          onClose={handleClose}
          onChange={onChange ? (v: unknown) => onChange(v as TransferItem[]) : undefined}
          onOk={onOk}
        />
      </>
    )
  }
)

export default TransferCombo
