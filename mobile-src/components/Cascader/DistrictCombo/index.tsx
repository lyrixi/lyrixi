import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { formatType } from './../DistrictMain/utils'
import DistrictModal from './../DistrictModal'
import type { CascaderItem } from './../types'

import type { CascaderDistrictComboProps, CascaderDistrictComboRef } from '../types'

// 内库使用-start
import Input from './../../Input'
import type { InputSelectProps, InputSelectRef } from './../../Input/types'
// 内库使用-end

/* 测试使用-start
import { Input } from 'lyrixi-mobile'
测试使用-end */

// 级联选择
const DistrictCombo = forwardRef<CascaderDistrictComboRef, CascaderDistrictComboProps>(
  (
    {
      // Combo
      // Combo: Value & Display Value
      id,
      value,
      placeholder,
      autoSize,
      mode,
      // Combo: Status
      readOnly,
      disabled,
      allowClear,
      // Combo: Style
      style,
      className,
      // Combo: Value & Display Value
      formatter,
      separator,
      // Combo: Elements
      leftIconRender,
      leftIconSvg,
      rightIconRender,
      rightIconSvg,
      clearRender,
      // Modal
      // Modal: Value & Display Value
      type: externalType = 'street',
      // Combo
      // Combo: Value & Display Value
      loadCountries,
      loadCountryRegions,
      loadStreets,
      min = '',
      // Modal
      // Modal: Status
      maskClosable,
      // Combo
      // Combo: Style
      listStyle,
      listClassName,
      itemStyle,
      itemClassName,
      // Modal
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
      cancelVisible,
      searchVisible,
      // Events
      onChange,
      onBeforeOpen
    },
    ref
  ) => {
    const districtType = formatType(externalType)

    const [open, setOpen] = useState(false)
    const comboRef = useRef<InputSelectRef | null>(null)
    const modalRef = useRef<Record<string, unknown> | null>(null)

    useImperativeHandle(ref, () => {
      const c = (comboRef.current as Record<string, unknown> | null) ?? {}
      const m = (modalRef.current as Record<string, unknown> | null) ?? {}
      return {
        ...c,
        ...m,
        close: () => setOpen(false),
        open: () => setOpen(true)
      } as CascaderDistrictComboRef
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
      onChange?.(newValue as CascaderItem[])
    }

    return (
      <>
        <Input.Select
          ref={comboRef}
          id={id}
          value={value}
          placeholder={placeholder}
          autoSize={autoSize}
          mode={mode}
          readOnly={readOnly}
          disabled={disabled}
          allowClear={allowClear}
          style={style}
          className={className}
          formatter={formatter as InputSelectProps['formatter']}
          separator={separator}
          leftIconRender={leftIconRender}
          leftIconSvg={leftIconSvg}
          rightIconRender={rightIconRender}
          rightIconSvg={rightIconSvg}
          clearRender={clearRender}
          onChange={handleInputChange}
          onClick={handleOpen}
        />
        <DistrictModal
          ref={modalRef}
          value={value as CascaderItem[] | null}
          type={districtType}
          loadCountries={loadCountries}
          loadCountryRegions={loadCountryRegions}
          loadStreets={loadStreets}
          open={open}
          min={min}
          maskClosable={maskClosable}
          listStyle={listStyle}
          listClassName={listClassName}
          itemStyle={itemStyle}
          itemClassName={itemClassName}
          modalStyle={modalStyle}
          modalClassName={modalClassName}
          maskStyle={maskStyle}
          maskClassName={maskClassName}
          portal={portal}
          title={title}
          ok={ok}
          cancel={cancel}
          cancelVisible={cancelVisible}
          searchVisible={searchVisible}
          onChange={onChange as (v: CascaderItem[]) => void}
          onClose={handleClose}
        />
      </>
    )
  }
)

export default DistrictCombo
