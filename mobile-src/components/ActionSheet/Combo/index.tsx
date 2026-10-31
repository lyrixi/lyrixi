import React, { useEffect, forwardRef, useState, useRef, useImperativeHandle } from 'react'
import Modal from './../Modal'

import type { ActionSheetComboRef, ActionSheetComboProps } from './../types'
import type { ListItem } from './../../List/types'

// 内库使用-start
import type { ComboRef } from './../../Combo/types'
import type { InputSelectRef, InputSelectValue } from './../../Input/types'
import Input from './../../Input'
import Combo from './../../Combo'
// 内库使用-end

/* 测试使用-start
import { Input } from 'lyrixi-mobile'
测试使用-end */

// 卡片选择
const ActionSheetCombo = forwardRef<ActionSheetComboRef, ActionSheetComboProps>(
  (
    {
      // Combo
      id,
      value,
      placeholder,
      formatter,
      autoSize,
      separator,
      mode,
      readOnly,
      disabled,
      allowClear,
      style,
      className,
      comboRender,
      children,
      leftIconRender,
      leftIconSvg,
      rightIconRender,
      rightIconSvg,
      clearRender,

      // Modal
      list,
      maskClosable,
      safeArea,
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,
      portal,
      title,
      cancel,
      cancelVisible,
      itemRender,

      // Events
      onBeforeOpen,
      onOpen,
      onClose,
      onClick,
      onChange
    },
    ref
  ) => {
    const [open, setOpen] = useState<boolean | null>(null)

    const comboRef = useRef<ComboRef | null>(null)

    useEffect(() => {
      if (typeof open !== 'boolean') return
      if (open) {
        onOpen?.()
      } else {
        onClose?.()
      }
      // eslint-disable-next-line
    }, [open])

    useImperativeHandle(ref, () => ({
      close: () => setOpen(false),
      open: () => setOpen(true)
    }))

    async function handleOpen(e: React.MouseEvent<HTMLDivElement>) {
      if (typeof onBeforeOpen === 'function') {
        const goOn = await onBeforeOpen()
        if (goOn === false) return
      }

      // 如果没有 list，则不打开
      if (!Array.isArray(list) || !list.length) {
        return
      }
      onClick?.(e)
      setOpen(true)
    }

    function handleClose() {
      setOpen(false)
    }

    function handleChange(newValue: ListItem | null) {
      if (onChange) {
        onChange(newValue)
      }
      setOpen(false)
    }

    // 获取 Combo 节点
    function renderCombo() {
      if (typeof comboRender === 'function') {
        return comboRender({
          comboRef,
          open: open ?? false,
          onClick: handleOpen
        })
      }

      // comboChildren
      if (children) {
        return (
          <Combo ref={comboRef} id={id} style={style} className={className} onClick={handleOpen}>
            {children}
          </Combo>
        )
      }

      // 默认使用 Input.Select
      return (
        <Input.Select
          ref={comboRef as React.Ref<InputSelectRef>}
          id={id}
          // Combo: Value & Display Value
          value={value as unknown as InputSelectValue}
          placeholder={placeholder}
          formatter={formatter}
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
          onChange={
            onChange
              ? (v: unknown) => {
                  onChange(v as ListItem | null)
                }
              : undefined
          }
          onClick={handleOpen}
        />
      )
    }

    return (
      <>
        {renderCombo()}
        <Modal
          // Modal: Value & Display Value
          value={value}
          list={list}
          // Modal: Status
          open={open ?? false}
          maskClosable={maskClosable}
          allowClear={allowClear}
          // Modal: Elements
          portal={portal}
          title={title}
          cancel={cancel}
          cancelVisible={cancelVisible}
          itemRender={itemRender}
          // Modal: Style
          safeArea={safeArea}
          modalStyle={modalStyle}
          modalClassName={modalClassName}
          maskStyle={maskStyle}
          maskClassName={maskClassName}
          // Events
          onClose={handleClose}
          onChange={handleChange}
        />
      </>
    )
  }
)

export default ActionSheetCombo
