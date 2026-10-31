import React, { useState } from 'react'
import { Page, DatePicker, DateUtil, Card } from 'lyrixi-mobile'

export default function DatePickerRangeSelectorDemo() {
  const [rangeId1, setRangeId1] = useState<string | null>(null)
  const [value1, setValue1] = useState<(Date | null)[]>([new Date(), new Date()])

  const [rangeId2, setRangeId2] = useState<string | null>(null)
  const [value2, setValue2] = useState<(Date | null)[] | null>(null)

  const [rangeId3, setRangeId3] = useState<string | null>(null)
  const [value3, setValue3] = useState<(Date | null)[] | null>(null)

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>基础用法</Card.Header>
          <Card.Main>
            <DatePicker.RangeSelector
              allowClear
              rangeId={rangeId1}
              value={value1}
              onChange={(newValue, options) => {
                const rangeId = options?.rangeId
                console.log('修改:', newValue, rangeId)
                if (newValue) setValue1(newValue)
                setRangeId1(rangeId ?? null)
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>自定义范围 (ranges)</Card.Header>
          <Card.Main>
            <DatePicker.RangeSelector
              allowClear
              ranges={{
                今日: [new Date(), new Date()],
                近7日: [DateUtil.add(new Date(), -6, 'day'), new Date()],
                近30日: [DateUtil.add(new Date(), -29, 'day'), new Date()],
                本月: [
                  DateUtil.startOrEnd(new Date(), 'month', 'start'),
                  DateUtil.startOrEnd(new Date(), 'month', 'end')
                ],
                上月: [
                  DateUtil.startOrEnd(DateUtil.add(new Date(), -1, 'month'), 'month', 'start'),
                  DateUtil.startOrEnd(DateUtil.add(new Date(), -1, 'month'), 'month', 'end')
                ]
              }}
              rangeId={rangeId2}
              value={value2}
              onChange={(newValue, options) => {
                const rangeId = options?.rangeId
                console.log('修改:', newValue, rangeId)
                setValue2(newValue)
                setRangeId2(rangeId ?? null)
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>日期类型 (type)</Card.Header>
          <Card.Main>
            <DatePicker.RangeSelector
              allowClear
              type="datetime"
              rangeId={rangeId3}
              value={value3}
              onChange={(newValue, options) => {
                const rangeId = options?.rangeId
                console.log('修改:', newValue, rangeId)
                setValue3(newValue)
                setRangeId3(rangeId ?? null)
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>最小/最大日期 (min/max)</Card.Header>
          <Card.Main>
            <DatePicker.RangeSelector
              allowClear
              min={DateUtil.add(new Date(), -30, 'day')}
              max={new Date()}
              rangeId={rangeId1}
              value={value1}
              onChange={(newValue, options) => {
                const rangeId = options?.rangeId
                console.log('修改:', newValue, rangeId)
                if (newValue) setValue1(newValue)
                setRangeId1(rangeId ?? null)
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>禁用开始/结束日期 (startDisabled/endDisabled)</Card.Header>
          <Card.Main>
            <DatePicker.RangeSelector
              allowClear
              startDisabled
              endDisabled
              rangeId={rangeId1}
              value={value1}
              onChange={(newValue, options) => {
                const rangeId = options?.rangeId
                console.log('修改:', newValue, rangeId)
                if (newValue) setValue1(newValue)
                setRangeId1(rangeId ?? null)
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>时间步长 (hourStep/minuteStep)</Card.Header>
          <Card.Main>
            <DatePicker.RangeSelector
              allowClear
              type="datetime"
              hourStep={2}
              minuteStep={15}
              rangeId={rangeId3}
              value={value3}
              onChange={(newValue, options) => {
                const rangeId = options?.rangeId
                console.log('修改:', newValue, rangeId)
                setValue3(newValue)
                setRangeId3(rangeId ?? null)
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>onOk 事件</Card.Header>
          <Card.Main>
            <DatePicker.RangeSelector
              allowClear
              rangeId={rangeId1}
              value={value1}
              onChange={(newValue, options) => {
                const rangeId = options?.rangeId
                console.log('修改:', newValue, rangeId)
                if (newValue) setValue1(newValue)
                setRangeId1(rangeId ?? null)
              }}
              onOk={() => {
                console.log('确认')
              }}
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}
