import React, { forwardRef } from 'react'
import InputText from './../Text'
import type { InputNumberProps, InputNumberRef, InputTextProps, InputTextRef } from './../types'

/**
 * 根据 min / precision 推断默认 inputMode（与 NumberKeyboard 的 minus 规则对齐）：
 * - min >= 0：numeric / decimal，系统键盘通常不展示「-」
 * - 未设置 min 或 min < 0：不强制 inputMode，交给 type="number"，便于展示「-」
 */
function getDefaultInputMode({
  min,
  precision
}: {
  min: InputNumberProps['min']
  precision: InputNumberProps['precision']
}): InputNumberProps['inputMode'] {
  // numeric: 整数, decimal: 小数
  if (typeof min === 'number' && min >= 0) {
    return precision === 0 ? 'numeric' : 'decimal'
  }
  // 负数+小数
  return undefined
}

const Number = forwardRef<InputNumberRef, InputNumberProps>(
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
        type="number"
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
        inputMode={inputMode || getDefaultInputMode({ min, precision })}
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

export default Number
