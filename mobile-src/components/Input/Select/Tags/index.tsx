import React, { Fragment } from 'react'

import type { ListItem } from '../../../List/types'
import type { InputSelectTagsProps } from './Input.Select.Tags.types'
import Tag from './Tag'
import InputNode from './../../Node'

// 内库使用-start
import DOMUtil from '../../../../utils/DOMUtil'
// 内库使用-end

// 标签模式
const Tags = ({
  // Value & Display Value
  id,
  // 分隔符
  separator,
  // 左右图标
  leftIconRender,
  leftIconSvg,
  rightIconRender,
  rightIconSvg,
  clearRender,
  className,
  style,
  size,
  placeholder,
  readOnly,
  disabled,
  allowClear,
  autoSize,
  value,
  onAdd,
  onEdit,
  onChange
}: InputSelectTagsProps) => {
  return (
    <InputNode
      id={id}
      leftIconRender={leftIconRender}
      leftIconSvg={leftIconSvg}
      rightIconRender={rightIconRender}
      rightIconSvg={rightIconSvg}
      className={DOMUtil.classNames('lyrixi-input-select', className)}
      size={size}
      disabled={disabled}
      readOnly={readOnly}
      style={style}
      onClick={onAdd}
      onChange={(_, options) => {
        if (options?.action === 'clickClear') {
          onChange?.([], { action: 'clickClear' })
        }
      }}
      allowClear={allowClear}
      clearRender={clearRender}
      placeholder={placeholder}
      autoSize={autoSize}
    >
      {Array.isArray(value)
        ? value.map((item, index) => {
            return (
              <Fragment key={String(item.id || index)}>
                <Tag
                  id={typeof item.id === 'string' ? item.id : undefined}
                  className={item.className}
                  style={item.style}
                  size={size}
                  name={item.name as React.ReactNode}
                  readOnly={item.readOnly}
                  disabled={item.disabled}
                  allowClear={item.allowClear}
                  onEdit={(e) => {
                    onEdit?.(e, { tag: item })
                  }}
                  onDelete={() => {
                    let currentValue = (value as ListItem[]).filter(
                      (valueItem) => valueItem.id !== item.id
                    )
                    onChange?.(currentValue, { action: 'clickDelete' })
                  }}
                />
                {index < value.length - 1 && separator ? separator : null}
              </Fragment>
            )
          })
        : null}
    </InputNode>
  )
}

export default Tags
