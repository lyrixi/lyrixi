import React, { useRef } from 'react'
import { Page, Form, Input, FooterBar, LocaleUtil, Text } from 'lyrixi-mobile'

import type { FormRef } from 'lyrixi-mobile'

const locale = LocaleUtil.locale

const fields = [
  { name: 'name', label: '姓名' },
  { name: 'age', label: '年龄' },
  { name: 'gender', label: '性别' },
  { name: 'birthday', label: '生日' },
  { name: 'height', label: '身高' },
  { name: 'weight', label: '体重' },
  { name: 'bloodType', label: '血型' },
  { name: 'phone', label: '手机号' },
  { name: 'email', label: '邮箱' },
  { name: 'company', label: '公司' },
  { name: 'department', label: '部门' },
  { name: 'title', label: '职位' },
  { name: 'address', label: '地址' },
  { name: 'remark', label: '备注' }
]

export default function FormScrollToFieldDemo() {
  const formRef = useRef<FormRef>(null)

  function handleScrollToField(name: string) {
    formRef.current?.scrollToField(name)
  }

  return (
    <Page>
      <Page.Main>
        <Form ref={formRef} label={{ span: 24 }} content={{ span: 24 }}>
          {fields.map((field) => (
            <Form.Item key={field.name}>
              <Form.Label>{locale(field.label) as string}</Form.Label>
              <Form.Field name={field.name}>
                <Input.Text placeholder={locale('请输入') as string} />
              </Form.Field>
            </Form.Item>
          ))}
        </Form>
        <Text
          style={{
            display: 'block',
            padding: 'var(--lyrixi-space-m)',
            color: 'var(--lyrixi-color-weak)'
          }}
        >
          {locale('点击底部按钮滚动到对应字段') as string}
        </Text>
      </Page.Main>
      <Page.Footer>
        <FooterBar>
          <FooterBar.Button block variant="filled" onClick={() => handleScrollToField('name')}>
            {locale('滚动到姓名') as string}
          </FooterBar.Button>
          <FooterBar.Button block variant="filled" onClick={() => handleScrollToField('address')}>
            {locale('滚动到地址') as string}
          </FooterBar.Button>
          <FooterBar.Button
            block
            variant="solid"
            color="primary"
            onClick={() => handleScrollToField('remark')}
          >
            {locale('滚动到备注') as string}
          </FooterBar.Button>
        </FooterBar>
      </Page.Footer>
    </Page>
  )
}
