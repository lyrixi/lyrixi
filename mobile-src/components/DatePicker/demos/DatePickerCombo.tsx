import React, { useState } from 'react'
import { Page, DatePicker, DateUtil, Card, Toast } from 'lyrixi-mobile'

export default function DatePickerComboDemo() {
  const [value, setValue] = useState<Date | null>(null)
  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Year</Card.Header>
          <Card.Main>
            <DatePicker.Combo
              type="year"
              placeholder="Year"
              value={value}
              onChange={(v) => {
                console.log(v)
                setValue(v ?? null)
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Month</Card.Header>
          <Card.Main>
            <DatePicker.Combo
              type="month"
              placeholder="Month"
              value={value}
              onChange={(v) => {
                console.log(v)
                setValue(v ?? null)
              }}
              allowClear
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Date</Card.Header>
          <Card.Main>
            <DatePicker.Combo
              type="date"
              placeholder="Date"
              value={value}
              onChange={(v) => {
                console.log(v)
                setValue(v ?? null)
              }}
              allowClear
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Time</Card.Header>
          <Card.Main>
            <DatePicker.Combo
              type="time"
              placeholder="Time"
              value={value}
              onChange={(v) => {
                console.log(v)
                setValue(v ?? null)
              }}
              allowClear
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Datetime</Card.Header>
          <Card.Main>
            <DatePicker.Combo
              type="datetime"
              placeholder="Datetime"
              value={value}
              onChange={(v) => {
                console.log(v)
                setValue(v ?? null)
              }}
              allowClear
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Week</Card.Header>
          <Card.Main>
            <DatePicker.Combo
              type="week"
              placeholder="Week"
              value={value}
              onChange={(v) => {
                console.log(v)
                setValue(v ?? null)
              }}
              allowClear
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Custom Title</Card.Header>
          <Card.Main>
            <DatePicker.Combo
              type="date"
              placeholder="Custom Title"
              titleRender={(value) => {
                return DatePicker.getTitle(value, 'YYYY年MM月DD日 周ddd')
              }}
              value={value}
              onChange={(v) => {
                console.log(v)
                setValue(v ?? null)
              }}
              allowClear
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Step</Card.Header>
          <Card.Main>
            <DatePicker.Combo
              placeholder="Step"
              type="datetime"
              hourStep={5}
              minuteStep={5}
              value={value}
              onChange={(v) => {
                console.log(v)
                setValue(v ?? null)
              }}
              allowClear
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>min & max</Card.Header>
          <Card.Main>
            <DatePicker.Combo
              min={DateUtil.add(new Date(), 2)}
              max={DateUtil.add(new Date(), 30)}
              placeholder="min & max"
              value={value}
              onChange={(v) => {
                console.log(v)
                setValue(v ?? null)
              }}
              allowClear
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>onOk</Card.Header>
          <Card.Main>
            <DatePicker.Combo
              placeholder="onOk"
              value={value}
              onChange={(v) => {
                console.log(v)
                setValue(v ?? null)
              }}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onOk={(newValue) => {
                Toast.open({ content: 'Use onOk to stop' })
                return false
              }}
              allowClear
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}
