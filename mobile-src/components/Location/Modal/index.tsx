import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import Main from './../Main'

import type { LocationMainRef, LocationModalProps, LocationModalRef, LocationValue } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import LocaleUtil from './../../../utils/LocaleUtil'
import NavBarModal from './../../Modal/NavBarModal'
import type { ModalRef, ModalProps } from './../../Modal/types'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, LocaleUtil, Modal, SafeArea } from 'lyrixi-mobile'
const NavBarModal = Modal.NavBarModal
测试使用-end */

const LocationModal = forwardRef<LocationModalRef, LocationModalProps>(
  (
    {
      // Value & Display Value
      id,
      value,

      // Status
      open,

      // Modal
      // Modal: Status
      maskClosable,
      safeArea,

      // Modal: Style
      modalClassName,
      modalStyle,
      maskStyle,
      maskClassName,

      // Modal: Elements
      portal,

      // Main
      // Main: Value & Display Value
      cacheDuration,
      multiple,
      mapConfig,
      getLocation,
      getAddress,

      // Main: Status
      allowClear,
      nearbyVisible,

      // Events
      onOk,
      onChange,
      onClose
    },
    ref
  ) => {
    const modalRef = useRef<ModalRef | null>(null)
    const mainRef = useRef<LocationMainRef | null>(null)

    let [currentValue, setCurrentValue] = useState<LocationValue | null>(value ?? null)

    const modalOpen = open === 'choose' || open === 'preview'

    async function handleOk() {
      if (onOk) {
        const goOn = await onOk(currentValue)
        if (goOn === false) return false
        if (goOn instanceof Date) {
          currentValue = goOn as unknown as LocationValue
        }
      }

      onChange?.(currentValue)
      onClose?.()
    }

    async function handleClear() {
      currentValue = null
      handleOk()
    }

    function handleChange(newValue: LocationValue | null) {
      setCurrentValue(newValue)
      if (multiple === false) {
        if (onChange) {
          onChange(newValue)
        }
        onClose?.()
      }
    }

    useEffect(() => {
      if (open) {
        setCurrentValue(value ?? null)
      }
    }, [open, value])

    useImperativeHandle(ref, () => {
      return {
        ...(modalRef.current || {}),
        ...(mainRef.current || {})
      } as LocationModalRef
    })

    return (
      <NavBarModal
        id={id}
        ref={modalRef}
        open={modalOpen}
        maskClosable={maskClosable}
        safeArea={safeArea}
        modalStyle={modalStyle}
        modalClassName={DOMUtil.classNames('lyrixi-map-modal', modalClassName)}
        maskStyle={maskStyle}
        maskClassName={maskClassName}
        portal={portal as ModalProps['portal']}
        title={
          open === 'choose'
            ? (LocaleUtil.locale(
                '选择地址',
                'lyrixi_09365b9f2bfaf322a81c4e8c4e24f8fa'
              ) as React.ReactNode)
            : (LocaleUtil.locale(
                '查看地址',
                'lyrixi_f3b2bedbe2cae85daf7e3ad3a9d999ec'
              ) as React.ReactNode)
        }
        okVisible={open === 'choose' && !allowClear ? true : false}
        onClose={onClose ? () => onClose() : undefined}
        onOk={handleOk}
      >
        <Main
          ref={mainRef}
          value={currentValue}
          cacheDuration={cacheDuration}
          open={open}
          nearbyVisible={nearbyVisible}
          mapConfig={mapConfig}
          getLocation={getLocation}
          getAddress={getAddress}
          onChange={handleChange}
          onOk={allowClear ? handleOk : null}
          onClear={allowClear ? handleClear : null}
        />
      </NavBarModal>
    )
  }
)

export default LocationModal
