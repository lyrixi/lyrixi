import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react'
import Modal from './../Modal'

import type { SelectComboProps, SelectComboRef, SelectItem, SelectModalRef } from './../types'

// 内库使用-start
import Input from './../../Input'
import type { InputSelectRef, InputSelectProps } from './../../Input/types'
import type { ListProps } from './../../List/types'
// 内库使用-end

/* 测试使用-start
import { Input } from 'lyrixi-mobile'
测试使用-end */

const SelectCombo = forwardRef<SelectComboRef, SelectComboProps>(
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
      // Combo: Value & Display Value
      multiple,
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
      // Combo
      // Combo: Value & Display Value
      formatViewItem,
      // Modal
      // Modal: Status
      maskClosable,
      // Combo
      // Combo: Value & Display Value
      checkable,
      // Modal
      // Modal: Status
      safeArea,
      // Modal: Style
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,
      // Combo
      // Combo: Value & Display Value
      checkboxVariant,
      checkboxPlacement,
      // Combo: Style
      itemStyle,
      itemClassName,
      // Combo: Value & Display Value
      itemLayout,
      // Modal
      // Modal: Elements
      portal,
      title,
      cancel,
      // Modal: Status
      cancelVisible,
      // Combo
      // Combo: Elements
      headerRender,
      itemRender,
      // Events
      onOk,
      onChange,
      onBeforeOpen
    },
    ref
  ) => {
    const [open, setOpen] = useState(false)
    const comboRef = useRef<InputSelectRef | null>(null)
    const modalRef = useRef<SelectModalRef | null>(null)

    useImperativeHandle(ref, () => {
      return {
        ...(comboRef.current ?? {}),
        ...(modalRef.current ?? {}),
        close: () => setOpen(false),
        open: () => setOpen(true)
      } as SelectComboRef
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
    }

    function handleChange(newValue: SelectItem | SelectItem[] | null) {
      onChange?.(newValue, undefined)
      setOpen(false)
    }

    const handleInputChange: InputSelectProps['onChange'] = (value, options) => {
      onChange?.(
        value as SelectItem | SelectItem[] | null,
        options as { action?: string; currentItem: SelectItem } | undefined
      )
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
        <Modal
          ref={modalRef}
          value={value as ListProps['value']}
          list={list}
          formatViewItem={formatViewItem}
          open={open}
          maskClosable={maskClosable}
          safeArea={safeArea}
          multiple={multiple}
          checkable={checkable}
          modalStyle={modalStyle}
          modalClassName={modalClassName}
          maskStyle={maskStyle}
          maskClassName={maskClassName}
          itemStyle={itemStyle}
          itemClassName={itemClassName}
          itemLayout={itemLayout}
          checkboxVariant={checkboxVariant}
          checkboxPlacement={checkboxPlacement}
          portal={portal}
          title={title}
          cancel={cancel}
          cancelVisible={cancelVisible}
          headerRender={headerRender}
          itemRender={itemRender}
          onOk={onOk}
          onChange={handleChange}
          onClose={handleClose}
        />
      </>
    )
  }
)

export default SelectCombo
