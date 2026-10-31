import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
  type Ref
} from 'react'
import Main from '../Main'

import type { TreeItem, TreeMainRef, TreeModalProps, TreeModalRef } from '../types'

// 内库使用-start
import DOMUtil from '../../../utils/DOMUtil'
import NavBarModal from '../../Modal/NavBarModal'
// 内库使用-end

const TreeModal = forwardRef<TreeModalRef, TreeModalProps>(
  (
    {
      // Value & Display Value
      id,
      value,

      // Main
      // Main: Value & Display Value
      list,
      loadData,
      loadSearchData,
      defaultParentAvatarSvg,
      defaultParentAvatarUrl,
      defaultLeafAvatarSvg,
      defaultLeafAvatarUrl,
      formatViewItem,

      // Status
      open,
      multiple = true,
      checkable,
      virtual,
      maskClosable,
      safeArea,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      allowClear: _allowClear,
      searchVisible,
      searchAction,

      // Modal: Style
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,

      // Modal: Elements
      portal,
      title,
      searchNodeTitle,
      searchGroupTitle,
      ok,
      cancel,
      cancelVisible,

      // Events
      onClose,
      onOk,
      onChange
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState<TreeItem | TreeItem[] | null>(
      () => value ?? (multiple ? [] : null)
    )
    const modalRef = useRef<unknown>(null)
    const mainRef = useRef<TreeMainRef | null>(null)

    useEffect(() => {
      if (open) {
        setCurrentValue(value ?? (multiple ? [] : null))
      }
    }, [open, value, multiple])

    useImperativeHandle(ref, () => {
      const modalHandle = (modalRef.current as Record<string, unknown> | null) ?? {}
      const mainHandle = (mainRef.current as Record<string, unknown> | null) ?? {}
      return { ...modalHandle, ...mainHandle } as TreeModalRef
    })

    async function handleFooterOk() {
      if (onOk) {
        const goOn = await onOk(currentValue)
        if (goOn === false) {
          return
        }
      }
      onChange?.(currentValue)
      onClose?.()
    }

    function handleChange(newValue: TreeItem | TreeItem[] | null) {
      setCurrentValue(newValue)
      if (!multiple) {
        onChange?.(newValue)
        onClose?.()
      }
    }

    return (
      <NavBarModal
        id={id}
        ref={modalRef as Ref<unknown> as never}
        open={open}
        maskClosable={maskClosable}
        safeArea={safeArea}
        modalStyle={modalStyle}
        modalClassName={DOMUtil.classNames('lyrixi-modal-tree', modalClassName)}
        maskStyle={maskStyle}
        maskClassName={maskClassName}
        portal={portal}
        title={title}
        okVisible={false}
        cancel={cancel}
        cancelVisible={cancelVisible}
        onClose={onClose}
      >
        {open ? (
          <Main
            ref={mainRef}
            value={currentValue}
            list={list ?? undefined}
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
            searchVisible={searchVisible}
            searchAction={searchAction}
            searchNodeTitle={searchNodeTitle}
            searchGroupTitle={searchGroupTitle}
            ok={ok}
            onChange={handleChange}
            onOk={multiple ? handleFooterOk : undefined}
          />
        ) : null}
      </NavBarModal>
    )
  }
)

export default TreeModal
