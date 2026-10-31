import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import { updateRangeValue, getDefaultRanges } from './../utils'
import getDisplayValue from '../RangeCombo/getDisplayValue'
import getCustomRangeId from './getCustomRangeId'
import getDefaultRangeId from './getDefaultRangeId'
import type { DatePickerPickerType, DatePickerRangeSelectorProps } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

import Buttons from './Buttons'
import Dates from './Dates'

// 日期快捷选择
const RangeSelector = forwardRef<Record<string, unknown> | null, DatePickerRangeSelectorProps>(
  (
    {
      // Value & Display Value
      value,
      autoSwapValue = true,
      type = 'date', // year | quarter | month | date | time | datetime
      rangeId,
      ranges: rangesIn,
      // Status
      min,
      max,
      hourStep,
      minuteStep,
      startDisabled,
      endDisabled,
      allowClear,
      // Style
      style,
      className,
      // Elements
      portal,
      // Events
      onChange,
      onOk
    },
    ref
  ) => {
    let ranges = rangesIn
    if (ranges === undefined) {
      // eslint-disable-next-line
      ranges = getDefaultRanges()
    }

    // 自定义项id
    const customRangeId = getCustomRangeId(ranges)

    // 当前选中项id
    const defaultRangeId = getDefaultRangeId(value, ranges, type)
    const currentRangeId = rangeId ?? defaultRangeId

    const mainRef = useRef<HTMLDivElement | null>(null)
    useImperativeHandle(ref, () => {
      return {
        mainElement: mainRef.current,
        getMainElement: () => mainRef.current
      }
    })

    // unify onChange
    function handleChange(newValue: (Date | null)[] | null, options?: { rangeId?: string | null }) {
      onChange?.(updateRangeValue(newValue ?? [null, null], type, { autoSwapValue }), {
        rangeId: options?.rangeId || null,
        ranges,
        displayValue: getDisplayValue({
          value: newValue,
          type,
          rangeId: options?.rangeId,
          ranges,
          separator: ' ~ '
        })
      })
    }

    return (
      <div
        style={style}
        className={DOMUtil.classNames('lyrixi-datepicker-rangeselector-selector', className)}
        ref={mainRef}
      >
        {/* 快捷选择 */}
        <Buttons
          value={value}
          onChange={handleChange}
          rangeId={currentRangeId}
          ranges={ranges}
          allowClear={allowClear}
        />

        {/* 自定义区间: 文本框选择 */}
        {customRangeId && currentRangeId === customRangeId && (
          <Dates
            // Value & Display Value
            value={value}
            min={min}
            max={max}
            // Status
            type={type as DatePickerPickerType}
            allowClear={allowClear}
            hourStep={hourStep}
            minuteStep={minuteStep}
            startDisabled={startDisabled}
            endDisabled={endDisabled}
            // Style
            maskClassName={undefined}
            maskStyle={undefined}
            modalClassName={undefined}
            modalStyle={undefined}
            // Elements
            portal={portal}
            // Events
            onChange={(newValue) => handleChange(newValue, { rangeId: customRangeId })}
            onOk={onOk}
          />
        )}
      </div>
    )
  }
)

export default RangeSelector
