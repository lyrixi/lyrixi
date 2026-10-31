import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import NumberKeyboard from './../../NumberKeyboard'

import type { NumberOTPProps, NumberOTPRef } from './Input.OTP.NumberOTP.types'
import type { InputNumberKeyboardRef } from '../../types'

// 内库使用-start
import DOMUtil from './../../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const NumberOTP = forwardRef<NumberOTPRef, NumberOTPProps>(
  ({ id, values, disabled, readOnly, onChange }, ref) => {
    const keyboardRef = useRef<InputNumberKeyboardRef | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [keyboardOpen, setKeyboardOpen] = useState(false)

    // Expose
    useImperativeHandle(ref, () => ({
      focus: (index: number) => {
        if (index >= 0 && index < values.length) {
          setCurrentIndex(index)
          keyboardRef.current?.focus()
          setKeyboardOpen(true)
        }
      },
      blur: () => {
        keyboardRef.current?.blur()
        setKeyboardOpen(false)
      }
    }))

    // 处理格子点击
    const handleItemClick = (index: number) => {
      if (!disabled && !readOnly) {
        setCurrentIndex(index)
        keyboardRef.current?.focus()
        setKeyboardOpen(true)
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
              currentIndex === index && keyboardOpen ? 'lyrixi-active' : ''
            )}
            onClick={() => handleItemClick(index)}
          >
            {value || ''}
          </div>
        ))}

        {/* 隐藏真实 NumberKeyboard：只负责唤起键盘，切换格子时不切换焦点 */}
        <NumberKeyboard
          ref={keyboardRef}
          value={values[currentIndex]}
          precision={0}
          min={0}
          disabled={disabled}
          readOnly={readOnly}
          className="lyrixi-input-otp-hidden-input"
          onChange={(val, options) => {
            if (options?.action === 'delete') {
              // 当前项没有值时，跳到上一格并清空
              if (!values[currentIndex] && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1)
                onChange(currentIndex - 1, '')
              } else {
                onChange(currentIndex, '')
              }
              return
            }
            // 替换老值，只保留新输入的字符
            onChange(currentIndex, val.replace(values[currentIndex] || '', ''))
          }}
          onBlur={() => setKeyboardOpen(false)}
        />
      </>
    )
  }
)

export default NumberOTP
