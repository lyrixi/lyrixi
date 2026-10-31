import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import NumberOTP from './NumberOTP'
import TextOTP from './TextOTP'
import formatValue from './formatValue'

import type { InputOTPProps, InputOTPRef } from '../types/Input.OTP.types'
import type { InputOTPInputRef } from './Input.OTP.internal.types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const InputOTP = forwardRef<InputOTPRef, InputOTPProps>(
  (
    {
      type = 'number', // 'text' 或 'number'
      // Value & Display Value
      id,
      value = [],

      // Status
      disabled = false,
      readOnly = false,

      // Style
      className,
      style,

      maxLength = 6,

      // Events
      onChange,
      onComplete
    },
    ref
  ) => {
    // eslint-disable-next-line
    const formattedValue: string[] = formatValue(
      Array.isArray(value) ? (value as unknown[]) : [],
      maxLength
    )

    const rootRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<InputOTPInputRef | null>(null)

    // Expose
    useImperativeHandle(ref, () => ({
      get element() {
        return rootRef.current
      },
      focus: focus,
      blur: blur
    }))

    // 获焦
    function focus(itemIndex?: number) {
      inputRef.current?.focus?.(itemIndex || 0)
    }

    // 失焦
    function blur() {
      inputRef.current?.blur?.()
    }

    // 粘贴值, 更新数组值
    function textToValue(text: string) {
      if (!text) return

      const newValue: string[] = Array(maxLength).fill('')
      for (let i = 0; i < Math.min(text.length, maxLength); i++) {
        newValue[i] = (text as string)[i]
      }

      if (onChange) {
        onChange(newValue)
      }

      if (newValue.join('').length === maxLength && onComplete) {
        onComplete(newValue)
      }

      // 最后一个有值的输入框获焦
      const lastIndex = Math.min(newValue.join('').length, maxLength) - 1
      focus(lastIndex)
    }

    // 修改项, 更新数组值
    function updateItem(itemIndex: number, newItemValue: string) {
      const newValue = [...formattedValue]
      newValue[itemIndex] = newItemValue

      if (onChange) {
        onChange(newValue)
      }

      if (newValue.join('').length === maxLength && onComplete) {
        onComplete(newValue)
      }
    }

    // 处理输入变化
    const handleChange = (itemIndex: number, newItemValue: string) => {
      if (disabled || readOnly) return

      // 更新分割值和完整值
      updateItem(itemIndex, newItemValue)

      // 自动跳转到下一个输入框
      if (newItemValue) {
        focus(itemIndex + 1)
      }
    }

    // 处理粘贴
    const handlePaste = (e: React.ClipboardEvent) => {
      if (disabled || readOnly) return
      e.preventDefault()

      const pastedText = e.clipboardData.getData('text')
      textToValue(pastedText)
    }

    const InputComponent = type === 'number' ? NumberOTP : TextOTP
    return (
      <div
        id={id}
        ref={rootRef}
        // Style
        style={style}
        className={DOMUtil.classNames(
          'lyrixi-input-otp',
          className,
          disabled ? 'lyrixi-input-disabled' : '',
          readOnly ? 'lyrixi-input-readOnly' : ''
        )}
      >
        <InputComponent
          ref={inputRef}
          // Value & Display Value
          id={id}
          values={formattedValue}
          // Status
          disabled={disabled}
          readOnly={readOnly}
          // Events
          onChange={handleChange}
          onPaste={handlePaste as React.ClipboardEventHandler<HTMLElement>}
        />
      </div>
    )
  }
)

export default InputOTP
