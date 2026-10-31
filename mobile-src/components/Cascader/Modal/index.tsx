import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
  type Ref
} from 'react'
import type { CascaderMainRef, CascaderModalProps, CascaderItem } from '../types'
import Main from './../Main'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import NavBarModal from './../../Modal/NavBarModal'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Modal } from 'lyrixi-mobile'
const NavBarModal = Modal.NavBarModal
测试使用-end */

// Modal
const CascaderModal = forwardRef<Record<string, unknown>, CascaderModalProps>(
  (
    {
      // Value & Display Value
      value,

      // Main
      // Main: Value & Display Value
      list,
      loadData,

      // Status
      open,

      // Modal
      // Modal: Status
      maskClosable,
      safeArea,

      // Main: Status
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      allowClear: _allowClear,
      searchVisible,

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

      // Events
      onClose,
      onOk,
      onSearch,
      onChange
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState<CascaderItem[] | null | undefined>(value)

    const modalRef = useRef<unknown>(null)

    const mainRef = useRef<CascaderMainRef | null>(null)

    useEffect(() => {
      setCurrentValue(value)
    }, [value])

    useImperativeHandle(ref, () => {
      const a = (modalRef.current as Record<string, unknown> | null) ?? {}
      const b = (mainRef.current as CascaderMainRef | null) ?? ({} as CascaderMainRef)
      return { ...a, ...b } as Record<string, unknown>
    })

    async function handleOk() {
      if (onOk) {
        const goOn = await onOk(currentValue)
        if (goOn === false) {
          return false
        }
        if (goOn instanceof Date) {
          // legacy: Date return path kept for API compat
        }
      }

      if (onChange) {
        onChange((currentValue ?? []) as CascaderItem[])
      }
      onClose?.()
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function handleChange(newValue: CascaderItem[], _newArguments?: unknown) {
      setCurrentValue(newValue)

      const lastTab =
        Array.isArray(newValue) && newValue.length ? newValue[newValue.length - 1] : null
      if (lastTab?.isLeaf) {
        onChange?.(newValue)
        onClose?.()
      }
    }

    return (
      <NavBarModal
        ref={modalRef as Ref<unknown> as never}
        open={open}
        maskClosable={maskClosable}
        safeArea={safeArea}
        modalStyle={modalStyle}
        modalClassName={DOMUtil.classNames('lyrixi-modal-cascader', modalClassName)}
        maskStyle={maskStyle}
        maskClassName={maskClassName}
        portal={portal}
        title={title}
        ok={ok}
        cancel={cancel}
        okVisible={okVisible}
        cancelVisible={cancelVisible}
        onClose={onClose}
        onOk={handleOk}
      >
        {open && (
          <Main
            ref={mainRef}
            value={currentValue ?? undefined}
            searchVisible={searchVisible}
            list={list ?? undefined}
            loadData={loadData}
            onSearch={onSearch}
            onChange={handleChange as (v: CascaderItem[]) => void}
          />
        )}
      </NavBarModal>
    )
  }
)
export default CascaderModal
