import React, { useContext, useEffect, useRef, useState } from 'react'

import FormContext from '../context/FormContext'

import type { FormFieldProps } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import Row from './../../Row'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Row } from 'lyrixi-mobile'
测试使用-end */

function FormField({
  name,
  children,
  validator,
  valueName = 'value',
  changeName = 'onChange',
  span,
  style,
  className
}: FormFieldProps) {
  const context = useContext(FormContext)
  const colSpan = span ?? context?.content?.span ?? 16
  const register = context?.register
  const unregister = context?.unregister
  const onFieldChange = context?.onFieldChange

  // 字段值由 Field 自己持有
  const [value, setValue] = useState<unknown>(undefined)
  const valueRef = useRef(value)
  valueRef.current = value

  // 挂载时注册；卸载时注销。getValue 走 ref，避免每次 value 变都重新 register
  useEffect(() => {
    if (!register || !unregister) return
    register(name, {
      getValue: () => valueRef.current,
      setValue,
      validator
    })
    return () => {
      unregister(name)
    }
  }, [register, unregister, name, validator])

  // 值变化时通知 Form 组件
  useEffect(() => {
    onFieldChange?.(name, value)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  // 为子元素添加 value 和 onChange 属性
  let _children = React.isValidElement(children)
    ? React.cloneElement(children, {
        [valueName]: value,
        [changeName]: setValue
      } as Record<string, unknown>)
    : children

  return (
    <Row.Col
      id={`form-field-${name}`}
      span={colSpan}
      style={style}
      className={DOMUtil.classNames('lyrixi-form-field', className)}
    >
      {_children}
    </Row.Col>
  )
}

export default FormField
