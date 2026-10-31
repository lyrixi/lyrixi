import React, { useState, useRef, useEffect, type ComponentRef } from 'react'
import { Page, Input, Card, Button, MathUtil } from 'lyrixi-mobile'

export default function InputTextDemo() {
  const inputTextRef = useRef<ComponentRef<typeof Input.Text> | null>(null)
  const [value, setValue] = useState('')
  const [value2, setValue2] = useState('')
  const [formatterValue, setFormatterValue] = useState('12345.67')
  const [formatterThousandsValue, setFormatterThousandsValue] = useState('1234567.89')
  const [formatterTextareaValue, setFormatterTextareaValue] = useState('12345.67')
  const [formatterAutoSizeValue, setFormatterAutoSizeValue] = useState('12345.67')
  const [value4, setValue4] = useState('')
  const [value5, setValue5] = useState('')
  const [valueComposition, setValueComposition] = useState('')
  const [autoSelectValue, setAutoSelectValue] = useState('点击聚焦将自动选中全部文本')
  const [sizeValue, setSizeValue] = useState('')

  useEffect(() => {
    console.log('Input.Text ref:', inputTextRef.current)
  }, [])

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>基础用法</Card.Header>
          <Card.Main>
            <Input.Text
              ref={inputTextRef}
              placeholder="请输入文本"
              value={value}
              onChange={(val) => {
                console.log('得到的值:', val)
                setValue(val)
              }}
            />
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              当前值: {value || '空'}
            </div>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Scroll</Card.Header>
          <Card.Main>
            <Input.Text
              placeholder="Scroll"
              style={{ backgroundColor: '#f8f8f8' }}
              value={
                '中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国'
              }
              readOnly={true}
            />

            <Input.Text
              placeholder="Scroll"
              style={{ backgroundColor: '#f8f8f8' }}
              value={
                '中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国'
              }
              readOnly={true}
              formatter={(newValue: string) => {
                if (newValue) {
                  return '$' + newValue
                }
                return ''
              }}
            />
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>尺寸 size</Card.Header>
          <Card.Main>
            <Input.Text
              size="xs"
              placeholder="size xs"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              className="lyrixi-border"
            />
            <Input.Text
              size="s"
              placeholder="size s"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.Text
              size="m"
              placeholder="size m"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.Text
              size="l"
              placeholder="size l"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.Text
              size="xl"
              placeholder="size xl"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>带清除按钮</Card.Header>
          <Card.Main>
            <Input.Text placeholder="带清除按钮" value={value2} allowClear onChange={setValue2} />
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              当前值: {value2 || '空'}
            </div>
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>formatter</Card.Header>
          <Card.Main>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
              失焦时显示 formatter 格式化内容，获焦时恢复原始输入。
            </div>
            <Input.Text
              placeholder="前缀 $"
              value={formatterValue}
              allowClear
              formatter={(currentValue: string) => {
                return currentValue ? '$' + currentValue : ''
              }}
              onChange={setFormatterValue}
            />
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              当前值: {formatterValue || '空'}
            </div>
            <Input.Text
              placeholder="千分位"
              value={formatterThousandsValue}
              allowClear
              formatter={(currentValue: string) => {
                return currentValue ? '$' + MathUtil.thousands(currentValue) : ''
              }}
              onChange={setFormatterThousandsValue}
              style={{ marginTop: '12px' }}
            />
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              当前值: {formatterThousandsValue || '空'}
            </div>
            <div
              style={{ marginTop: '16px', marginBottom: '8px', fontSize: '14px', color: '#666' }}
            >
              Textarea
            </div>
            <Input.Textarea
              placeholder="Textarea 前缀 $"
              value={formatterTextareaValue}
              allowClear
              formatter={(currentValue: string) => {
                return currentValue ? '$' + currentValue : ''
              }}
              onChange={setFormatterTextareaValue}
            />
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              当前值: {formatterTextareaValue || '空'}
            </div>
            <div
              style={{ marginTop: '16px', marginBottom: '8px', fontSize: '14px', color: '#666' }}
            >
              AutoSize
            </div>
            <Input.AutoSize
              placeholder="AutoSize 前缀 $"
              value={formatterAutoSizeValue}
              allowClear
              formatter={(currentValue: string) => {
                return currentValue ? '$' + currentValue : ''
              }}
              onChange={setFormatterAutoSizeValue}
            />
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              当前值: {formatterAutoSizeValue || '空'}
            </div>
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>最大长度限制</Card.Header>
          <Card.Main>
            <Input.Text
              placeholder="最多输入10个字符"
              value={value4}
              maxLength={10}
              onChange={setValue4}
            />
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              当前值: {value4 || '空'} ({value4.length}/10)
            </div>
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>禁用状态</Card.Header>
          <Card.Main>
            <Input.Text
              placeholder="禁用状态"
              value="这是禁用状态的文本"
              disabled={true}
              onChange={setValue5}
            />
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>只读状态</Card.Header>
          <Card.Main>
            <Input.Text
              placeholder="只读状态"
              value="这是只读状态的文本"
              readOnly={true}
              onChange={setValue5}
            />
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>带左右图标</Card.Header>
          <Card.Main>
            <Input.Text
              placeholder="带左右图标"
              value={value5}
              leftIconRender={() => <span style={{ color: '#999' }}>&lt;</span>}
              rightIconRender={() => <Input.IconRightArrow />}
              onChange={setValue5}
            />
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              当前值: {value5 || '空'}
            </div>
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>autoSelect（聚焦时自动选中, 不同厂商表现不一样）</Card.Header>
          <Card.Main>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
              开启后，输入框获得焦点时会自动选中全部文本，便于一键覆盖输入。
            </div>
            <Input.Text
              placeholder="聚焦时自动选中"
              value={autoSelectValue}
              autoSelect
              allowClear
              onChange={setAutoSelectValue}
            />
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              当前值: {autoSelectValue || '空'}
            </div>
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>compositionEndEnabled（输入法落字后触发 onChange）</Card.Header>
          <Card.Main>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
              开启后，中文输入法下打拼音时不会每次按键都触发 onChange，只有选字/回车落字后才触发。
            </div>
            <Input.Text
              placeholder="可输入中文测试，如输入 wang 选「王」"
              value={valueComposition}
              compositionEndEnabled
              onChange={(val) => {
                console.log('compositionEndEnabled 触发:', val)
                setValueComposition(val)
              }}
            />
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              当前值: {valueComposition || '空'}
            </div>
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>自动去除空格</Card.Header>
          <Card.Main>
            <Input.Text
              placeholder="自动去除首尾空格"
              value={value}
              trim={true}
              onChange={setValue}
            />
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              当前值: {value || '空'}
            </div>
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>操作按钮</Card.Header>
          <Card.Main>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Button onClick={() => inputTextRef.current?.focus?.()}>聚焦输入框</Button>
              <Button onClick={() => inputTextRef.current?.blur?.()}>失焦输入框</Button>
              <Button onClick={() => setValue('')}>清空所有值</Button>
            </div>
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>功能说明</Card.Header>
          <Card.Main>
            <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#666' }}>
              <p>• 支持 size 尺寸（xs / s / m / l / xl）</p>
              <p>• 支持文本输入和编辑</p>
              <p>• 支持placeholder提示</p>
              <p>• 支持清除按钮</p>
              <p>• 支持 formatter 失焦格式化显示</p>
              <p>• 支持最大长度限制</p>
              <p>• 支持左右图标</p>
              <p>• 支持 autoSelect（聚焦时自动选中全部文本）</p>
              <p>• 支持 compositionEndEnabled（输入法落字后再触发 onChange）</p>
              <p>• 支持自动去除首尾空格</p>
              <p>• 支持disabled和readOnly状态</p>
              <p>• 支持ref操作（focus、blur等）</p>
            </div>
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}
