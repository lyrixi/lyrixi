import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react'
import TreeModal from '../Modal'

import type { TreeComboProps, TreeComboRef, TreeItem } from '../types'

// 内库使用-start
import Input from '../../Input'
import type { InputSelectRef, InputSelectProps } from '../../Input/types'
// 内库使用-end

const TreeCombo = forwardRef<TreeComboRef, TreeComboProps>(
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
      // Modal
      // Modal: Value & Display Value
      list,
      loadData,
      loadSearchData,
      defaultParentAvatarSvg,
      defaultParentAvatarUrl,
      defaultLeafAvatarSvg,
      defaultLeafAvatarUrl,
      formatViewItem,
      // Modal: Status
      multiple = true,
      checkable,
      virtual,
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
      cancel,
      cancelVisible,
      searchVisible,
      searchAction,
      searchNodeTitle,
      searchGroupTitle,
      // Events
      onChange,
      onBeforeOpen
    },
    ref
  ) => {
    const [open, setOpen] = useState(false)
    const comboRef = useRef<InputSelectRef | null>(null)
    const modalRef = useRef<Record<string, unknown> | null>(null)

    useImperativeHandle(ref, () => {
      const comboHandle = (comboRef.current as Record<string, unknown> | null) ?? {}
      const modalHandle = modalRef.current ?? {}
      return {
        ...comboHandle,
        ...modalHandle,
        close: () => setOpen(false),
        open: () => setOpen(true)
      } as TreeComboRef
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
      onChange?.(newValue as TreeItem | TreeItem[] | null)
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
        <TreeModal
          ref={modalRef}
          value={value}
          list={list}
          loadData={loadData}
          loadSearchData={loadSearchData}
          defaultParentAvatarSvg={defaultParentAvatarSvg}
          defaultParentAvatarUrl={defaultParentAvatarUrl}
          defaultLeafAvatarSvg={defaultLeafAvatarSvg}
          defaultLeafAvatarUrl={defaultLeafAvatarUrl}
          formatViewItem={formatViewItem}
          multiple={multiple}
          checkable={checkable}
          virtual={virtual}
          open={open}
          maskClosable={maskClosable}
          allowClear={allowClear}
          portal={portal}
          title={title}
          cancel={cancel}
          cancelVisible={cancelVisible}
          searchVisible={searchVisible}
          searchAction={searchAction}
          searchNodeTitle={searchNodeTitle}
          searchGroupTitle={searchGroupTitle}
          safeArea={safeArea}
          modalStyle={modalStyle}
          modalClassName={modalClassName}
          maskStyle={maskStyle}
          maskClassName={maskClassName}
          onClose={handleClose}
          onChange={onChange}
        />
      </>
    )
  }
)

export default TreeCombo
