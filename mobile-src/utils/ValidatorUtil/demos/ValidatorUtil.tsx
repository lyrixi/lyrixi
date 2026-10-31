import React from 'react'
import { Card, Divider, Page, ValidatorUtil } from 'lyrixi-mobile'

export default function ValidatorUtilDemo() {
  const emailExamples = [
    { label: 'foo@bar.com', value: 'foo@bar.com' },
    { label: 'invalid-email', value: 'invalid-email' }
  ]

  const phoneExamples = [
    { label: '13800138000', value: '13800138000', locale: 'zh_CN' as const },
    { label: '+8613800138000', value: '+8613800138000', locale: 'zh_CN' as const },
    { label: '12345', value: '12345', locale: 'zh_CN' as const },
    { label: '13800138000', value: '13800138000', locale: 'en_US' as const }
  ]

  const emptyExamples = [
    { label: "''", value: '' },
    { label: '{}', value: {} },
    { label: "'hello'", value: 'hello' }
  ]

  const plainObjectExamples = [
    { label: '{ a: 1 }', value: { a: 1 } },
    { label: '[]', value: [] },
    { label: 'null', value: null }
  ]

  const isEqualA = { x: 1, y: { z: 2 } }
  const isEqualB = { x: 1, y: { z: 2 } }
  const isEqualC = { x: 1, y: { z: 3 } }

  return (
    <Page>
      <Page.Main>
        <Card>
          <Divider>isEmail(str)</Divider>
          {emailExamples.map(({ label, value }) => (
            <div key={label} style={{ margin: '4px 12px' }}>
              ValidatorUtil.isEmail({label}) → {String(ValidatorUtil.isEmail(value))}
            </div>
          ))}
        </Card>

        <Card>
          <Divider>isPhoneNumber(str, locale)</Divider>
          {phoneExamples.map(({ label, value, locale }) => (
            <div key={label} style={{ margin: '4px 12px' }}>
              ValidatorUtil.isPhoneNumber({label}, {locale}) →{' '}
              {String(ValidatorUtil.isPhoneNumber(value, locale))}
            </div>
          ))}
        </Card>

        <Card>
          <Divider>isEmpty(value)</Divider>
          {emptyExamples.map(({ label, value }) => (
            <div key={label} style={{ margin: '4px 12px' }}>
              ValidatorUtil.isEmpty({label}) → {String(ValidatorUtil.isEmpty(value))}
            </div>
          ))}
        </Card>

        <Card>
          <Divider>isPlainObject(value)</Divider>
          {plainObjectExamples.map(({ label, value }) => (
            <div key={label} style={{ margin: '4px 12px' }}>
              ValidatorUtil.isPlainObject({label}) → {String(ValidatorUtil.isPlainObject(value))}
            </div>
          ))}
        </Card>

        <Card>
          <Divider>isEqual(a, b)</Divider>
          <div style={{ margin: '4px 12px' }}>
            ValidatorUtil.isEqual({'{ x:1, y:{ z:2 } }'}, {'{ x:1, y:{ z:2 } }'}) →{' '}
            {String(ValidatorUtil.isEqual(isEqualA, isEqualB))}
          </div>
          <div style={{ margin: '4px 12px' }}>
            ValidatorUtil.isEqual(isEqualA, isEqualC) →{' '}
            {String(ValidatorUtil.isEqual(isEqualA, isEqualC))}
          </div>
        </Card>
      </Page.Main>
    </Page>
  )
}
