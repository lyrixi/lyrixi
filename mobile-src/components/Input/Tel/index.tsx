import React, { forwardRef } from 'react'
import InputText from './../Text'
import type { InputTelProps, InputTelRef, InputTextProps, InputTextRef } from './../types'

const InputTel = forwardRef<InputTelRef, InputTelProps>(
  (
    {
      id,
      name,

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

      // Style
      style,
      size,
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

      // Events
      onClick,
      onChange,
      onBlur,
      onFocus,
      onKeyDown,
      onPressEnter
    },
    ref
  ) => {
    return (
      <InputText
        ref={ref as React.Ref<InputTextRef>}
        id={id}
        name={name}
        type="tel"
        // Value & Display Value
        value={value as string}
        placeholder={placeholder}
        formatter={formatter}
        // Status
        readOnly={readOnly}
        disabled={disabled}
        allowClear={allowClear}
        autoFocus={autoFocus}
        autoSelect={autoSelect}
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
        precision={precision}
        trim={trim}
        max={max}
        min={min}
        maxLength={maxLength}
        // input属性
        inputMode={inputMode}
        enterKeyHint={enterKeyHint}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        spellCheck={spellCheck}
        // Events
        onClick={onClick}
        onChange={onChange as InputTextProps['onChange']}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onPressEnter={onPressEnter}
      />
    )
  }
)

export default InputTel
