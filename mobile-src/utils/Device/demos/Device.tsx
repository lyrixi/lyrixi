import React from 'react'
import { Page, Device, Card, Form, Divider } from 'lyrixi-mobile'

export default function DeviceDemo() {
  return (
    <Page>
      <Page.Main>
        <Divider>language</Divider>
        <Card style={{ padding: 12 }}>{Device.language}</Card>

        <Divider>protocol</Divider>
        <Card style={{ padding: 12 }}>{Device.protocol}</Card>
        <Divider>host</Divider>
        <Card style={{ padding: 12 }}>{Device.host}</Card>
        <Divider>domain</Divider>
        <Card style={{ padding: 12 }}>{Device.domain}</Card>
        <Divider>kernel</Divider>
        <Card style={{ padding: 12 }}>{Device.kernel}</Card>
        <Divider>device</Divider>
        <Card style={{ padding: 12 }}>{Device.device}</Card>
        <Divider>os</Divider>
        <Card style={{ padding: 12 }}>{Device.os}</Card>
        <Divider>osVersion</Divider>
        <Card style={{ padding: 12 }}>{Device.osVersion}</Card>
        <Divider>model</Divider>
        <Card style={{ padding: 12 }}>{Device.model}</Card>
        <Divider>platform</Divider>
        <Card style={{ padding: 12 }}>{Device.platform}</Card>
        <Divider>platformVersion</Divider>
        <Card style={{ padding: 12 }}>{Device.platformVersion}</Card>

        <Divider>isOnLine</Divider>
        <Card style={{ padding: 12 }}>{String(Device.isOnLine || '')}</Card>
        <Divider>userAgent</Divider>
        <Card style={{ padding: 12 }}>{Device.userAgent}</Card>
        <Divider>getUrlParameter</Divider>
        <Card style={{ padding: 12 }}>
          <Form label={{ span: 24 }} content={{ span: 24 }}>
            <Form.Item>
              <Form.Label>paramName:&apos;locale&apos;</Form.Label>
              <Form.Field name="urlParamLocale">
                <span>{String(Device.getUrlParameter('locale'))}</span>
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>paramName:&apos;other&apos;</Form.Label>
              <Form.Field name="urlParamOther">
                <span>{String(Device.getUrlParameter('other'))}</span>
              </Form.Field>
            </Form.Item>
            <Form.Item>
              <Form.Label>paramName:undefined</Form.Label>
              <Form.Field name="urlParamUndefined">
                <span>{JSON.stringify(Device.getUrlParameter())}</span>
              </Form.Field>
            </Form.Item>
          </Form>
        </Card>
        <Divider>screenWidth</Divider>
        <Card style={{ padding: 12 }}>{Device.screenWidth}</Card>
        <Divider>screenHeight</Divider>
        <Card style={{ padding: 12 }}>{Device.screenHeight}</Card>
        <Divider>compareVersion: 7_7_10 vs 7_7_5</Divider>
        <Card style={{ padding: 12 }}>{Device.compareVersion('7_7_10', '7_7_5', '_')}</Card>
      </Page.Main>
    </Page>
  )
}
