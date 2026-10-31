import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  type Ref
} from 'react'
import { formatType } from './../DistrictMain/utils'
import updateOkVisible from './updateOkVisible'
import DistrictMain from './../DistrictMain'
import type { CascaderItem } from './../types'

import type { CascaderDistrictModalMainHandle, CascaderDistrictModalProps } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import NavBarModal from './../../Modal/NavBarModal'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Modal } from 'lyrixi-mobile'
const NavBarModal = Modal.NavBarModal
测试使用-end */

const DistrictModal = forwardRef<Record<string, unknown>, CascaderDistrictModalProps>(
  (
    {
      // Value & Display Value
      value,

      // Main
      // Main: Value & Display Value
      type: externalType = 'street',
      loadCountries,
      loadCountryRegions,
      loadStreets,
      min = '',

      // Status
      open,

      // Modal
      // Modal: Status
      maskClosable,
      safeArea,

      // Main: Style
      listStyle,
      listClassName,
      itemStyle,
      itemClassName,

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

      // Main: Status
      searchVisible,

      // Modal: Status
      cancelVisible,

      // Events
      onClose,
      onOk,
      onChange
    },
    ref
  ) => {
    const districtType = formatType(externalType)

    const [okVisible, setOkVisible] = useState(false)

    const [currentValue, setCurrentValue] = useState<CascaderItem[] | null | undefined>(
      value as CascaderItem[] | null | undefined
    )

    const modalRef = useRef<unknown>(null)

    const mainRef = useRef<CascaderDistrictModalMainHandle | null>(null)

    useEffect(() => {
      setCurrentValue(value as CascaderItem[] | null | undefined)
    }, [value])

    useEffect(() => {
      setOkVisible(updateOkVisible(currentValue, min))
    }, [currentValue, min])

    useImperativeHandle(ref, () => {
      const a = (modalRef.current as Record<string, unknown> | null) ?? {}
      const b = (mainRef.current as Record<string, unknown> | null) ?? {}
      return { ...a, ...b }
    })

    function handleDrillDown(tabs: CascaderItem[] | null | undefined) {
      setOkVisible(updateOkVisible(tabs, min))
    }

    async function handleOk() {
      if (onOk) {
        const goOn = await onOk(currentValue)
        if (goOn === false) {
          return false
        }
      }

      onChange?.((currentValue ?? []) as CascaderItem[])
      onClose?.()
    }

    function handleChange(newValue: CascaderItem[]) {
      setCurrentValue(newValue)
      handleDrillDown(newValue)

      if (!Array.isArray(newValue) || !newValue.length) {
        return
      }
      const last = newValue[newValue.length - 1]
      // 选中末级节点
      if (last?.isLeaf || (Array.isArray(last?.type) && last.type.includes(districtType))) {
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
        okVisible={okVisible}
        cancel={cancel}
        cancelVisible={cancelVisible}
        onClose={onClose}
        onOk={handleOk}
      >
        {open && (
          <DistrictMain
            ref={mainRef as Ref<CascaderDistrictModalMainHandle> as never}
            open={open}
            value={currentValue}
            type={districtType}
            loadCountries={loadCountries}
            loadCountryRegions={loadCountryRegions}
            loadStreets={loadStreets}
            listStyle={listStyle}
            listClassName={listClassName}
            itemStyle={itemStyle}
            itemClassName={itemClassName}
            searchVisible={searchVisible}
            onChange={handleChange}
          />
        )}
      </NavBarModal>
    )
  }
)
export default DistrictModal
