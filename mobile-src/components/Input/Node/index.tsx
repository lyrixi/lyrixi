import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { splitInputStyle } from './../Text/utils'
import renderClear from './../Text/renderClear'

import type { InputNodeProps, InputNodeRef } from '../types'
import { InputSizeClasses } from '../types/Input.Size.types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import InputIcon from './../Icon'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// 内部显示div
const InputNode = forwardRef<InputNodeRef, InputNodeProps>(
  (
    {
      id,
      children,
      placeholder,

      // Status
      readOnly,
      disabled,
      allowClear,
      autoSize,

      // Style
      style: externalStyle,
      size = 'm',
      className,

      // Elements
      leftIconRender,
      leftIconSvg,
      rightIconRender,
      rightIconSvg,
      clearRender,

      // Events
      onChange,
      onClick
    }: InputNodeProps,
    ref: React.Ref<InputNodeRef>
  ) => {
    // InputStyle
    const { style, inputStyle } = splitInputStyle(externalStyle)

    // Elements
    const rootRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLDivElement>(null)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        },
        get inputElement() {
          return inputRef.current
        }
      } as InputNodeRef
    })

    function handleClear(e?: React.MouseEvent | React.TouchEvent) {
      if (e) (e as React.SyntheticEvent)?.stopPropagation?.()

      onChange?.(null, { action: 'clickClear' })
    }

    function renderLeftIcon() {
      if (leftIconRender) return leftIconRender()
      return leftIconSvg ? <InputIcon svg={leftIconSvg} /> : null
    }

    function renderRightIcon() {
      if (rightIconRender) return rightIconRender()
      return rightIconSvg ? <InputIcon svg={rightIconSvg} /> : null
    }

    function renderContent() {
      if (children) {
        if (!autoSize) {
          return (
            <div
              className="lyrixi-input-text"
              style={{ ...inputStyle, overflowX: 'auto', whiteSpace: 'nowrap' }}
            >
              {children}
            </div>
          )
        }
        return (
          <div style={inputStyle} className="lyrixi-input-autoSize-node">
            {children}
          </div>
        )
      }
      if (placeholder) return <div className="lyrixi-input-placeholder">{placeholder}</div>
      return null
    }

    const sizeClass =
      typeof size === 'string' && size in InputSizeClasses
        ? InputSizeClasses[size as keyof typeof InputSizeClasses].className
        : ''

    return (
      <div
        ref={rootRef}
        id={id}
        style={style}
        className={DOMUtil.classNames(
          `lyrixi-input`,
          sizeClass,
          className,
          disabled ? 'lyrixi-input-disabled' : '',
          readOnly ? 'lyrixi-input-readOnly' : ''
        )}
        onClick={(e) => {
          if (disabled) return
          onClick?.(e)
        }}
      >
        {renderLeftIcon()}

        <div
          ref={inputRef}
          className={DOMUtil.classNames(
            'lyrixi-input-node',
            disabled ? 'lyrixi-input-disabled' : '',
            readOnly ? 'lyrixi-input-readOnly' : ''
          )}
        >
          {renderContent()}
        </div>

        {disabled || !allowClear
          ? null
          : renderClear({
              id,
              clearRender,
              allowClear,
              clearable: children ? true : false,
              onClear: handleClear
            })}

        {renderRightIcon()}
      </div>
    )
  }
)
export default InputNode
