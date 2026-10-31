import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react'
import Modal from './../Modal'

import type {
  ListPaginationComboProps,
  ListPaginationComboRef,
  ListPaginationItem,
  ListPaginationModalRef
} from './../types'

// 内库使用-start
import Input from './../../Input'
import type { InputSelectProps, InputSelectRef } from './../../Input/types'
import type { ListChangeAction } from './../../List/types'
// 内库使用-end

/* 测试使用-start
import { Input } from 'lyrixi-mobile'
测试使用-end */

const Combo = forwardRef<ListPaginationComboRef, ListPaginationComboProps>(
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
      url,
      headers,
      payload,
      pagination,
      formatPayload,
      formatResponse,
      formatViewItem,
      // Modal: Status
      maskClosable,
      errorRetry,
      emptyRetry,
      multiple,
      checkable = true,
      topRefreshEnabled,
      bottomRefreshEnabled,
      virtual,
      // Modal: Style
      safeArea,
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,
      checkboxVariant,
      checkboxPlacement,
      itemStyle,
      itemClassName,
      itemLayout,
      loadingModalStyle,
      loadingModalClassName,
      loadingMaskStyle,
      loadingMaskClassName,
      loadingPortal,
      // Modal: Elements
      portal,
      title,
      cancel,
      cancelVisible,
      headerRender,
      itemRender,
      loadingRender,
      prependRender,
      appendRender,

      // Events
      onOk,
      onChange,
      onBeforeOpen
    },
    ref
  ) => {
    const [open, setOpen] = useState(false)
    const comboRef = useRef<InputSelectRef | null>(null)
    const modalRef = useRef<ListPaginationModalRef | null>(null)

    useImperativeHandle(ref, () => {
      return {
        ...(comboRef.current ?? {}),
        ...(modalRef.current ?? {}),
        close: () => setOpen(false),
        open: () => setOpen(true)
      } as ListPaginationComboRef
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

    function handleChange(
      newValue: ListPaginationItem | ListPaginationItem[] | null,
      _options?: { currentItem?: ListPaginationItem; action?: ListChangeAction }
    ) {
      const currentItem =
        _options?.currentItem ??
        ((Array.isArray(newValue) ? newValue[0] : newValue) as ListPaginationItem)
      onChange?.(newValue, { action: _options?.action, currentItem })
      setOpen(false)
    }

    const handleInputChange: InputSelectProps['onChange'] = (newValue) => {
      onChange?.(newValue as ListPaginationItem | ListPaginationItem[] | null)
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
          url={url}
          headers={headers}
          payload={payload}
          pagination={pagination}
          formatPayload={formatPayload}
          formatResponse={formatResponse}
          formatViewItem={formatViewItem}
          // Modal: Status
          open={open}
          maskClosable={maskClosable}
          safeArea={safeArea}
          errorRetry={errorRetry}
          emptyRetry={emptyRetry}
          allowClear={allowClear}
          multiple={multiple}
          checkable={checkable}
          topRefreshEnabled={topRefreshEnabled}
          bottomRefreshEnabled={bottomRefreshEnabled}
          virtual={virtual}
          // Style
          modalStyle={modalStyle}
          modalClassName={modalClassName}
          maskStyle={maskStyle}
          maskClassName={maskClassName}
          itemStyle={itemStyle}
          itemClassName={itemClassName}
          itemLayout={itemLayout}
          checkboxVariant={checkboxVariant}
          checkboxPlacement={checkboxPlacement}
          loadingModalStyle={loadingModalStyle}
          loadingModalClassName={loadingModalClassName}
          loadingMaskStyle={loadingMaskStyle}
          loadingMaskClassName={loadingMaskClassName}
          loadingPortal={loadingPortal}
          // Modal: Elements
          portal={portal}
          title={title}
          cancel={cancel}
          cancelVisible={cancelVisible}
          headerRender={headerRender}
          itemRender={itemRender}
          loadingRender={loadingRender}
          prependRender={prependRender}
          appendRender={appendRender}
          // Events
          onOk={onOk}
          onChange={handleChange}
          onClose={handleClose}
        />
      </>
    )
  }
)
export default Combo
