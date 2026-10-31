import React, { useEffect, useRef, useState } from 'react'

import {
  Card,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  LocaleUtil,
  Location,
  Page,
  Picker,
  Result,
  Select,
  Selector,
  Signature,
  Switch,
  Text,
  Toast,
  type FieldValidator,
  type FormRef
} from 'lyrixi-mobile'

import { queryData, saveData, validateData } from './../Cache/api'
import type {
  EditDemoQueryDataResult,
  EditDemoResultView,
  EditDemoSaveResult
} from './../Common/types'
import Footer from './../Cache/Footer'

const locale = LocaleUtil.locale

function required(message: string): FieldValidator {
  return (value) => {
    if (value === undefined || value === null || value === '') {
      return Promise.reject(new Error(message))
    }
    return Promise.resolve()
  }
}

// 虚拟滚动表单编辑示例
const Edit = () => {
  // 防重复提交token
  const tokenRef = useRef('' + Date.now())
  const baseDataRef = useRef<unknown>(null)

  // 表单
  const formRef = useRef<FormRef>(null)

  // 全屏提示: {status: 'empty|500', message: '', data: { baseData: {}, formData: {} }}
  const [result, setResult] = useState<unknown>(null)

  const resultView = result as EditDemoResultView

  /**
   * queryData初始化数据方法
   * @return {Object} {baseData: xx, formData: xx}
   */
  async function loadData() {
    // 加载详情数据
    let data = (await queryData()) as EditDemoQueryDataResult
    setResult(data)
    baseDataRef.current = data?.baseData ?? null

    // Initialize form with data
    if (data?.formData) {
      formRef.current?.setFieldsValue(data.formData as Record<string, unknown>)
    }
  }

  useEffect(() => {
    // 初始化数据
    loadData()

    // eslint-disable-next-line
  }, [])

  // 保存
  async function handleSave() {
    // 校验表单数据
    let data = await validateData({ form: formRef.current })
    if (!data) return

    // 保存表单数据
    const saveResult = (await saveData({
      baseData: baseDataRef.current,
      data,
      token: tokenRef.current
    })) as EditDemoSaveResult
    if (saveResult.code === '1') {
      Toast.open({
        content: String(locale('提交成功!')),
        onClose: () => {
          // 提交完成后操作: 返回等
        }
      })
    }
    // 重复请求
    else if (saveResult.code === '2') {
      Toast.open({
        content: String(saveResult.message || locale('请勿重复提交!')),
        onClose: () => {
          // 提交完成后操作: 返回等
        }
      })
    }
    // 保存出错
    else {
      // 请求出错需要重新生成token
      tokenRef.current = '' + Date.now()

      Toast.open({
        content: String(saveResult.message || locale('提交失败!'))
      })
    }
  }

  return (
    <Page>
      <Page.Main>
        <Card>
          <Form ref={formRef} style={{ margin: '0 12px' }}>
            <Form.Item>
              <Form.Label>
                <Text color="danger">*</Text>
                {String(locale('Input'))}
              </Form.Label>
              <Form.Field
                name="input"
                validator={required(String(locale('Input cannot be empty')))}
              >
                <Input.Text placeholder={String(locale('Please input'))} maxLength={50} />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Textarea'))}</Form.Label>
              <Form.Field name="textarea">
                <Input.Textarea placeholder={String(locale('Please input'))} />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Auto fit'))}</Form.Label>
              <Form.Field name="autoSize">
                <Input.AutoSize placeholder={String(locale('Please input'))} />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Select'))}</Form.Label>
              <Form.Field name="select">
                <Select.Combo
                  placeholder={String(locale('Please select'))}
                  list={[
                    {
                      id: '1',
                      name: 'Option1'
                    },
                    {
                      id: '2',
                      name: 'Option2'
                    }
                  ]}
                  allowClear
                />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Picker'))}</Form.Label>
              <Form.Field name="picker">
                <Picker.Combo
                  placeholder={String(locale('Please select'))}
                  list={[
                    {
                      id: '1',
                      name: 'Option1'
                    },
                    {
                      id: '2',
                      name: 'Option2'
                    }
                  ]}
                  allowClear
                />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Switch'))}</Form.Label>
              <Form.Field name="switch" valueName="checked">
                <Switch />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Checkbox'))}</Form.Label>
              <Form.Field name="checkbox">
                <Checkbox.Group
                  placeholder={String(locale('Please select'))}
                  list={[
                    {
                      id: '1',
                      name: 'Option1'
                    },
                    {
                      id: '2',
                      name: 'Option2'
                    }
                  ]}
                  allowClear
                />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Radio'))}</Form.Label>
              <Form.Field name="radio">
                <Checkbox.Group
                  multiple={false}
                  placeholder={String(locale('Please select'))}
                  list={[
                    {
                      id: '1',
                      name: 'Option1'
                    },
                    {
                      id: '2',
                      name: 'Option2'
                    }
                  ]}
                  allowClear
                />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Selector'))}</Form.Label>
              <Form.Field name="selector">
                <Selector
                  list={[
                    {
                      id: '1',
                      name: 'Option1'
                    },
                    {
                      id: '2',
                      name: 'Option2'
                    },
                    {
                      id: '3',
                      name: 'Option3'
                    },
                    {
                      id: '4',
                      name: 'Option4'
                    }
                  ]}
                  allowClear
                />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Number'))}</Form.Label>
              <Form.Field name="number">
                <Input.Number placeholder={String(locale('Please input'))} />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>
                <Text color="danger">*</Text>
                {String(locale('Number box'))}
              </Form.Label>
              <Form.Field
                name="numberBox"
                validator={required(String(locale('Number box can not empty')))}
              >
                <Input.NumberBox placeholder={String(locale('Please input'))} />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Password'))}</Form.Label>
              <Form.Field name="password">
                <Input.Password placeholder={String(locale('Please input'))} />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Range'))}</Form.Label>
              <Form.Field name="range">
                <Input.Range />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Rate'))}</Form.Label>
              <Form.Field name="rate">
                <Input.Rate />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Tel'))}</Form.Label>
              <Form.Field name="tel">
                <Input.Tel placeholder={String(locale('Please input'))} />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Url'))}</Form.Label>
              <Form.Field name="url">
                <Input.Url placeholder={String(locale('Please input'))} />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Datetime'))}</Form.Label>
              <Form.Field name="datetime">
                <DatePicker.Combo
                  type="datetime"
                  placeholder={String(locale('Please select'))}
                  allowClear
                />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Date'))}</Form.Label>
              <Form.Field name="date">
                <DatePicker.Combo placeholder={String(locale('Please select'))} allowClear />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Time'))}</Form.Label>
              <Form.Field name="time">
                <DatePicker.Combo
                  type="time"
                  placeholder={String(locale('Please select'))}
                  allowClear
                />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Date range'))}</Form.Label>
              <Form.Field name="dateRange">
                <DatePicker.RangeCombo placeholder={String(locale('Please select'))} allowClear />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('District'))}</Form.Label>
              <Form.Field name="district">
                <Cascader.DistrictCombo placeholder={String(locale('Please select'))} allowClear />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Location'))}</Form.Label>
              <Form.Field name="location">
                <Location.Combo
                  type="gcj02"
                  mapConfig={{
                    bmapKeys: {
                      android: '',
                      ios: '',
                      web: ''
                    },
                    googleKeys: {
                      android: '',
                      ios: '',
                      web: ''
                    },
                    amapKeys: {
                      android: '',
                      ios: '',
                      web: ''
                    },
                    type: 'bmap'
                  }}
                  placeholder={String(locale('Please select'))}
                  allowClear
                  previewVisible
                  chooseVisible
                />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>{String(locale('Signature'))}</Form.Label>
              <Form.Field name="signature">
                <Signature.Combo />
              </Form.Field>
            </Form.Item>
          </Form>
        </Card>
      </Page.Main>

      {/* Footer */}
      <Footer onOk={handleSave} />

      {/* Error */}
      {resultView?.message && (
        <Result
          status={String(resultView?.status ?? 'empty')}
          title={String(resultView?.title || resultView?.message || '')}
        />
      )}
    </Page>
  )
}

export default Edit
