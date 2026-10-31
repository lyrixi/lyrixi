import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { maxLengthFormatter, minMaxFormatter, precisionFormatter } from './../Text/utils'

import InputText from './../Text'

import type { InputNumberKeyboardProps, InputNumberKeyboardRef, InputTextRef } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import Keyboard from './../../Keyboard'
import MathUtil from '../../../utils/MathUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Keyboard, MathUtil } from 'lyrixi-mobile'
测试使用-end */

const NumberKeyboard = forwardRef<InputNumberKeyboardRef, InputNumberKeyboardProps>(
  (
    {
      // Modal
      // Modal: Elements
      ok = null,

      // Input
      id,

      // Input: Value & Display Value
      value,
      placeholder,
      formatter,
      precision,
      trim,
      min,
      max,
      maxLength,

      // Input: Status
      readOnly,
      disabled,
      allowClear,

      // Input: Style
      style,
      size,
      className,

      // Input: Elements
      leftIconRender,
      leftIconSvg,
      rightIconRender,
      rightIconSvg,
      clearRender,

      // Input: Events
      onChange,
      onClick,
      onFocus,
      onBlur
    },
    ref
  ) => {
    const inputRef = useRef<InputTextRef | null>(null)
    const [keyboardOpen, setKeyboardOpen] = useState<boolean | undefined>(undefined)

    useEffect(() => {
      if (!keyboardOpen) return
      const inputElement = inputRef.current?.element
      if (!inputElement) return

      // 当前元素若本来就在可视区，则不用滚动
      const { top, bottom } = inputElement.getBoundingClientRect()
      const visibleBottom = window.innerHeight - 232
      if (top >= 0 && bottom <= visibleBottom) return

      // 键盘弹出后，输入框滚动到可视区底部
      inputElement.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, [keyboardOpen])

    // Expose
    useImperativeHandle(
      ref,
      () =>
        ({
          ...(inputRef.current as object),
          focus: () => {
            setKeyboardOpen(true)
            onFocus?.()
          },
          blur: () => {
            setKeyboardOpen(false)
            onBlur?.()
          }
        } as InputNumberKeyboardRef)
    )

    // 处理输入框点击
    const handleInputClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (readOnly) return
      setKeyboardOpen(true)
      onClick?.(e)
    }

    const handleChange = (newValue: string, options?: { action: string }) => {
      // 删除：透传 action，供 OTP 等场景区分回删
      if (options?.action === 'delete') {
        onChange?.(newValue, options)
        return
      }

      // 清空
      if (!newValue) {
        onChange?.('', options)
        return
      }

      // 不允许输入两个点
      const dots = (newValue.match(/\./g) || []).length
      if (dots > 1) {
        return
      }
      // 不是数字不允许输入
      if (newValue !== '-' && !MathUtil.isNumber(newValue)) {
        return
      }
      // 不能校验最小值，因为min={0.1}时，无法删除
      let val = String(minMaxFormatter(newValue, { max }))
      val = String(precisionFormatter(val, { precision, trim: false }))
      val = maxLengthFormatter(val, { maxLength })
      onChange?.(val, options)
    }

    const handleClose = () => {
      // 关闭便是失焦, 失焦后纠正数字
      if (MathUtil.isNumber(value)) {
        let val = String(inputRef.current?.correctValue(value as string))
        if (val !== String(value)) {
          onChange?.(val)
        }
      }

      setKeyboardOpen(false)
      onBlur?.()
    }

    return (
      <>
        {/* Input */}
        <InputText
          ref={inputRef}
          id={id}
          type="number"
          inputType="text" // 可以覆盖渲染的type属性,  以保证type='number'可以正确校验(慎用)
          // Input: Value & Display Value
          value={value}
          placeholder={placeholder}
          formatter={formatter}
          precision={precision}
          trim={trim}
          min={min}
          max={max}
          maxLength={maxLength}
          // Input: Status
          readOnly={true}
          disabled={disabled}
          allowClear={allowClear}
          // Input: Style
          style={style}
          size={size}
          className={DOMUtil.classNames('lyrixi-input-numberkeyboard', className)}
          // Input: Elements
          leftIconRender={leftIconRender}
          leftIconSvg={leftIconSvg}
          rightIconRender={rightIconRender}
          rightIconSvg={rightIconSvg}
          clearRender={clearRender}
          // Input: Events
          onChange={handleChange}
          onClick={handleInputClick}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        {/* Modal */}
        <Keyboard.Number
          // Modal: Value & Display Value
          value={value as string}
          dot={precision === 0 ? undefined : true}
          minus={min !== undefined && min >= 0 ? undefined : true}
          // Modal: Status
          open={keyboardOpen}
          // Modal: Elements
          ok={ok}
          // Events
          onChange={handleChange}
          onClose={handleClose}
        />
      </>
    )
  }
)
export default NumberKeyboard
