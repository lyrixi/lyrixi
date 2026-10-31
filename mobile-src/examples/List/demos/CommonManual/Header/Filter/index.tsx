import React, { useEffect, useRef, useState } from 'react'

import { Form, Input, LocaleUtil, ToolBar } from 'lyrixi-mobile'

import type { FormRef } from 'lyrixi-mobile'
import type { FilterHeaderProps, ToolBarFilterOkParams, ToolBarFilterProps } from './types'

const locale = LocaleUtil.locale

function Filter({ queryParams, onSearch }: FilterHeaderProps) {
  const modifiedRef = useRef(false)
  const formRef = useRef<FormRef>(null)

  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)

  // 显示弹窗时需要还原值
  useEffect(() => {
    if (!visible) return
    formRef.current?.setFieldsValue({
      keyword: queryParams?.keyword || '',
      input: queryParams?.input || ''
    })
    // eslint-disable-next-line
  }, [visible])

  const handleOpen = () => {
    setVisible(true)
  }

  const handleClose = () => {
    setVisible(false)
  }

  // 取消还原激活状态
  const handleCancel = () => {
    modifiedRef.current = active
  }

  const handleConfig = () => {}

  const handleReset = () => {
    modifiedRef.current = false
    formRef.current?.setFieldsValue({
      keyword: '',
      input: ''
    })
  }

  const handleOk = ({ close }: ToolBarFilterOkParams) => {
    setActive(modifiedRef.current)
    onSearch?.({
      ...queryParams,
      ...(formRef.current?.getFieldsValue() || {})
    })
    close()
  }

  const handleFieldsChange = () => {
    modifiedRef.current = true
  }

  const filterProps = {
    square: true,
    color: active ? 'primary' : 'default',
    onOpen: handleOpen,
    onClose: handleClose,
    onCancel: handleCancel,
    onConfig: handleConfig,
    onReset: handleReset,
    onOk: handleOk,
    modalRender: () => {
      return (
        <Form
          ref={formRef}
          label={{ span: 24 }}
          content={{ span: 24 }}
          onFieldsChange={handleFieldsChange}
          style={{ marginLeft: '12px' }}
        >
          <Form.Item>
            <Form.Label>{String(locale('单行文本框'))}</Form.Label>
            <Form.Field name="input">
              <Input.Text allowClear placeholder={String(locale('请输入'))} maxLength={50} />
            </Form.Field>
          </Form.Item>
        </Form>
      )
    }
  } as unknown as ToolBarFilterProps

  return <ToolBar.Filter {...filterProps} />
}

export default Filter
