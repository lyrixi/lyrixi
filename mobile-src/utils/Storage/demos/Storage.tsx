import React, { useState } from 'react'
import { Storage, Page, Button, Input, Card, Divider, Form } from 'lyrixi-mobile'

function errMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

export default function StorageDemo() {
  const [key, setKey] = useState('demo-storage-key')
  const [value, setValue] = useState('demo-storage-value')
  const [result, setResult] = useState('')

  const handleSetItem = async () => {
    try {
      await Storage.setItem(key, value)
      setResult('设置成功')
    } catch (error: unknown) {
      setResult(`设置失败: ${errMessage(error)}`)
    }
  }

  const handleGetItem = async () => {
    try {
      const data = await Storage.getItem(key)
      setResult(`获取结果: ${JSON.stringify(data)}`)
    } catch (error: unknown) {
      setResult(`获取失败: ${errMessage(error)}`)
    }
  }

  const handleKeys = async () => {
    try {
      const keys = await Storage.keys()
      setResult(`所有键: ${JSON.stringify(keys)}`)
    } catch (error: unknown) {
      setResult(`获取失败: ${errMessage(error)}`)
    }
  }

  const handleGetItems = async () => {
    try {
      const items = await Storage.getItems([key])
      setResult(`指定键数据: ${JSON.stringify(items)}`)
    } catch (error: unknown) {
      setResult(`获取失败: ${errMessage(error)}`)
    }
  }

  const handleGetAllItems = async () => {
    try {
      const items = await Storage.getItems()
      setResult(`所有数据: ${JSON.stringify(items)}`)
    } catch (error: unknown) {
      setResult(`获取失败: ${errMessage(error)}`)
    }
  }

  const handleRemoveItem = async () => {
    try {
      await Storage.removeItem(key)
      setResult('删除成功')
    } catch (error: unknown) {
      setResult(`删除失败: ${errMessage(error)}`)
    }
  }

  const handleClear = async () => {
    try {
      await Storage.clear()
      setResult('清空成功')
    } catch (error: unknown) {
      setResult(`清空失败: ${errMessage(error)}`)
    }
  }

  return (
    <Page>
      <Page.Main>
        <Divider>Storage (LocalForage) 示例</Divider>

        <Card>
          <Divider>表单录入</Divider>
          <Form style={{ margin: '0 12px' }}>
            <Form.Item>
              <Form.Label>键名</Form.Label>
              <Form.Field name="key">
                <Input.Text placeholder="请输入键名" value={key} onChange={(v) => setKey(v)} />
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>值</Form.Label>
              <Form.Field name="value">
                <Input.Text placeholder="请输入值" value={value} onChange={(v) => setValue(v)} />
              </Form.Field>
            </Form.Item>
          </Form>
        </Card>

        <Card>
          <Divider>操作按钮</Divider>
          <div style={{ margin: '0 12px' }}>
            <Button
              className="lyrixi-margin-vertical-l lyrixi-margin-horizontal-m"
              radius="m"
              onClick={handleSetItem}
            >
              设置数据
            </Button>
            <Button
              className="lyrixi-margin-vertical-l lyrixi-margin-horizontal-m"
              radius="m"
              onClick={handleGetItem}
            >
              获取数据
            </Button>
            <Button
              className="lyrixi-margin-vertical-l lyrixi-margin-horizontal-m"
              radius="m"
              onClick={handleKeys}
            >
              获取所有键
            </Button>
            <Button
              className="lyrixi-margin-vertical-l lyrixi-margin-horizontal-m"
              radius="m"
              onClick={handleGetItems}
            >
              按键获取数据
            </Button>
            <Button
              className="lyrixi-margin-vertical-l lyrixi-margin-horizontal-m"
              radius="m"
              onClick={handleGetAllItems}
            >
              获取所有数据
            </Button>
            <Button
              className="lyrixi-margin-vertical-l lyrixi-margin-horizontal-m"
              radius="m"
              onClick={handleRemoveItem}
            >
              删除指定键
            </Button>
            <Button
              className="lyrixi-margin-vertical-l lyrixi-margin-horizontal-m"
              radius="m"
              onClick={handleClear}
            >
              清空所有
            </Button>
          </div>
        </Card>

        {result && (
          <Card>
            <Divider>执行结果</Divider>
            <div
              style={{
                padding: '12px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                wordBreak: 'break-all',
                margin: '0 12px'
              }}
            >
              <strong>结果:</strong> {result}
            </div>
          </Card>
        )}

        <Card>
          <Divider>功能说明</Divider>
          <div style={{ margin: '0 12px' }}>
            <p>• Storage 基于 LocalForage，统一异步 API，便于后续迁移 RN</p>
            <p>• 支持 setItem / getItem / getItems / keys / removeItem / clear</p>
            <p>• getItems(keyNameList) 可按 key 列表取；无参取全部</p>
          </div>
        </Card>
      </Page.Main>
    </Page>
  )
}
