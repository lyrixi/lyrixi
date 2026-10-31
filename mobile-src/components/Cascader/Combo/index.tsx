import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react'
import type { CascaderItem } from './../types'
import CascaderModal from './../Modal'

import type { CascaderComboProps, CascaderComboRef } from '../types'

// 内库使用-start
import Input from './../../Input'
import type { InputSelectRef, InputSelectProps } from './../../Input/types'
// 内库使用-end

/* 测试使用-start
import { Input } from 'lyrixi-mobile'
测试使用-end */

// Cascader
const CascaderCombo = forwardRef<CascaderComboRef, CascaderComboProps>(
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
      loadData,
      // Modal: Status
      maskClosable,
      safeArea,
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
      searchVisible,
      // Events
      onSearch,
      onChange,
      onBeforeOpen
    },
    ref
  ) => {
    const [open, setOpen] = useState(false)
    const comboRef = useRef<InputSelectRef | null>(null)
    const modalRef = useRef<Record<string, unknown> | null>(null)

    useImperativeHandle(ref, () => {
      const c = (comboRef.current as Record<string, unknown> | null) ?? {}
      const m = modalRef.current ?? {}
      return {
        ...c,
        ...m,
        close: () => setOpen(false),
        open: () => setOpen(true)
      } as CascaderComboRef
    })

    async function handleOpen() {
      if (typeof onBeforeOpen === 'function') {
        const goOn = await onBeforeOpen()
        if (goOn === false) {
          return
        }
      }
      setOpen(true)
    }

    function handleClose() {
      setOpen(false)
    }

    const handleInputChange: InputSelectProps['onChange'] = (newValue) => {
      onChange?.(newValue as CascaderItem[])
    }

    return (
      <>
        <Input.Select
          ref={comboRef}
          id={id}
          value={value}
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
          onChange={handleInputChange}
          onClick={handleOpen}
        />
        <CascaderModal
          ref={modalRef}
          value={value as CascaderItem[]}
          list={list}
          loadData={loadData}
          open={open}
          maskClosable={maskClosable}
          allowClear={allowClear}
          portal={portal}
          title={title}
          ok={ok}
          cancel={cancel}
          okVisible={okVisible}
          cancelVisible={cancelVisible}
          searchVisible={searchVisible}
          safeArea={safeArea}
          modalStyle={modalStyle}
          modalClassName={modalClassName}
          maskStyle={maskStyle}
          maskClassName={maskClassName}
          onSearch={onSearch}
          onClose={handleClose}
          onChange={onChange as (v: CascaderItem[]) => void}
        />
      </>
    )
  }
)

export default CascaderCombo
