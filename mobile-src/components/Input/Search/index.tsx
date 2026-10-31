import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import InputText from './../Text'

import type { InputSearchProps, InputSearchRef, InputTextProps, InputTextRef } from '../types'

// 内库使用-start
import FunctionUtil from './../../../utils/FunctionUtil'
// 内库使用-end

const Search = forwardRef<InputSearchRef, InputSearchProps>(
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
      compositionEndEnabled = true,
      debounceDelay,

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

      // Events
      onClick,
      onChange,
      onBlur,
      onFocus,
      onKeyDown,
      onPressEnter,
      onSearch
    },
    ref
  ) => {
    // 有onChange，并且没有onChange防抖则为受控组件
    let isControlled = !debounceDelay && onChange ? true : false

    // 非受控组件的输入值
    const [keyword, setKeyword] = useState(value as string)

    // onChange防抖函数
    const onChangeRef = useRef(onChange)
    onChangeRef.current = onChange
    const debouncedOnChange = useMemo(() => {
      return FunctionUtil.debounce((newValue: string, options?: { action: string }) => {
        onChangeRef.current?.(newValue, options)
      }, debounceDelay)
    }, [debounceDelay])

    // 非受控组件，value 变化时，更新 keyword
    useEffect(() => {
      if (isControlled) return
      setKeyword(value as string)
      // eslint-disable-next-line react-hooks/exhaustive-deps -- 仅随受控 value 同步 keyword
    }, [value])

    // 卸载onChange防抖
    useEffect(() => {
      return () => {
        debouncedOnChange?.cancel()
      }
    }, [debouncedOnChange])

    // 修改值
    const handleChange: InputTextProps['onChange'] = (newValue, options) => {
      // 没有onChange
      if (typeof onChange !== 'function') {
        setKeyword(newValue)
        return
      }

      // onChange防抖
      if (debounceDelay) {
        setKeyword(newValue)
        debouncedOnChange?.(newValue, options)
        return
      }

      // 受控组件
      onChange?.(newValue, options)
    }

    return (
      <InputText
        ref={ref as React.Ref<InputTextRef>}
        id={id}
        name={name}
        type="search"
        // Value & Display Value
        value={isControlled ? value : keyword}
        placeholder={placeholder}
        formatter={formatter}
        // Status
        readOnly={readOnly}
        disabled={disabled}
        allowClear={allowClear}
        autoFocus={autoFocus}
        autoSelect={autoSelect}
        compositionEndEnabled={compositionEndEnabled}
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
        enterKeyHint="search"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        // Events
        onClick={onClick}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onPressEnter={(e) => {
          onPressEnter?.(e)
          e?.currentTarget?.blur?.()
          onSearch?.(keyword)
        }}
      />
    )
  }
)
export default Search
