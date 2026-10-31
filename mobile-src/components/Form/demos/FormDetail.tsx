import React from 'react'
import { Page, Form, Divider, LocaleUtil, Text } from 'lyrixi-mobile'

const locale = LocaleUtil.locale

const DETAIL_DATA = {
  input: '示例文本',
  select: { id: '1', name: '选项1' },
  textarea: '这是一段多行文本内容',
  input2: '',
  select2: { id: '2', name: '选项2' },
  textarea2: '这是纵向布局的多行文本'
}

// 只读详情表单示例（Horizontal + Vertical）
export default function FormDetail() {
  return (
    <Page>
      <Page.Main>
        <Form label={{ span: 10 }} content={{ span: 14 }}>
          <Divider>Horizontal</Divider>
          <Form.Item>
            <Form.Label>{locale('单行文本框') as string}</Form.Label>
            <Form.Field name="input">{Text.getDisplayValue(DETAIL_DATA.input)}</Form.Field>
          </Form.Item>
          <Form.Item>
            <Form.Label>{locale('下拉选择框') as string}</Form.Label>
            <Form.Field name="select">{Text.getDisplayValue(DETAIL_DATA.select)}</Form.Field>
          </Form.Item>
          <Form.Item>
            <Form.Label>{locale('多行文本框') as string}</Form.Label>
            <Form.Field name="textarea">{Text.getDisplayValue(DETAIL_DATA.textarea)}</Form.Field>
          </Form.Item>

          <Divider>Vertical</Divider>
          <Form.Item>
            <Form.Label span={24}>{locale('单行文本框') as string}</Form.Label>
            <Form.Field name="input2" span={24}>
              {Text.getDisplayValue(DETAIL_DATA.input2)}
            </Form.Field>
          </Form.Item>
          <Form.Item>
            <Form.Label span={24}>{locale('下拉选择框') as string}</Form.Label>
            <Form.Field name="select2" span={24}>
              {Text.getDisplayValue(DETAIL_DATA.select2)}
            </Form.Field>
          </Form.Item>
          <Form.Item>
            <Form.Label span={24}>{locale('多行文本框') as string}</Form.Label>
            <Form.Field name="textarea2" span={24}>
              {Text.getDisplayValue(DETAIL_DATA.textarea2)}
            </Form.Field>
          </Form.Item>
        </Form>
      </Page.Main>
    </Page>
  )
}
