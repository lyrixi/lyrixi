import React, { forwardRef, useRef, useImperativeHandle } from 'react'

import getStrength from './getStrength'

import type { InputPasswordStrengthProps, InputPasswordStrengthRef } from '../types'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

const PasswordStrength = forwardRef<InputPasswordStrengthRef, InputPasswordStrengthProps>(
  (
    {
      // Value & Display Value
      value = '',

      // Style
      className,
      style
    }: InputPasswordStrengthProps,
    ref: React.Ref<InputPasswordStrengthRef>
  ) => {
    let strength = getStrength(String(value ?? ''))

    const rootRef = useRef<HTMLUListElement>(null)
    // Expose
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        },
        getStrength: (newValue?: string) => {
          return getStrength(newValue || String(value ?? ''))
        }
      }
    })

    return (
      <ul
        ref={rootRef}
        // Style
        style={style}
        className={DOMUtil.classNames(
          'lyrixi-input-password-strength',
          `lyrixi-level${strength}`,
          className
        )}
      >
        <li className="lyrixi-input-password-strength-item lyrixi-level1">
          <div className="lyrixi-input-password-strength-progress"></div>
          <span className="lyrixi-input-password-strength-text">
            {LocaleUtil.locale('弱', 'lyrixi_5490777b9cec0e60f5ffecda1e31c0a5')}
          </span>
        </li>
        <li className="lyrixi-input-password-strength-item lyrixi-level2">
          <div className="lyrixi-input-password-strength-progress lyrixi-level2"></div>
          <span className="lyrixi-input-password-strength-text">
            {LocaleUtil.locale('中', 'lyrixi_aed1dfbc31703955e64806b799b67645')}
          </span>
        </li>
        <li className="lyrixi-input-password-strength-item lyrixi-level3">
          <div className="lyrixi-input-password-strength-progress lyrixi-level3"></div>
          <span className="lyrixi-input-password-strength-text">
            {LocaleUtil.locale('强', 'lyrixi_7d00964b53a9c14ef100ad33fd71c743')}
          </span>
        </li>
      </ul>
    )
  }
)
export default PasswordStrength
