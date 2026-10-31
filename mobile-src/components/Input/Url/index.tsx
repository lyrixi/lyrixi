import React, { forwardRef } from 'react'
import InputText from './../Text'

import type { InputTextProps, InputTextRef, InputUrlProps, InputUrlRef } from '../types'

// 内库使用-start
import Clipboard from './../../../utils/Clipboard'
// 内库使用-end

/* 测试使用-start
import { Clipboard } from 'lyrixi-mobile'
测试使用-end */

const Url = forwardRef<InputUrlRef, InputUrlProps>(
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
      onChange,
      onBlur,
      onFocus,
      onKeyDown,
      onPressEnter,
      // 是否支持单击预览, readOnly为true时才生效
      onPreview
    },
    ref
  ) => {
    function copyLink(url: string) {
      Clipboard.setString(url)
    }

    const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
      // 只读才可以复制连接
      if (!readOnly && !disabled) return

      // 网址不再需要协议前缀 有前缀则保留，无前缀则手动拼接http协议作为前缀
      const target = e.target as HTMLInputElement
      let urlValue = target.value
      let url = /^(https|http)?:\/\//.test(urlValue) ? urlValue : `http://${urlValue}`

      // 自定义预览
      if (typeof onPreview === 'function') {
        let goOn = await onPreview(urlValue)
        if (goOn === false) return
      }

      copyLink(url)
    }

    return (
      <InputText
        ref={ref as React.Ref<InputTextRef>}
        id={id}
        name={name}
        type="url"
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
        onClick={handleClick}
        onChange={onChange as InputTextProps['onChange']}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onPressEnter={onPressEnter}
      />
    )
  }
)
export default Url
