import React, { useEffect, useRef } from 'react'
import { Page, Form, Input, Button, Divider, Toast, LocaleUtil, Text } from 'lyrixi-mobile'

import type { FieldValidator, FormRef } from 'lyrixi-mobile'

const locale = LocaleUtil.locale

const buttonStyle = {
  margin: 'var(--lyrixi-space-m)'
}

function required(message: string): FieldValidator {
  return (value) => {
    if (!value) {
      return Promise.reject(new Error(message))
    }
    return Promise.resolve()
  }
}

export default function FormRefDemo() {
  const formRef = useRef<FormRef>(null)

  useEffect(() => {
    formRef.current?.setFieldsValue({
      name: 'Jamie',
      age: ''
    })
  }, [])

  function handleGetFieldValue() {
    const name = formRef.current?.getFieldValue('name')
    Toast.open({ content: `getFieldValue('name'): ${String(name)}` })
  }

  function handleGetFieldsValue() {
    const values = formRef.current?.getFieldsValue()
    Toast.open({ content: `getFieldsValue: ${JSON.stringify(values)}` })
  }

  function handleSetFieldsValue() {
    formRef.current?.setFieldsValue({
      name: 'Alice',
      age: '20',
      remark: 'hello'
    })
    Toast.open({ content: 'setFieldsValue({ name, age, remark })' })
  }

  function handleValidateName() {
    formRef.current
      ?.validateFields(['name'])
      .then((values) => {
        Toast.open({ content: `validateFields(['name']) ok: ${JSON.stringify(values)}` })
      })
      .catch((err) => {
        console.log('validateFields(["name"]) failed', err)
      })
  }

  function handleValidateAll() {
    formRef.current
      ?.validateFields()
      .then((values) => {
        Toast.open({ content: `validateFields() ok: ${JSON.stringify(values)}` })
      })
      .catch((err) => {
        console.log('validateFields() failed', err)
      })
  }

  return (
    <Page>
      <Page.Main>
        <Form ref={formRef} label={{ span: 8 }} content={{ span: 16 }}>
          <Form.Item>
            <Form.Label>
              <Text color="danger">*</Text>
              {locale('姓名') as string}
            </Form.Label>
            <Form.Field name="name" validator={required(locale('姓名不能为空') as string)}>
              <Input.Text placeholder={locale('请输入') as string} />
            </Form.Field>
          </Form.Item>
          <Form.Item>
            <Form.Label>
              <Text color="danger">*</Text>
              {locale('年龄') as string}
            </Form.Label>
            <Form.Field name="age" validator={required(locale('年龄不能为空') as string)}>
              <Input.Text placeholder={locale('请输入') as string} />
            </Form.Field>
          </Form.Item>
          <Form.Item>
            <Form.Label>{locale('备注') as string}</Form.Label>
            <Form.Field name="remark">
              <Input.Text placeholder={locale('请输入') as string} />
            </Form.Field>
          </Form.Item>
        </Form>

        <Divider>getFieldValue / getFieldsValue</Divider>
        <Button style={buttonStyle} onClick={handleGetFieldValue}>
          getFieldValue
        </Button>
        <Button style={buttonStyle} onClick={handleGetFieldsValue}>
          getFieldsValue
        </Button>

        <Divider>setFieldsValue</Divider>
        <Button style={buttonStyle} onClick={handleSetFieldsValue}>
          setFieldsValue
        </Button>

        <Divider>validateFields</Divider>
        <Button style={buttonStyle} onClick={handleValidateName}>
          validateFields(['name'])
        </Button>
        <Button style={buttonStyle} color="primary" variant="solid" onClick={handleValidateAll}>
          validateFields()
        </Button>
      </Page.Main>
    </Page>
  )
}
