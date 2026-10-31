import React from 'react'

import type { InputSelectTagProps } from './Input.Select.Tags.Tag.types'

// 内库使用-start
import DOMUtil from './../../../../utils/DOMUtil'
import Button from './../../../Button'
import Icons from '../../../../icons'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Button, Icons } from 'lyrixi-mobile'
测试使用-end */

// 标签
const Tag = ({
  id,
  style,
  className,
  name,
  size,
  readOnly,
  disabled,
  allowClear,
  onEdit,
  onDelete
}: InputSelectTagProps) => {
  return (
    <Button
      id={id}
      className={DOMUtil.classNames('lyrixi-select-tags-item', className)}
      style={style}
      size={size}
      radius="s"
      variant="filled"
      color="default"
      disabled={disabled}
      onClick={
        readOnly || disabled
          ? undefined
          : (e) => {
              e.stopPropagation()
              onEdit?.(e)
            }
      }
    >
      <Button.Text>{name}</Button.Text>
      {readOnly || disabled || !allowClear ? null : (
        <Button.Icon
          id={id ? `${id}-delete` : undefined}
          svg={Icons.Close}
          size="xs"
          style={{ padding: '3px' }}
          onClick={(e) => {
            onDelete?.()
            e.stopPropagation()
          }}
        />
      )}
    </Button>
  )
}

export default Tag
