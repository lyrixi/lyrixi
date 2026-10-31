import React from 'react'

import type { FormItemProps } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import Row from './../../Row'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Row } from 'lyrixi-mobile'
测试使用-end */

function FormItem({ style, className, children }: FormItemProps) {
  return (
    <Row style={style} className={DOMUtil.classNames('lyrixi-form-item', className)}>
      {children}
    </Row>
  )
}

export default FormItem
