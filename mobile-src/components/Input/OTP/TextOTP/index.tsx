import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

import InputText from './../../Text'

import type { TextOTPProps, TextOTPRef } from './Input.OTP.TextOTP.types'
import type { InputTextRef } from '../../types'

// 内库使用-start
import DOMUtil from './../../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const TextOTP = forwardRef<TextOTPRef, TextOTPProps>(
  ({ id, values, disabled, readOnly, onChange, onPaste }, ref) => {
    // 单个隐藏 Input.Text 常驻焦点，格子只做展示，避免多框 focus 切换导致键盘收起再弹出
    const inputRef = useRef<InputTextRef | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [focused, setFocused] = useState(false)

    const currentValue = values[currentIndex] || ''

    // Input.Text 无 onPaste，挂到真实 input 上
    useEffect(() => {
      const el = inputRef.current?.inputElement
      if (!el || !onPaste) return
      const handlePaste = (e: Event) => {
        onPaste(e as unknown as React.ClipboardEvent<HTMLInputElement>)
      }
      el.addEventListener('paste', handlePaste)
      return () => el.removeEventListener('paste', handlePaste)
    }, [onPaste])

    // Expose
    useImperativeHandle(ref, () => ({
      focus: (index: number) => {
        if (index >= 0 && index < values.length) {
          setCurrentIndex(index)
          inputRef.current?.focus()
          setFocused(true)
        }
      },
      blur: () => {
        inputRef.current?.blur()
        setFocused(false)
      }
    }))

    // 处理格子点击
    const handleItemClick = (index: number) => {
      if (!disabled && !readOnly) {
        setCurrentIndex(index)
        inputRef.current?.focus()
        setFocused(true)
      }
    }

    // 格子间导航：退格空格跳上一格，方向键左右切格
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled || readOnly) return

      if (e.key === 'Backspace') {
        if (!values[currentIndex] && currentIndex > 0) {
          setCurrentIndex(currentIndex - 1)
        }
        return
      }

      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
        return
      }

      if (e.key === 'ArrowRight' && currentIndex < values.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }

    return (
      <>
        {values.map((value, index) => (
          <div
            key={index}
            id={id ? `${id}-${index}` : undefined}
            className={DOMUtil.classNames(
              'lyrixi-input-otp-item',
              currentIndex === index && focused ? 'lyrixi-active' : ''
            )}
            onClick={() => handleItemClick(index)}
          >
            {value || ''}
          </div>
        ))}

        {/* 隐藏真实 Input.Text：只负责唤起键盘，切换格子时不切换焦点 */}
        <InputText
          ref={inputRef}
          value={currentValue}
          disabled={disabled}
          readOnly={readOnly}
          className="lyrixi-input-otp-hidden-input"
          // 不设 maxLength={1}：格子已有值时仍可输入，再通过 replace 只保留新字符
          cursor={false}
          autoComplete="off"
          onChange={(val) => {
            onChange(currentIndex, val.replace(currentValue, ''))
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </>
    )
  }
)

export default TextOTP
