import React, { forwardRef } from 'react'

import Search from './../Search'

import type { ToolBarSearchActiveProps } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import LocaleUtil from './../../../utils/LocaleUtil'
import type { InputTextRef } from './../../Input/types'
import Icons from '../../../icons'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

const SearchBar = forwardRef<InputTextRef, ToolBarSearchActiveProps>((props, ref) => {
  const {
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
    compositionEndEnabled,
    debounceDelay,

    // Style
    style,
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
    onSearch,
    onCancel
  } = props

  return (
    <div
      // Style
      style={style}
      className={DOMUtil.classNames('lyrixi-toolbar-search-bar-active', className)}
    >
      {/* Elements: Search */}
      <Search
        ref={ref}
        // Elements
        id={id}
        name={name}
        // Value & Display Value
        value={value}
        placeholder={String(
          placeholder ?? LocaleUtil.locale('搜索', 'lyrixi_e5f71fc31e7246dd6ccc5539570471b0')
        )}
        formatter={formatter}
        // Status
        readOnly={readOnly}
        disabled={disabled}
        allowClear={allowClear}
        autoFocus={autoFocus ?? true}
        autoSelect={autoSelect}
        compositionEndEnabled={compositionEndEnabled}
        debounceDelay={debounceDelay}
        // Style
        style={style}
        className={DOMUtil.classNames('lyrixi-active', className)}
        // Elements
        leftIconRender={leftIconRender}
        leftIconSvg={leftIconSvg ?? Icons.Search}
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
        // Events
        onClick={onClick}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onPressEnter={onPressEnter}
        onSearch={onSearch}
      />

      {/* Elements: Cancel Button */}
      <span
        id={id ? `${id}-cancel` : undefined}
        className="lyrixi-toolbar-search-button-cancel"
        // Events
        onClick={() => {
          onCancel?.()
        }}
      >
        {LocaleUtil.locale('取消', 'lyrixi_625fb26b4b3340f7872b411f401e754c')}
      </span>
    </div>
  )
})

export default SearchBar
