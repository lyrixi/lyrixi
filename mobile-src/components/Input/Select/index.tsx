import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import getDisplayValue from './formatter'

import InputText from './../Text'

import InputAutoSize from './../AutoSize'
import IconRightArrow from './../Icons/RightArrow'
import IconClear from './../Icons/Clear'
import Tags from './Tags'

import type { InputSelectProps, InputSelectRef, InputTextProps, InputTextRef } from '../types'
import type { ListItem } from '../../List/types'

// 内库使用-start
import ValidatorUtil from './../../../utils/ValidatorUtil'
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { ValidatorUtil } from 'lyrixi-mobile'
测试使用-end */

// (内部组件, 不对外开放)仅渲染Input, 用于列表相关选择控件的基础组件, 不可单独使用
const Select = forwardRef<InputSelectRef, InputSelectProps>(
  (
    {
      // Value & Display Value
      id,
      value,
      placeholder,
      autoSize,
      mode,

      // Status
      readOnly,
      disabled,
      allowClear,

      // Style
      style,
      size,
      className,

      // Elements
      formatter,
      separator,
      leftIconRender,
      leftIconSvg,
      rightIconRender,
      rightIconSvg,
      clearRender: customClearRender,

      // Events
      onChange,
      onClick
    },
    ref
  ) => {
    // 显示文本格式化
    // let displayValue: string
    // if (typeof formatter !== 'function') {
    //   displayValue = getDisplayValue(value, { separator })
    // } else {
    //   const f = formatter as (v: unknown, opts?: { separator?: string }) => unknown
    //   const out = f.length >= 2 ? f(value, { separator }) : f(value)
    //   displayValue = typeof out === 'string' ? out : String(out ?? '')
    // }

    // 显示文本格式化
    if (typeof formatter !== 'function') {
      // eslint-disable-next-line
      formatter = getDisplayValue
    }
    let displayValue = formatter(value ?? null, { separator: separator })

    // Expose methods
    const comboRef = useRef<InputTextRef | null>(null)
    useImperativeHandle(ref, () => {
      return {
        // 显示文本
        displayValue: displayValue,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getDisplayValue: (_newValue?: unknown) => {
          return displayValue
        },
        get element() {
          return comboRef.current?.element ?? null
        }
      } as InputSelectRef
    })

    // 点击文本框 / 标签：添加无第二参，编辑带 { tag }
    function handleInputClick(e: React.MouseEvent<HTMLDivElement>, options?: { tag: ListItem }) {
      e.stopPropagation()
      if (readOnly || disabled) return
      onClick?.(e, options)
    }

    // 渲染清空按钮
    function clearRender({
      clearable,
      onClear
    }: {
      clearable: boolean
      onClear: (e?: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => void
    }): React.ReactNode {
      // 只读不显示清空按钮
      if (readOnly || disabled) {
        return null
      }

      // 自定义清空按钮
      if (typeof customClearRender === 'function') {
        return customClearRender({ clearable, onClear })
      }

      return ValidatorUtil.isEmpty(value) || !allowClear ? (
        <IconRightArrow />
      ) : (
        <IconClear id={id ? `${id}-clear` : undefined} onClick={onClear} />
      )
    }

    // 文本框
    let InputNode = InputText
    if (autoSize) {
      InputNode = InputAutoSize
    }

    if (mode === 'tags') {
      return (
        <Tags
          // Value & Display Value
          id={id}
          value={value as Parameters<typeof Tags>[0]['value']}
          placeholder={placeholder}
          separator={separator}
          // Status
          readOnly={readOnly}
          disabled={disabled}
          allowClear={allowClear}
          autoSize={autoSize}
          // Style
          style={style}
          size={size}
          className={className}
          // Elements
          leftIconRender={leftIconRender}
          leftIconSvg={leftIconSvg}
          rightIconRender={rightIconRender}
          rightIconSvg={rightIconSvg}
          clearRender={clearRender}
          // Events
          onAdd={handleInputClick}
          onEdit={handleInputClick}
          onChange={onChange as Parameters<typeof Tags>[0]['onChange']}
        />
      )
    }

    return (
      <InputNode
        id={id}
        ref={comboRef}
        // Value & Display Value
        value={displayValue ?? ''}
        placeholder={placeholder}
        // Status
        readOnly
        disabled={disabled}
        allowClear={allowClear}
        // Style
        style={style}
        size={size}
        className={DOMUtil.classNames('lyrixi-input-select', className)}
        // Elements
        leftIconRender={leftIconRender}
        leftIconSvg={leftIconSvg}
        rightIconRender={rightIconRender}
        rightIconSvg={rightIconSvg}
        clearRender={clearRender}
        // Events
        onClick={handleInputClick}
        onChange={onChange as InputTextProps['onChange']} // 强制只读的控件, 只会清空时触发
      />
    )
  }
)
export default Select
