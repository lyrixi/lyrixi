import React, { useEffect, useRef, useState } from 'react'

import { Card, Divider, Form, LocaleUtil, Page, Result, Text, Toast } from 'lyrixi-mobile'

import {
  approveData,
  queryData,
  type DetailFormApproveResult,
  type DetailFormQueryResultView
} from './api'
import Footer from './Footer'

const locale = LocaleUtil.locale

// 只读详情示例
const FormDetail = () => {
  // 防重复提交token
  const tokenRef = useRef('' + Date.now())

  // 全屏提示: { status: 'empty|500', message: '', data: {} }
  const [result, setResult] = useState<unknown>(null)

  const resData = result as DetailFormQueryResultView

  // 加载数据
  async function loadData() {
    // 加载详情数据
    let newResult = await queryData()
    setResult(newResult)
  }

  useEffect(() => {
    // 初始化数据
    loadData()

    // eslint-disable-next-line
  }, [])

  // 保存
  async function handleApprove() {
    // 保存表单数据
    const res = (await approveData({ token: tokenRef.current })) as DetailFormApproveResult
    if (res.code === '1') {
      Toast.open({
        content: String(locale('审批通过!')),
        onClose: () => {
          // 提交完成后操作: 返回等
        }
      })
    }
    // 重复请求
    else if (res.code === '2') {
      Toast.open({
        content: String(res.message || locale('请勿重复提交!')),
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
        content: String(res.message || locale('审批失败!'))
      })
    }
  }

  return (
    <Page>
      {/* Data success */}
      {resData?.data && (
        <Page.Main>
          <Card>
            <Divider>Horizontal Layout</Divider>
            <Form style={{ marginLeft: '12px' }}>
              <Form.Item>
                <Form.Label>
                  <Text ellipsis={{ rows: 1, expandable: true }}>
                    {locale(
                      'Input Overflow Label, It is very very very long,  It is really very very very long'
                    )}
                  </Text>
                </Form.Label>
                <Form.Field name="inputOverflow">
                  <Text>
                    Value Overflow Main, It is very very very long, It is really very very very long
                  </Text>
                </Form.Field>
              </Form.Item>

              <Form.Item>
                <Form.Label>{locale('Select')}</Form.Label>
                <Form.Field name="selectHorizontal">
                  <Text>{Text.getDisplayValue(resData?.data?.select)}</Text>
                </Form.Field>
              </Form.Item>
            </Form>
          </Card>
          <Card>
            <Divider>Vertical Layout</Divider>
            <Form label={{ span: 24 }} content={{ span: 24 }} style={{ marginLeft: '12px' }}>
              <Form.Item>
                <Form.Label>{locale('Input')}</Form.Label>
                <Form.Field name="inputVertical">
                  <Text>{Text.getDisplayValue(resData?.data?.input)}</Text>
                </Form.Field>
              </Form.Item>

              <Form.Item>
                <Form.Label>{locale('Select')}</Form.Label>
                <Form.Field name="selectVertical">
                  <Text>{Text.getDisplayValue(resData?.data?.select)}</Text>
                </Form.Field>
              </Form.Item>
            </Form>
          </Card>
        </Page.Main>
      )}

      {/* Footer */}
      <Footer onOk={handleApprove} />

      {/* Data error */}
      {resData?.status && <Result status={resData.status} title={resData.message} />}
    </Page>
  )
}

export default FormDetail
