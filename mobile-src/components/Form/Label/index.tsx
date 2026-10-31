import React, { useContext } from 'react'

import FormContext from '../context/FormContext'

import type { FormLabelProps } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import Row from './../../Row'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Row } from 'lyrixi-mobile'
测试使用-end */

function FormLabel({ span, style, className, children }: FormLabelProps) {
  const context = useContext(FormContext)
  const colSpan = span ?? context?.label?.span ?? 8

  return (
    <Row.Col
      span={colSpan}
      style={style}
      className={DOMUtil.classNames('lyrixi-form-label', className)}
    >
      {children}
    </Row.Col>
  )
}

export default FormLabel
