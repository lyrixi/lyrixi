import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react'
import Main from './../Main'

import type { SelectItem, SelectMainRef, SelectModalProps, SelectModalRef } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import NavBarModal from './../../../components/Modal/NavBarModal'
import type { ListProps, ListItem } from './../../List/types'
import type { ModalRef } from './../../Modal/types'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Modal } from 'lyrixi-mobile'
const NavBarModal = Modal.NavBarModal
测试使用-end */

const Modal = forwardRef<SelectModalRef, SelectModalProps>(
  (
    {
      // Value & Display Value
      id,
      value,

      // Main
      // Main: Value & Display Value
      list,
      formatViewItem,
      multiple,
      checkable,
      itemLayout,
      checkboxVariant,
      checkboxPlacement,

      // Status
      open,

      // Modal
      // Modal: Status
      maskClosable,
      safeArea,

      // Main: Style
      itemStyle,
      itemClassName,

      // Modal: Style
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,

      // Main: Elements
      headerRender,
      itemRender,

      // Modal: Elements
      portal,
      title,
      cancel,

      // Modal: Status
      cancelVisible,

      // Events
      onOk,
      onChange,
      onClose
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState<SelectItem | SelectItem[] | null | undefined>(
      value
    )
    const modalRef = useRef<ModalRef | null>(null)
    const mainRef = useRef<SelectMainRef | null>(null)

    useEffect(() => {
      if (open) {
        setCurrentValue(value)
      }
    }, [open, value])

    useImperativeHandle(ref, () => {
      return {
        ...(modalRef.current ?? {}),
        ...(mainRef.current ?? {})
      } as SelectModalRef
    })

    async function handleConfirm() {
      let next: SelectItem | SelectItem[] | null | undefined = currentValue
      if (typeof onOk === 'function') {
        const goOn = await onOk(currentValue ?? null)
        if (goOn === false) return false
        if (
          goOn instanceof Array ||
          (goOn !== null && goOn !== undefined && typeof goOn === 'object' && 'id' in goOn)
        ) {
          next = goOn as SelectItem | SelectItem[] | null
          setCurrentValue(next)
        }
      }
      onChange?.(next ?? null, undefined)
      onClose?.()
    }

    function handleChange(
      newValue: ListItem | ListItem[] | null,
      options?: { action?: string; currentItem: ListItem }
    ) {
      const nextValue = newValue as SelectItem | SelectItem[] | null
      setCurrentValue(nextValue)
      if (!multiple) {
        onChange?.(
          nextValue,
          options ? { ...options, currentItem: options.currentItem as SelectItem } : undefined
        )
        onClose?.()
      }
    }

    function renderHeader() {
      if (typeof headerRender === 'function') {
        return headerRender({
          open: open ?? false,
          value: value,
          list: list
        })
      }
      return null
    }

    return (
      <NavBarModal
        id={id}
        ref={modalRef}
        open={open}
        maskClosable={maskClosable}
        safeArea={safeArea}
        modalStyle={modalStyle}
        modalClassName={DOMUtil.classNames('lyrixi-modal-select', modalClassName)}
        maskStyle={maskStyle}
        maskClassName={maskClassName}
        portal={portal}
        title={title}
        okVisible={multiple}
        cancel={cancel}
        cancelVisible={cancelVisible}
        onClose={onClose}
        onOk={handleConfirm}
      >
        {renderHeader()}

        <Main
          ref={mainRef}
          multiple={multiple}
          checkable={checkable}
          value={currentValue as ListProps['value']}
          list={list as ListProps['list']}
          formatViewItem={formatViewItem}
          itemRender={itemRender}
          itemStyle={itemStyle}
          itemClassName={itemClassName}
          itemLayout={itemLayout}
          checkboxVariant={checkboxVariant}
          checkboxPlacement={checkboxPlacement}
          onChange={handleChange}
        />
      </NavBarModal>
    )
  }
)

export default Modal
