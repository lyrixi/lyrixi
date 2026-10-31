import React, { useRef, useEffect, useState } from 'react'
import Dropdown from './../Dropdown'
import DateRange from './DateRange'

import type { ToolBarDateRangeBarProps, ToolBarDropdownRef } from './../types'

// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
import LocaleUtil from './../../../utils/LocaleUtil'
import DatePicker from './../../DatePicker'
import FooterBar from './../../FooterBar'
import getDisplayValue from './../../DatePicker/RangeCombo/getDisplayValue'
import type { DatePickerRangesMap, DatePickerRangeChangeMeta } from './../../DatePicker/types'
// 内库使用-end

/* 测试使用-start
import { DateUtil, LocaleUtil, DatePicker, FooterBar } from 'lyrixi-mobile'
测试使用-end */

// 日期区间
function DateRangeBar({
  // Value & Display Value
  id,
  value: externalValue,
  rangeId: externalRangeId,
  type = 'date',
  placeholder = '',

  // Status
  allowClear,

  // Style
  direction,
  block,
  color,
  variant,
  size,
  square,
  fontSize,
  radius = 'm',
  style,
  className,

  maskStyle,
  maskClassName,
  modalStyle,
  modalClassName,

  // Elements
  comboRender,
  children,
  arrowRender,
  arrowSvg,
  portal,
  min,
  max,
  ranges: rangesIn,

  // Events
  onOk,
  onChange
}: ToolBarDateRangeBarProps) {
  let ranges: DatePickerRangesMap | undefined = rangesIn
  if (ranges === undefined) {
    // eslint-disable-next-line
    ranges = DatePicker.getDefaultRanges()
  }

  const [rangeId, setRangeId] = useState<string | null | undefined>(externalRangeId)
  const [value, setValue] = useState<(Date | null)[] | null | undefined>(externalValue)
  const dropdownRef = useRef<ToolBarDropdownRef | null>(null)

  useEffect(() => {
    init()
    // eslint-disable-next-line
  }, [externalRangeId, externalValue])

  function rangeTupleEquals(
    a: (Date | null)[] | null | undefined,
    b: (Date | null)[] | null | undefined
  ): boolean {
    if ((a === null || a === undefined) && (b === null || b === undefined)) return true
    if (!a || !b || a.length !== 2 || b.length !== 2) return false
    if (!a[0] || !a[1] || !b[0] || !b[1]) return false
    return DateUtil.compareRange(a as [Date, Date], b as [Date, Date], type) === 0
  }

  // 初始化
  function init() {
    let nextExternalRangeId: string | null | undefined = externalRangeId
    // 外部未传入rangeId, 则根据value获取rangeId
    if (!externalRangeId && externalValue) {
      const ext = externalValue
      const rangeForId =
        ext && ext[0] && ext[1] && rangeId && ranges && (ranges as Record<string, unknown>)[rangeId]
      // 如果有rangeId, 判断日期是否一致, 一致则使用rangeId
      if (
        rangeForId &&
        DateUtil.compareRange(
          ext as [Date, Date],
          (ranges as Record<string, [Date, Date]>)[rangeId!] as [Date, Date],
          type
        ) === 0
      ) {
        nextExternalRangeId = rangeId
      } else {
        nextExternalRangeId = DatePicker.getRangeId(externalValue, { type, rangeId, ranges })
      }
    }

    if (nextExternalRangeId !== rangeId) {
      setRangeId(nextExternalRangeId)
    }

    // Value
    if (!rangeTupleEquals(externalValue, value)) {
      setValue(externalValue)
    }
  }

  // 修改
  function handleChange(newValue: (Date | null)[] | null, options?: DatePickerRangeChangeMeta) {
    if (options?.rangeId !== undefined) {
      setRangeId(options.rangeId)
    }
    setValue(newValue)
  }

  async function handleOk() {
    // 触发 onOk
    let currentValue: (Date | null)[] | null | undefined = value
    if (onOk) {
      const goOn = await onOk(currentValue, { rangeId })
      if (goOn === false) return false
      if (goOn instanceof Array) {
        currentValue = goOn
      }
    }

    onChange?.(currentValue ?? null, { rangeId: rangeId ?? null })
    dropdownRef.current?.close()
  }

  function handleCancel() {
    dropdownRef.current?.close()
  }

  function handleClose() {
    init()
  }

  return (
    <Dropdown
      id={id}
      ref={dropdownRef}
      // Style
      style={style}
      className={className}
      variant={variant}
      color={color}
      square={square}
      fontSize={fontSize}
      direction={direction}
      block={block}
      radius={radius}
      size={size}
      maskStyle={maskStyle}
      maskClassName={maskClassName}
      modalStyle={modalStyle}
      modalClassName={modalClassName}
      // Elements
      comboRender={comboRender}
      arrowRender={arrowRender}
      arrowSvg={arrowSvg}
      modalRender={() => {
        return (
          <div className="lyrixi-modal-toolbar-daterange">
            {/* Elements: Body */}
            <div className="lyrixi-modal-toolbar-daterange-body">
              <DateRange
                // Value & Display Value
                value={value}
                rangeId={rangeId}
                // Status
                allowClear={allowClear}
                // Elements
                type={type}
                min={min}
                max={max}
                ranges={ranges}
                // Events
                onChange={handleChange}
              />
            </div>

            {/* Elements: Footer */}
            <FooterBar>
              <FooterBar.Button
                id={id ? `${id}-cancel` : undefined}
                block
                variant="filled"
                color="default"
                onClick={handleCancel}
              >
                {LocaleUtil.locale('取消', 'lyrixi_625fb26b4b3340f7872b411f401e754c')}
              </FooterBar.Button>
              <FooterBar.Button
                id={id ? `${id}-ok` : undefined}
                block
                variant="solid"
                color="primary"
                onClick={handleOk}
              >
                {LocaleUtil.locale('确定', 'lyrixi_38cf16f2204ffab8a6e0187070558721')}
              </FooterBar.Button>
            </FooterBar>
          </div>
        )
      }}
      portal={portal}
      // Events
      onClose={handleClose}
    >
      {/* comboChildren */}
      {children ||
        getDisplayValue({ value, type, rangeId, ranges, separator: ' ~ ' }) ||
        placeholder}
    </Dropdown>
  )
}

export default DateRangeBar
