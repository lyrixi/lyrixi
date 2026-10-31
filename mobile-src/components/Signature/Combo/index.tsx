import React, { forwardRef } from 'react'

import type { SignatureComboRef, SignatureComboProps } from '../types'

import Add from './Add'
import Edit from './Edit'

// Combo
const Combo = forwardRef<SignatureComboRef, SignatureComboProps>(
  (
    {
      // Value & Display Value
      value,

      // Status
      allowClear = true,

      // Style
      className,
      style,
      modalClassName,
      modalStyle,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      maskStyle,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      maskClassName,

      // Elements
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      portal,
      color, // 绘画配置: 画笔颜色
      backgroundColor, // 绘画配置: 背景颜色

      // Events
      onChange,
      onPreview
    }: SignatureComboProps,
    ref: React.Ref<SignatureComboRef>
  ) => {
    // 已签显示图片
    if (value && typeof value === 'string') {
      return (
        <Edit
          ref={ref}
          // Value & Display Value
          value={value}
          // Events
          onDelete={allowClear ? onChange : undefined}
          onPreview={onPreview}
        />
      )
    }

    // 未签显示添加按钮
    return (
      <Add
        ref={ref}
        // Value & Display Value
        value={value}
        // Style
        className={className}
        style={style}
        modalClassName={modalClassName}
        modalStyle={modalStyle}
        // Elements
        color={color} // 绘画配置: 画笔颜色
        backgroundColor={backgroundColor} // 绘画配置: 背景颜色
        // Events
        onChange={onChange}
      />
    )
  }
)
export default Combo
