import React, { useEffect, useRef } from 'react'
import {
  Page,
  Form,
  Divider,
  Select,
  Input,
  Checkbox,
  FooterBar,
  LocaleUtil,
  Text
} from 'lyrixi-mobile'

import type { FieldValidator, FormRef } from 'lyrixi-mobile'

const locale = LocaleUtil.locale

function required(message: string): FieldValidator {
  return (value) => {
    if (value === undefined || value === null || value === '') {
      return Promise.reject(new Error(message))
    }
    return Promise.resolve()
  }
}

// 新增 / 编辑表单示例（Horizontal + Vertical）
export default function FormEdit() {
  const formRef = useRef<FormRef>(null)

  useEffect(() => {
    formRef.current?.setFieldsValue({
      input: '123'
    })
  }, [])

  function handleSetFieldsValue() {
    formRef.current?.setFieldsValue({
      input: '默认文本',
      select: { id: '1', name: '选项1' },
      textarea: '默认多行文本',
      checkbox: true,
      input2: '默认文本',
      select2: { id: '2', name: '选项2' },
      textarea2: '默认多行文本'
    })
  }

  function handleSave() {
    formRef.current
      ?.validateFields()
      .then((values) => {
        console.log('Right!', values)
      })
      .catch((err) => {
        console.log('Wrong!', err)
      })
  }

  return (
    <Page>
      <Page.Main>
        <Form
          ref={formRef}
          label={{ span: 10 }}
          content={{ span: 14 }}
          onFieldsChange={(changedFields, allFields) => {
            console.log('onFieldsChange:', { changedFields, allFields })
          }}
        >
          <Divider>Horizontal</Divider>
          <Form.Item>
            <Form.Label>
              <Text color="danger">*</Text>
              {locale('单行文本框') as string}
            </Form.Label>
            <Form.Field name="input" validator={required(locale('单行文本框不能为空') as string)}>
              <Input.Text placeholder={locale('请输入') as string} maxLength={50} />
            </Form.Field>
          </Form.Item>
          <Form.Item>
            <Form.Label>{locale('下拉选择框') as string}</Form.Label>
            <Form.Field name="select">
              <Select.Combo
                placeholder={locale('请选择') as string}
                list={[
                  {
                    id: '1',
                    name: '选项1'
                  },
                  {
                    id: '2',
                    name: '选项2'
                  }
                ]}
              />
            </Form.Field>
          </Form.Item>
          <Form.Item>
            <Form.Label>{locale('多行文本框') as string}</Form.Label>
            <Form.Field name="textarea">
              <Input.AutoSize placeholder={locale('请输入') as string} />
            </Form.Field>
          </Form.Item>
          <Form.Item>
            <Form.Label>{locale('复选框') as string}</Form.Label>
            <Form.Field name="checkbox" valueName="checked">
              <Checkbox>{locale('同意协议') as string}</Checkbox>
            </Form.Field>
          </Form.Item>

          <Divider>Vertical</Divider>
          <Form.Item>
            <Form.Label span={24}>
              <Text color="danger">*</Text>
              {locale('单行文本框') as string}
            </Form.Label>
            <Form.Field
              name="input2"
              span={24}
              validator={required(locale('单行文本框不能为空') as string)}
            >
              <Input.Text placeholder={locale('请输入') as string} maxLength={50} />
            </Form.Field>
          </Form.Item>
          <Form.Item>
            <Form.Label span={24}>{locale('下拉选择框') as string}</Form.Label>
            <Form.Field name="select2" span={24}>
              <Select.Combo
                placeholder={locale('请选择') as string}
                list={[
                  {
                    id: '1',
                    name: '选项1'
                  },
                  {
                    id: '2',
                    name: '选项2'
                  }
                ]}
                clearRender={({ clearable, onClear }) => {
                  return clearable ? (
                    <Input.IconClear onClick={onClear} />
                  ) : (
                    <Input.IconRightArrow />
                  )
                }}
              />
            </Form.Field>
          </Form.Item>
          <Form.Item>
            <Form.Label span={24}>{locale('多行文本框') as string}</Form.Label>
            <Form.Field name="textarea2" span={24}>
              <Input.AutoSize placeholder={locale('请输入') as string} />
            </Form.Field>
          </Form.Item>
        </Form>
      </Page.Main>
      <Page.Footer>
        <FooterBar>
          <FooterBar.Button block variant="filled" color="default" onClick={handleSetFieldsValue}>
            {locale('设置默认值')}
          </FooterBar.Button>
          <FooterBar.Button block variant="solid" color="primary" onClick={handleSave}>
            {locale('确定')}
          </FooterBar.Button>
        </FooterBar>
      </Page.Footer>
    </Page>
  )
}
