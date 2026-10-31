import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import {
  splitInputStyle,
  maxLengthFormatter,
  minMaxFormatter,
  precisionFormatter,
  correctValue as _correctValue
} from './utils'
import InputIcon from './../Icon'
import renderClear from './renderClear'

import type { InputTextElement, InputTextProps, InputTextRef } from '../types'
import { InputSizeClasses } from '../types/Input.Size.types'
import type { InputTextRenderClearParams } from './Input.Text.renderClear.types'
import DisplayValue from './DisplayValue'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const InputText = forwardRef<InputTextRef, InputTextProps>(
  (
    {
      id,
      name,
      type = 'text', // 类型: text | number | tel | password | search | textarea | autoSize
      inputType, // 可以覆盖渲染的type属性,  以保证type='number'可以正确校验(慎用)

      // Value & Display Value
      value = '',
      placeholder,
      formatter,

      // Status
      readOnly,
      disabled,
      allowClear,
      autoFocus,
      autoSelect,
      compositionEndEnabled = false, // true：仅输入法落字（compositionend）后触发 onChange，用 e.target.composing 控制

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

      precision, // 小数精度, 只有数值框才生效
      trim, // [Number框]小数位补0, true: 不补0; false: 补0。 [Text框]影响左右空格;
      max,
      min,
      maxLength,

      // input属性
      inputMode,
      enterKeyHint,
      autoComplete,
      autoCorrect,
      spellCheck,
      cursor,

      // Events
      onClick,
      onChange,
      onBlur,
      onFocus,
      onKeyDown,
      onPressEnter
    }: InputTextProps,
    ref: React.Ref<InputTextRef>
  ) => {
    // eslint-disable-next-line
    if (!inputType) inputType = type

    // 输入框展示值
    const displayValueRef = useRef<HTMLDivElement>(null)
    const displayValue = typeof formatter === 'function' ? formatter(value ?? '') : null

    // Elements
    const rootRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<InputTextElement | null>(null)
    const inputPreRef = useRef<HTMLPreElement>(null)

    // InputStyle
    const { style, inputStyle: baseInputStyle } = splitInputStyle(externalStyle)
    const inputStyle =
      cursor === false ? { ...baseInputStyle, caretColor: 'transparent' } : baseInputStyle

    // 矫正最大长度和小数位截取
    function correctValue(val: string): string {
      return _correctValue(val, { type, min, max, maxLength, trim, precision })
    }

    // 获取焦点
    function focus() {
      if (disabled || readOnly || !inputRef.current) return

      // 显示input框, 隐藏displayValue
      if (displayValue) {
        if (inputRef.current) {
          inputRef.current.classList.remove('lyrixi-hide-important')
        }
        if (inputPreRef.current) {
          inputPreRef.current.classList.remove('lyrixi-hide-important')
        }
        if (displayValueRef.current) {
          displayValueRef.current.classList.add('lyrixi-hide-important')
        }
      }

      // 获取焦点
      inputRef.current.focus()
      // 只有获取焦点以后才能选中
      if (autoSelect) {
        inputRef.current.select()
      }
      // 设置光标位置到文本末尾(number框不支持)
      else if (
        inputRef.current.value.length &&
        (inputRef.current as HTMLInputElement).setSelectionRange
      ) {
        const length = inputRef.current.value.length
        try {
          ;(inputRef.current as HTMLInputElement).setSelectionRange(length, length)
        } catch (e) {
          console.log(e)
        }
      }
    }

    useEffect(() => {
      if (!inputRef.current) return

      // 显示format
      if (displayValue) {
        if (inputRef.current) {
          inputRef.current.classList.add('lyrixi-hide-important')
        }
        if (inputPreRef.current) {
          inputPreRef.current.classList.add('lyrixi-hide-important')
        }
        if (displayValueRef.current) {
          displayValueRef.current.classList.remove('lyrixi-hide-important')
        }
      }

      // 自动获取焦点
      if (autoFocus) {
        focus()
      }

      if (!value) return

      let val = ''

      // 矫正为正确的值
      val = String(correctValue(value ?? ''))

      // 矫正后的值和矫正前的值不一致, 需要强制修改文本框内的值
      if (val && String(value ?? '') && val !== String(value)) {
        onChange?.(val, { action: 'load' })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // compositionEndEnabled 时为非受控，父组件 value 变化（如表单重置）时需同步到 input
    useEffect(() => {
      if (!compositionEndEnabled || !inputRef.current) return
      if (inputRef.current.composing) return
      if (inputRef.current.value !== value) {
        inputRef.current.value = value
      }
      // eslint-disable-next-line
    }, [value, compositionEndEnabled])

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        },
        get inputElement() {
          return inputRef.current
        },
        correctValue: correctValue,
        focus: focus,
        blur: () => {
          inputRef.current?.blur?.()
        }
      } as InputTextRef
    })

    // 获取焦点时, 如果readOnly或者disabled时, 需要立即失去焦点, 解决ios会出现底栏的问题
    function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
      if (readOnly || disabled) {
        e.target.blur()
        return
      }
      if (onFocus) onFocus(e)
    }

    // 修改值
    async function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      const target = e.target as InputTextElement
      // compositionEndEnabled 时，组合中不触发 onChange（由 handleCompositionEnd 落字后触发）
      if (compositionEndEnabled && target?.composing) {
        return
      }
      if (target.value === value) {
        return
      }

      let val = target.value
      // 此处不宜用target?.validity?.badInput矫正数值, 因为ios上.也返回空

      // 矫正maxLength和小数点位数(不能矫正其它框，因为矫正将无法输入中文)
      if (val && type === 'number') {
        // 不能校验最小值，因为min={0.1}时，无法删除
        val = String(minMaxFormatter(val, { max }))
        val = String(precisionFormatter(val, { precision, trim: false }))
        val = String(maxLengthFormatter(val, { maxLength }))
        if (target.value !== val) {
          target.value = val
        }
      }

      // 触发onChange: 使用defaultValue时, 删除到点时会直接把点清空
      if (onChange) onChange(val, { action: 'change' })
    }

    // compositionEndEnabled输入完成触发onChange: 输入法开始组合（如拼音未选字）
    function handleCompositionStart(
      e: React.CompositionEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      ;(e.target as InputTextElement).composing = true
    }

    // compositionEndEnabled输入完成触发onChange: 输入法结束组合（选字/回车落字后）, 再触发 onChange
    function handleCompositionEnd(
      e: React.CompositionEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      ;(e.target as InputTextElement).composing = false
      handleChange(e as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    }

    // 数值框失去焦点, 校验最大值和最小值
    function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
      if (readOnly || disabled) {
        return
      }

      // 隐藏input框, 显示displayValue
      if (displayValue) {
        if (inputRef.current) {
          inputRef.current.classList.add('lyrixi-hide-important')
        }
        if (inputPreRef.current) {
          inputPreRef.current.classList.add('lyrixi-hide-important')
        }
        if (displayValueRef.current) {
          displayValueRef.current.classList.remove('lyrixi-hide-important')
        }
      }

      let target = e.target
      let val = target.value

      // trim
      if (trim && val && typeof val === 'string' && val.trim() !== val) {
        val = val.trim()
      }

      // 数值框失焦时需要矫正数值
      if (type === 'number') {
        // 正常输入：矫正最大最小值、小数点、最大长度
        if (val && !isNaN(Number(val))) {
          // 纠正数字
          val = String(correctValue(val))
        }
        // 输入错误或真的为空：用于解决ios可以输入字母中文等问题
        else {
          val = ''
        }

        target.value = val
      }

      // 修改完回调
      if (val !== value) {
        if (onChange) onChange(val, { action: 'blur' })
      }

      const inputEl = inputRef.current
      if (!inputEl?.preventBlur) {
        if (onBlur) onBlur(e)
      }
    }

    // 点击清除(blur生效)
    async function handleClear(e?: React.MouseEvent | React.TouchEvent) {
      if (e) (e as React.SyntheticEvent)?.stopPropagation?.()

      // 删除阻止blur
      if (inputRef.current) {
        delete inputRef.current.preventBlur
      }

      // 获取焦点
      focus()

      // Callback
      onChange?.('', { action: 'clickClear' })
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
      onKeyDown?.(e)
      if (typeof onPressEnter !== 'function') return
      // 监听 Enter 键（keyCode 13 或 'Enter'）
      if (e.key === 'Enter' || e.keyCode === 13) {
        // 阻止默认行为（防止表单提交导致的页面刷新）
        e.preventDefault()

        // 失焦收起键盘（移动端）
        e.currentTarget.blur()

        // 执行搜索
        onPressEnter(e)
      }
    }

    function renderLeftIcon() {
      if (leftIconRender) return leftIconRender()
      return leftIconSvg ? (
        <InputIcon id={id ? `${id}-leftIcon` : undefined} svg={leftIconSvg} />
      ) : null
    }

    function renderRightIcon() {
      if (rightIconRender) return rightIconRender()
      return rightIconSvg ? (
        <InputIcon id={id ? `${id}-rightIcon` : undefined} svg={rightIconSvg} />
      ) : null
    }

    // render
    function renderInput() {
      // autoSize类型
      if (inputType === 'autoSize') {
        return (
          <div className="lyrixi-input-autoSize">
            <textarea
              id={id ? `${id}-input` : undefined}
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              name={name}
              // Value & Display Value
              {...(compositionEndEnabled ? { defaultValue: value } : { value: value })}
              placeholder={placeholder}
              // Status
              readOnly={readOnly}
              disabled={disabled}
              autoFocus={autoFocus}
              // Style
              style={inputStyle}
              className="lyrixi-input-autoSize-textarea"
              maxLength={maxLength}
              // Other
              inputMode={inputMode}
              autoComplete={autoComplete}
              autoCorrect={autoCorrect}
              spellCheck={spellCheck}
              // Events
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              onCompositionStart={compositionEndEnabled ? handleCompositionStart : undefined}
              onCompositionEnd={compositionEndEnabled ? handleCompositionEnd : undefined}
            ></textarea>
            <pre ref={inputPreRef} className="lyrixi-input-autoSize-pre" style={inputStyle}>
              <span>{value}</span>
            </pre>
            {/* formatter value */}
            <DisplayValue
              ref={displayValueRef}
              style={{ ...inputStyle, position: 'relative' }}
              className="lyrixi-input-autoSize-textarea"
              onClick={() => focus()}
            >
              {displayValue}
            </DisplayValue>
          </div>
        )
      }
      // textarea类型
      if (inputType === 'textarea') {
        // 如果值绑定属性,则只有通过父组件的prop来改变值
        return (
          <>
            <textarea
              id={id ? `${id}-input` : undefined}
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              name={name}
              // Value & Display Value
              {...(compositionEndEnabled ? { defaultValue: value } : { value: value })}
              placeholder={placeholder}
              // Status
              readOnly={readOnly}
              disabled={disabled}
              autoFocus={autoFocus}
              // Style
              style={inputStyle}
              className="lyrixi-input-textarea"
              maxLength={maxLength}
              // Other
              inputMode={inputMode}
              autoComplete={autoComplete}
              autoCorrect={autoCorrect}
              spellCheck={spellCheck}
              // Events
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              onCompositionStart={compositionEndEnabled ? handleCompositionStart : undefined}
              onCompositionEnd={compositionEndEnabled ? handleCompositionEnd : undefined}
            ></textarea>
            {/* formatter value */}
            <DisplayValue
              ref={displayValueRef}
              style={inputStyle}
              className="lyrixi-input-textarea"
              onClick={() => focus()}
            >
              {displayValue}
            </DisplayValue>
          </>
        )
      }

      // 其它类型
      return (
        <>
          <input
            id={id ? `${id}-input` : undefined}
            ref={inputRef as React.RefObject<HTMLInputElement>}
            name={name}
            type={inputType} // number类型需要text，否则focus无法设置光标到末尾
            // Value & Display Value
            {...(compositionEndEnabled ? { defaultValue: value } : { value: value })}
            placeholder={placeholder}
            // Status
            readOnly={readOnly}
            disabled={disabled}
            autoFocus={autoFocus}
            // Style
            style={inputStyle}
            className="lyrixi-input-text"
            min={typeof min === 'number' ? min : ''}
            max={typeof max === 'number' ? max : ''}
            maxLength={maxLength}
            // Other
            inputMode={inputMode}
            enterKeyHint={enterKeyHint}
            autoComplete={autoComplete}
            autoCorrect={autoCorrect}
            spellCheck={spellCheck}
            // Events
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onCompositionStart={compositionEndEnabled ? handleCompositionStart : undefined}
            onCompositionEnd={compositionEndEnabled ? handleCompositionEnd : undefined}
          />
          {/* formatter value */}
          <DisplayValue
            ref={displayValueRef}
            style={inputStyle}
            className="lyrixi-input-text"
            onClick={() => focus()}
          >
            {displayValue}
          </DisplayValue>
        </>
      )
    }

    const sizeClass =
      typeof size === 'string' && size in InputSizeClasses
        ? InputSizeClasses[size as keyof typeof InputSizeClasses].className
        : ''

    return (
      <div
        ref={rootRef}
        // Elements
        id={id}
        // Style
        style={style}
        className={DOMUtil.classNames(
          `lyrixi-input`,
          sizeClass,
          className,
          disabled ? 'lyrixi-input-disabled' : '',
          readOnly ? 'lyrixi-input-readOnly' : ''
        )}
        // Events
        onClick={onClick}
      >
        {/* Left */}
        {renderLeftIcon()}

        <div
          className={DOMUtil.classNames(
            'lyrixi-input-node',
            disabled ? 'lyrixi-input-disabled' : '',
            readOnly ? 'lyrixi-input-readOnly' : ''
          )}
        >
          {/* Main */}
          {renderInput()}
        </div>

        {/* Clear Icon */}
        {disabled || !allowClear
          ? null
          : renderClear({
              id: id ? `${id}-clear` : undefined,
              clearRender,
              allowClear,
              clearable: value ? true : false,
              onClear: handleClear,
              onTouchStart: () => {
                if (inputRef.current) {
                  inputRef.current.preventBlur = true
                }
              }
            } as InputTextRenderClearParams)}

        {/* Right */}
        {renderRightIcon()}
      </div>
    )
  }
)
export default InputText
