import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'

import getPercent from './getPercent'
import showTooltip from './showTooltip'
import hideTooltip from './hideTooltip'

import type { InputRangeProps, InputRangeRef } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import Icon from './../../Icon'
import Icons from '../../../icons'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const Range = forwardRef<InputRangeRef, InputRangeProps>(
  (
    {
      id,
      name,

      // Value & Display Value
      value = 0,

      // Status
      readOnly,
      disabled,

      // Style
      className,
      style,

      min = 0,
      max = 100,
      step = 1,

      // Events
      onChange
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)

    const inputRef = useRef<HTMLInputElement>(null)

    const tooltipRef = useRef<HTMLDivElement>(null)

    const handleRef = useRef<HTMLDivElement>(null)

    const railRef = useRef<HTMLDivElement>(null)

    function updateContainer(newValue?: number) {
      const numericValue = typeof value === 'number' ? value : Number(value ?? 0)
      let currentValue = newValue ?? numericValue ?? 0
      let percent = getPercent({ min, max, value: currentValue })
      if (handleRef.current) handleRef.current.style.left = `calc(${percent}% - 8px)`
      if (tooltipRef.current) tooltipRef.current.style.left = `calc(${percent}% - 12px)`
      if (railRef.current) railRef.current.style.width = `${percent}%`
      if (tooltipRef.current) tooltipRef.current.innerHTML = String(currentValue)
    }

    useEffect(() => {
      updateContainer()
      if (tooltipRef.current) hideTooltip(tooltipRef.current)
      // eslint-disable-next-line
    }, [])

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        },
        get inputElement() {
          return inputRef.current
        }
      } as InputRangeRef
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (disabled || readOnly) return
      let newValue: number = Number(e.currentTarget.value || 0)

      if (onChange) {
        onChange(newValue)
      }

      // 更新位置
      updateContainer(newValue as number)
    }

    // 显示tooltip
    function handleTouchStart() {
      updateContainer()
      if (tooltipRef.current) showTooltip(tooltipRef.current)
    }

    function handleTouchEnd() {
      if (tooltipRef.current) hideTooltip(tooltipRef.current)
    }

    return (
      <div
        ref={rootRef}
        id={id}
        // Style
        style={style}
        className={DOMUtil.classNames(
          'lyrixi-input-range',
          className,
          readOnly ? 'lyrixi-input-readOnly' : '',
          disabled ? 'lyrixi-input-disabled' : ''
        )}
        // Events
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Elements: Input */}
        <input
          ref={inputRef}
          name={name}
          type="range"
          className="lyrixi-input-range-input"
          // Value & Display Value
          value={typeof value === 'number' ? value : Number(value ?? 0)}
          // Status
          readOnly={readOnly}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          // Events
          onChange={handleChange}
        />

        {/* Elements: Rail */}
        <div className="lyrixi-input-range-rail">
          <div className="lyrixi-input-range-rail-active" ref={railRef}></div>
        </div>

        {/* Elements: Handle */}
        <div ref={handleRef} className="lyrixi-input-range-handle">
          <Icon svg={Icons.Adjuster} size="xxxs" className="lyrixi-input-range-handle-icon" />
        </div>

        {/* Elements: Tooltip */}
        <div ref={tooltipRef} className="lyrixi-input-range-tooltip">
          {typeof value === 'number' ? value : Number(value ?? 0)}
        </div>
      </div>
    )
  }
)
export default Range
