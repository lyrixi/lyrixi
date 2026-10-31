import React, { forwardRef } from 'react'
import Main from './../Main'

import type { ActionSheetModalProps } from './../types'
import type { ListItem } from './../../List/types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import Modal from './../../Modal/Modal'
import type { ModalRef } from './../../Modal/types'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Modal } from 'lyrixi-mobile'
测试使用-end */

const ActionSheetModal = forwardRef<ModalRef, ActionSheetModalProps>(
  (
    {
      // Value & Display Value
      id,
      value,
      list: externalList,

      // Status
      open = false,
      maskClosable = true,
      allowClear,

      // Style
      safeArea,
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,

      itemStyle,
      itemClassName,
      groupStyle,
      groupClassName,

      // Elements
      portal,
      title,
      cancel,
      cancelVisible,
      itemRender,

      // Events
      onChange,
      onCancel,
      onClose
    },
    ref
  ) => {
    // 点击选项
    function handleChange(item: ListItem) {
      let currentValue: ListItem | null = item
      if (allowClear) {
        if (item.id === value?.id) {
          currentValue = null
        }
      }

      if (onChange) onChange(currentValue)
      if (onClose) onClose()
    }

    return (
      <Modal
        id={id}
        ref={ref}
        // Status
        open={open}
        maskClosable={maskClosable}
        // Style
        portal={portal}
        safeArea={safeArea}
        animation="slideUp"
        modalStyle={modalStyle}
        modalClassName={DOMUtil.classNames('lyrixi-modal-actionsheet', modalClassName)}
        maskStyle={maskStyle}
        maskClassName={maskClassName}
        onClose={onClose}
      >
        <Main
          value={value}
          list={externalList}
          itemStyle={itemStyle}
          itemClassName={itemClassName}
          groupStyle={groupStyle}
          groupClassName={groupClassName}
          title={title}
          cancel={cancel}
          cancelVisible={cancelVisible}
          itemRender={itemRender}
          onChange={handleChange}
          onCancel={onCancel}
          onClose={onClose}
        />
      </Modal>
    )
  }
)

export default ActionSheetModal
