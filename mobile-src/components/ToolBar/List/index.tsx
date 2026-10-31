import React, { useRef, type ReactNode } from 'react'

import Dropdown from './../Dropdown'
import List from './List'

import type { ToolBarDropdownRef, ToolBarItem, ToolBarListProps } from './../types'

// 列表下拉
function ToolBarList({
  // Value & Display Value
  id,
  value,
  placeholder = '',

  // Style
  direction,
  block,
  color,
  variant,
  size,
  square,
  fontSize,
  radius = 'm',
  style,
  className,

  maskStyle,
  maskClassName,
  modalStyle,
  modalClassName,
  offset,
  left,
  right,
  list,

  // Elements
  children,
  comboRender,
  arrowRender,
  arrowSvg,
  portal,

  // Events
  onChange
}: ToolBarListProps) {
  const dropdownRef = useRef<ToolBarDropdownRef | null>(null)
  // 修改
  async function handleChange(newValue: ToolBarItem | ToolBarItem[] | null) {
    onChange?.(newValue)
    dropdownRef.current?.close()
  }

  return (
    <Dropdown
      id={id}
      ref={dropdownRef}
      // Style
      style={style}
      className={className}
      variant={variant}
      color={color}
      square={square}
      direction={direction}
      block={block}
      radius={radius}
      size={size}
      fontSize={fontSize}
      maskStyle={maskStyle}
      maskClassName={maskClassName}
      modalStyle={modalStyle}
      modalClassName={modalClassName}
      // Elements
      comboRender={comboRender}
      arrowRender={arrowRender}
      arrowSvg={arrowSvg}
      portal={portal}
      offset={offset}
      left={left}
      right={right}
      modalRender={() => {
        return (
          <List
            // Value & Display Value
            value={value}
            // Elements
            list={list}
            // Events
            onChange={handleChange}
          />
        )
      }}
    >
      {/* comboChildren */}
      {(children as ReactNode) ||
        (!Array.isArray(value) ? (value as { name?: ReactNode } | null | undefined)?.name : null) ||
        placeholder}
    </Dropdown>
  )
}

export default ToolBarList
