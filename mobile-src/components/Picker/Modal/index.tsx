import React, {
  useEffect,
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
  type Ref
} from 'react'
import Main from './../Main'
import listViewFormatter from './../Main/utils/listViewFormatter'
import formatValue from './../Main/utils/formatValue'

import type {
  PickerItem,
  PickerMainProps,
  PickerMainRef,
  PickerModalProps,
  PickerModalRef
} from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import NavBarModal from './../../Modal/NavBarModal'
import type { ModalRef } from '../../Modal/types'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Modal } from 'lyrixi-mobile'
const NavBarModal = Modal.NavBarModal
测试使用-end */

// Modal
const Modal = forwardRef<PickerModalRef, PickerModalProps>(
  (
    {
      // Value & Display Value
      id,
      value,
      list,

      // Status
      open,
      maskClosable,
      allowClear,

      // Style
      safeArea,
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,

      // Elements
      portal,
      title,
      ok,
      cancel,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      okVisible,
      cancelVisible,

      // Events
      onClose,
      onOk,
      onChange
    },
    ref: Ref<PickerModalRef>
  ) => {
    let [currentValue, setCurrentValue] = useState<PickerItem[] | null>(() =>
      formatValue(value, listViewFormatter(list))
    )

    const modalRef = useRef<ModalRef | null>(null)

    const mainRef = useRef<PickerMainRef | null>(null)

    // 同步外部value到内部
    useEffect(() => {
      setCurrentValue(formatValue(value, listViewFormatter(list)))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    useImperativeHandle(ref, () => {
      return {
        ...(modalRef.current ?? {}),
        ...(mainRef.current ?? {})
      } as PickerModalRef
    })

    async function handleOk() {
      // 触发 onOk
      if (onOk) {
        let goOn = await onOk(currentValue ?? [])
        if (goOn === false) return false
        if (goOn instanceof Date) {
          currentValue = goOn as unknown as PickerItem[]
        }
      }

      onChange?.(currentValue ?? [])
      onClose?.()
    }

    function handleChange(newValue: PickerItem[]) {
      setCurrentValue(newValue)
    }

    return (
      <NavBarModal
        id={id}
        ref={modalRef}
        // Status
        open={open}
        maskClosable={maskClosable}
        // Style
        safeArea={safeArea}
        modalStyle={modalStyle}
        modalClassName={DOMUtil.classNames('lyrixi-modal-picker', modalClassName)}
        maskStyle={maskStyle}
        maskClassName={maskClassName}
        // Elements
        portal={portal}
        title={title}
        ok={ok}
        cancel={cancel}
        okVisible={true}
        cancelVisible={cancelVisible}
        // Events
        onClose={onClose}
        onOk={handleOk}
      >
        {/* 弹窗打开时, 再渲染主页面, 主要为了重置鼠标拖动标识 */}
        <Main
          ref={mainRef}
          // Modal: Status
          open={open}
          // Value & Display Value
          value={currentValue as PickerMainProps['value']}
          list={list as PickerMainProps['list']}
          // Status
          allowClear={allowClear}
          // Events
          onChange={handleChange}
        />
      </NavBarModal>
    )
  }
)
export default Modal
