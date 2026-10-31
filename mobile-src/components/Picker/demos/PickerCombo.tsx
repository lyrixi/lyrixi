import React, { useEffect, useRef, useState } from 'react'
import { Card, Page, Picker, type PickerComboRef, type PickerItem } from 'lyrixi-mobile'

const largeList: PickerItem[] = Array.from({ length: 200 }, (_, index) => {
  const id = String(index + 1)
  return { id, name: `选项 ${id}` }
})

const multiColumnList: PickerItem[][] = [
  [
    { id: 'am', name: '上午' },
    { id: 'pm', name: '下午' },
    { id: 'night', name: '晚上' }
  ],
  Array.from({ length: 12 }, (_, index) => {
    const hour = index + 1
    return { id: `h-${hour}`, name: `${hour} 点` }
  }),
  Array.from({ length: 60 }, (_, index) => {
    const minute = String(index).padStart(2, '0')
    return { id: `m-${index}`, name: `${minute} 分` }
  })
]

export default function PickerComboDemo() {
  const pickerRef = useRef<PickerComboRef | null>(null)
  const [list, setList] = useState<PickerItem[]>([])
  const [value, setValue] = useState<PickerItem[] | null>(null)
  const [multiValue, setMultiValue] = useState<PickerItem[] | null>([
    { id: 'pm', name: '下午' },
    { id: 'h-3', name: '3 点' },
    { id: 'm-30', name: '30 分' }
  ])
  const [largeValue, setLargeValue] = useState<PickerItem[] | null>([{ id: '88', name: '选项 88' }])

  useEffect(() => {
    setTimeout(() => {
      console.log('pickerRef:', pickerRef)
      setList([
        { id: '1', name: '1' },
        { id: '2', name: '2' },
        { id: '3', name: '3' },
        { id: '4', name: '4' },
        { id: '5', name: '5' },
        { id: '6', name: '6' },
        { id: '7', name: '7' },
        { id: '8', name: '8' },
        { id: '9', name: '9' },
        { id: '10', name: '10' }
      ])
      setValue([{ id: '2', name: '2' }])
    }, 2000)
  }, [])

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>单列（异步加载）</Card.Header>
          <Card.Main>
            <Picker.Combo
              ref={pickerRef}
              allowClear
              safeArea
              title="标题"
              cancel={null}
              ok=""
              placeholder="Please select"
              value={value}
              list={list}
              onChange={(newValue) => {
                console.log('onChange:', newValue)
                setValue(newValue)
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>多列（时段 / 时 / 分）</Card.Header>
          <Card.Main>
            <Picker.Combo
              allowClear
              safeArea
              title="选择时间"
              placeholder="请选择时段、时、分"
              separator=" "
              value={multiValue}
              list={multiColumnList}
              onChange={(newValue) => {
                console.log('multi onChange:', newValue)
                setMultiValue(newValue)
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>大数据量（200 项）</Card.Header>
          <Card.Main>
            <Picker.Combo
              allowClear
              safeArea
              title="选择选项"
              placeholder="请选择"
              value={largeValue}
              list={largeList}
              onChange={(newValue) => {
                console.log('large onChange:', newValue)
                setLargeValue(newValue)
              }}
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}
