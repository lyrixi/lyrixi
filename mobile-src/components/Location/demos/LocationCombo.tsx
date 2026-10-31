import React, { useRef, useState, type ComponentRef } from 'react'
import { Page, Location, Card, Button, type LocationValue } from 'lyrixi-mobile'

export default function LocationComboDemo() {
  const [value1, setValue1] = useState<LocationValue | null>({
    latitude: 31.990374883871525,
    longitude: 118.73769931504451,
    type: 'gcj02',
    address: '南京烽火科技'
  })

  const [value2, setValue2] = useState<LocationValue | null>(null)
  const [value3, setValue3] = useState<LocationValue | null>({
    latitude: 39.909187,
    longitude: 116.397451,
    type: 'gcj02',
    address: '天安门'
  })

  const comboRef = useRef<ComponentRef<typeof Location.Combo> | null>(null)

  return (
    <Page>
      <Page.Main>
        {/* 基础用法 */}
        <Card>
          <Card.Header>基础用法</Card.Header>
          <Card.Main>
            <Location.Combo
              value={value1}
              onChange={(val) => {
                console.log('修改:', val)
                setValue1(val)
              }}
            />
          </Card.Main>
        </Card>

        {/* 允许清除 */}
        <Card>
          <Card.Header>允许清除 (allowClear)</Card.Header>
          <Card.Main>
            <Location.Combo value={value1} allowClear onChange={setValue1} />
          </Card.Main>
        </Card>

        {/* 禁用状态 */}
        <Card>
          <Card.Header>禁用状态 (disabled)</Card.Header>
          <Card.Main>
            <Location.Combo value={value1} disabled onChange={setValue1} />
          </Card.Main>
        </Card>

        {/* 可编辑 */}
        <Card>
          <Card.Header>可编辑 (editable)</Card.Header>
          <Card.Main>
            <Location.Combo value={value2} editable onChange={setValue2} />
          </Card.Main>
        </Card>

        {/* 自动定位 */}
        <Card>
          <Card.Header>自动定位 (autoLocation)</Card.Header>
          <Card.Main>
            <Location.Combo value={value2} autoLocation onChange={setValue2} />
          </Card.Main>
        </Card>

        {/* 定位按钮可见性 */}
        <Card>
          <Card.Header>定位按钮不可见 (locationVisible=false)</Card.Header>
          <Card.Main>
            <Location.Combo value={value1} locationVisible={false} onChange={setValue1} />
          </Card.Main>
        </Card>

        {/* 选择按钮可见 */}
        <Card>
          <Card.Header>选择按钮可见 (chooseVisible)</Card.Header>
          <Card.Main>
            <Location.Combo value={value1} chooseVisible onChange={setValue1} />
          </Card.Main>
        </Card>

        {/* 预览按钮可见 */}
        <Card>
          <Card.Header>预览按钮可见 (previewVisible)</Card.Header>
          <Card.Main>
            <Location.Combo value={value1} previewVisible onChange={setValue1} />
          </Card.Main>
        </Card>

        {/* 点击动作 - 定位 */}
        <Card>
          <Card.Header>点击动作 - 定位 (clickAction=&quot;location&quot;)</Card.Header>
          <Card.Main>
            <Location.Combo value={value2} clickAction="location" onChange={setValue2} />
          </Card.Main>
        </Card>

        {/* 点击动作 - 选择 */}
        <Card>
          <Card.Header>点击动作 - 选择 (clickAction=&quot;choose&quot;)</Card.Header>
          <Card.Main>
            <Location.Combo value={value1} clickAction="choose" onChange={setValue1} />
          </Card.Main>
        </Card>

        {/* 点击动作 - 预览 */}
        <Card>
          <Card.Header>点击动作 - 预览 (clickAction=&quot;preview&quot;)</Card.Header>
          <Card.Main>
            <Location.Combo value={value1} clickAction="preview" onChange={setValue1} />
          </Card.Main>
        </Card>

        {/* 坐标类型 - WGS84 */}
        <Card>
          <Card.Header>坐标类型 - WGS84 (type=&quot;wgs84&quot;)</Card.Header>
          <Card.Main>
            <Location.Combo
              value={{
                latitude: 31.990374883871525,
                longitude: 118.73769931504451,
                type: 'wgs84',
                address: '南京烽火科技'
              }}
              type="wgs84"
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
              onChange={(val) => {
                console.log('WGS84坐标:', val)
              }}
            />
          </Card.Main>
        </Card>

        {/* 坐标类型 - GCJ02 */}
        <Card>
          <Card.Header>坐标类型 - GCJ02 (type=&quot;gcj02&quot;)</Card.Header>
          <Card.Main>
            <Location.Combo
              value={value1}
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
              onChange={setValue1}
            />
          </Card.Main>
        </Card>

        {/* 自定义错误文本 */}
        <Card>
          <Card.Header>自定义错误文本 (errorText)</Card.Header>
          <Card.Main>
            <Location.Combo
              value={value2}
              errorText="定位服务不可用，请稍后重试"
              onChange={setValue2}
            />
          </Card.Main>
        </Card>

        {/* 自定义加载文本 */}
        <Card>
          <Card.Header>自定义加载文本 (loadingText)</Card.Header>
          <Card.Main>
            <Location.Combo value={value2} loadingText="正在获取位置信息..." onChange={setValue2} />
          </Card.Main>
        </Card>

        {/* 自定义类名 */}
        <Card>
          <Card.Header>自定义类名 (className)</Card.Header>
          <Card.Main>
            <Location.Combo value={value1} className="custom-location-combo" onChange={setValue1} />
          </Card.Main>
        </Card>

        {/* 自动调整大小 */}
        <Card>
          <Card.Header>自动调整大小 (autoSize)</Card.Header>
          <Card.Main>
            <Location.Combo value={value1} autoSize onChange={setValue1} />
          </Card.Main>
        </Card>

        {/* 事件回调 */}
        <Card>
          <Card.Header>事件回调 (onOpen, onClose, onLocationStatusChange, onError)</Card.Header>
          <Card.Main>
            <Location.Combo
              value={value3}
              onChange={setValue3}
              onOpen={() => {
                console.log('模态框打开')
              }}
              onClose={() => {
                console.log('模态框关闭')
              }}
              onLocationStatusChange={(status) => {
                console.log('定位状态变化:', status)
              }}
              onError={(error) => {
                console.log('错误:', error)
              }}
            />
          </Card.Main>
        </Card>

        {/* 使用 Ref */}
        <Card>
          <Card.Header>使用 Ref</Card.Header>
          <Card.Main>
            <Location.Combo ref={comboRef} value={value1} onChange={setValue1} />
            <div style={{ marginTop: '10px' }}>
              <Button
                onClick={() => {
                  console.log('Ref element:', comboRef.current?.element)
                }}
              >
                获取元素
              </Button>
            </div>
          </Card.Main>
        </Card>

        {/* 完整配置示例 */}
        <Card>
          <Card.Header>完整配置示例</Card.Header>
          <Card.Main>
            <Location.Combo
              value={value1}
              allowClear
              editable
              locationVisible
              chooseVisible
              previewVisible
              clickAction="choose"
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
              errorText="定位失败"
              loadingText="定位中..."
              onChange={(val) => {
                console.log('修改:', val)
                setValue1(val)
              }}
              onOpen={() => {
                console.log('打开')
              }}
              onClose={() => {
                console.log('关闭')
              }}
              onLocationStatusChange={(status) => {
                console.log('状态:', status)
              }}
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}
