import React, { forwardRef, useRef, useImperativeHandle } from 'react'

import type { InputRateProps, InputRateRef } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import VariablesUtil from './../../../utils/VariablesUtil'
import Icon from './../../Icon'
import Icons from '../../../icons'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// 评分组件
const Rate = forwardRef<InputRateRef, InputRateProps>(
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
      size = 'm',
      checkedColor = 'primary',
      style,
      className,

      // Elements
      iconSvg = Icons.StarFill,
      iconRender,

      min = 0,
      max = 5,
      step = 0.5,

      // Events
      onChange
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const numericValue = typeof value === 'number' ? value : Number(value ?? 0)
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        },
        get inputElement() {
          return inputRef.current
        }
      } as InputRateRef
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (disabled || readOnly) return
      let newValue: string | number = e.currentTarget.value

      if (newValue) newValue = Number(newValue || 0)
      if (onChange) {
        onChange(newValue as number)
      }
    }

    function getItemActiveWidth(itemValue: number): string {
      // 当前项位于整数位
      if (itemValue <= numericValue) {
        return '100%'
      }
      // 当前项位于小数位
      if (itemValue === Math.ceil(numericValue)) {
        return `${(numericValue - Math.floor(numericValue)) * 100}%`
      }
      // 当前项超出
      return '0%'
    }

    // 获取图标节点
    function renderIcon(index: number, isActive: boolean = false): React.ReactNode {
      const iconClassName = isActive
        ? 'lyrixi-input-rate-item-icon-active'
        : 'lyrixi-input-rate-item-icon'
      const iconStyle = isActive ? { width: getItemActiveWidth(index + 1) } : undefined

      return (
        <div className={iconClassName} style={iconStyle}>
          {typeof iconRender === 'function' ? (
            iconRender({
              checked: isActive
            })
          ) : (
            <Icon svg={iconSvg} size={size} />
          )}
        </div>
      )
    }

    return (
      <div
        ref={rootRef}
        id={id}
        // Style
        style={{
          ...(checkedColor
            ? ({
                '--lyrixi-input-rate-checked-color':
                  VariablesUtil.getColorValue(checkedColor) || checkedColor
              } as React.CSSProperties)
            : {}),
          ...style
        }}
        className={DOMUtil.classNames(
          'lyrixi-input-rate',
          className,
          readOnly ? 'lyrixi-input-readOnly' : '',
          disabled ? 'lyrixi-input-disabled' : ''
        )}
      >
        {/* Elements: Range Input */}
        <input
          ref={inputRef}
          name={name}
          type="range"
          className="lyrixi-input-rate-input"
          // Value & Display Value
          value={numericValue}
          // Status
          readOnly={readOnly}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          // Events
          onChange={handleChange}
        />

        {/* Elements: Icon & Active Icon */}
        {new Array(max).fill(1).map((item, index) => {
          const IconNode = renderIcon(index, false)
          const ActiveIconNode = renderIcon(index, true)

          return (
            <div className="lyrixi-input-rate-item" key={index}>
              {IconNode}
              {ActiveIconNode}
            </div>
          )
        })}
      </div>
    )
  }
)
export default Rate
