import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react'
import Main from './../Main'

import type {
  ListPaginationItem,
  ListPaginationMainRef,
  ListPaginationModalProps,
  ListPaginationModalRef
} from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import NavBarModal from './../../Modal/NavBarModal'
import type { ModalRef } from './../../Modal/types'
import type { ListChangeAction } from './../../List/types'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Modal } from 'lyrixi-mobile'
const NavBarModal = Modal.NavBarModal
测试使用-end */

// Modal
const Modal = forwardRef<ListPaginationModalRef, ListPaginationModalProps>(
  (
    {
      // Value & Display Value
      id,
      value,
      list,
      url,
      headers,
      payload,
      pagination,
      formatPayload,
      formatResponse,
      formatViewItem,

      // Status
      open,
      maskClosable,
      safeArea,
      errorRetry,
      emptyRetry,
      allowClear,
      multiple,
      checkable,
      topRefreshEnabled,
      bottomRefreshEnabled,
      virtual,

      // Style
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,
      itemStyle,
      itemClassName,
      itemLayout,
      checkboxVariant,
      checkboxPlacement,
      loadingModalStyle,
      loadingModalClassName,
      loadingMaskStyle,
      loadingMaskClassName,
      loadingPortal,

      // Elements
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
      onClose
    },
    ref
  ) => {
    let [currentValue, setCurrentValue] = useState<
      ListPaginationItem | ListPaginationItem[] | null
    >(() => value ?? null)
    const modalRef = useRef<ModalRef | null>(null)
    const mainRef = useRef<ListPaginationMainRef | null>(null)

    // 同步外部value到内部
    useEffect(() => {
      if (open) {
        setCurrentValue(value ?? null)
      }
    }, [open, value])

    useImperativeHandle(ref, () => {
      return {
        ...(modalRef.current ?? {}),
        ...(mainRef.current ?? {})
      } as ListPaginationModalRef
    })

    async function handleOk() {
      if (onOk) {
        let goOn = await onOk(currentValue)
        if (goOn === false) return false
        if (Array.isArray(goOn) || (goOn as ListPaginationItem)?.id) {
          currentValue = goOn as ListPaginationItem | ListPaginationItem[]
        }
      }
      const checked = (
        Array.isArray(currentValue) ? currentValue[0] : currentValue
      ) as ListPaginationItem
      onChange?.(currentValue, { currentItem: checked })
      onClose?.()
    }

    function handleChange(
      newValue: ListPaginationItem | ListPaginationItem[] | null,
      options?: { currentItem?: ListPaginationItem; action?: ListChangeAction }
    ) {
      setCurrentValue(newValue)
      if (!multiple) {
        const currentItem =
          options?.currentItem ??
          ((Array.isArray(newValue) ? newValue[0] : newValue) as ListPaginationItem)
        onChange?.(newValue, { action: options?.action, currentItem })
        onClose?.()
      }
    }

    function renderHeader() {
      if (typeof headerRender === 'function') {
        return headerRender({
          open: open,
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
        modalClassName={DOMUtil.classNames('lyrixi-modal-listpagination', modalClassName)}
        maskStyle={maskStyle}
        maskClassName={maskClassName}
        portal={portal}
        title={title}
        okVisible={multiple}
        cancel={cancel}
        cancelVisible={cancelVisible}
        onClose={onClose}
        onOk={handleOk}
      >
        {renderHeader()}

        {open && (
          <Main
            ref={mainRef}
            value={currentValue as ListPaginationModalProps['value']}
            url={url}
            headers={headers}
            payload={payload}
            pagination={pagination}
            formatPayload={formatPayload}
            formatResponse={formatResponse}
            formatViewItem={formatViewItem}
            errorRetry={errorRetry}
            emptyRetry={emptyRetry}
            allowClear={allowClear}
            multiple={multiple}
            checkable={checkable}
            topRefreshEnabled={topRefreshEnabled}
            bottomRefreshEnabled={bottomRefreshEnabled}
            virtual={virtual}
            itemRender={itemRender}
            loadingRender={loadingRender}
            prependRender={prependRender}
            appendRender={appendRender}
            itemStyle={itemStyle}
            itemClassName={itemClassName}
            itemLayout={itemLayout}
            checkboxVariant={checkboxVariant}
            checkboxPlacement={checkboxPlacement}
            loadingModalStyle={loadingModalStyle}
            loadingModalClassName={loadingModalClassName}
            loadingMaskStyle={loadingMaskStyle}
            loadingMaskClassName={loadingMaskClassName || 'lyrixi-mask-listpagination-loading'}
            loadingPortal={loadingPortal}
            onChange={handleChange}
          />
        )}
      </NavBarModal>
    )
  }
)
export default Modal
