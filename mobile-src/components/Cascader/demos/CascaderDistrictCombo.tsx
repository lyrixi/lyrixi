import React, { useState, useEffect } from 'react'
import { Card, Divider, Page, Cascader, type CascaderItem } from 'lyrixi-mobile'

export default function CascaderDistrictComboDemo() {
  // 控件将会补充parentid和isDistrict, 所以顺序不能传错
  const [value1, setValue1] = useState<CascaderItem[]>([])
  const [value2, setValue2] = useState<CascaderItem[]>([])
  const [value3, setValue3] = useState<CascaderItem[]>([])
  const [value4, setValue4] = useState<CascaderItem[]>([])
  const [value5, setValue5] = useState<CascaderItem[]>([])
  const [value6, setValue6] = useState<CascaderItem[]>([])
  const [value7, setValue7] = useState<CascaderItem[]>([])
  const [value8, setValue8] = useState<CascaderItem[]>([])
  const [value9, setValue9] = useState<CascaderItem[]>([])

  useEffect(() => {
    setTimeout(() => {
      setValue1([
        {
          name: '中国',
          id: '86'
        },
        {
          name: '北京市',
          id: '110000'
        },
        {
          name: '东城区',
          id: '110101'
        },
        {
          name: 'Street1',
          id: '1'
        }
      ])
    }, 2000)
  }, [])
  return (
    <Page>
      <Page.Main>
        <Card>
          <Divider>formatter</Divider>
          <Cascader.DistrictCombo
            // type={'country'}
            formatter={(value: unknown) => {
              const v = value as CascaderItem[] | undefined
              if (!v?.length) {
                return ''
              }
              console.log('formatter value: ', v)
              return v
                .filter((item) => {
                  const t = item.type
                  return !Array.isArray(t) || !(t as string[]).includes('country')
                })
                .map((item) => item.name)
                .join('-')
            }}
            value={value1}
            onChange={(newValue) => {
              console.log('修改: ', newValue)
              setValue1(newValue as CascaderItem[])
            }}
            placeholder={'country'}
            allowClear
          />
        </Card>

        <Card>
          <Divider>province</Divider>
          <Cascader.DistrictCombo
            type={'province'}
            value={value2}
            onChange={(newValue) => {
              console.log('修改: ', newValue)
              setValue2(newValue as CascaderItem[])
            }}
            placeholder={'province'}
            allowClear
          />
        </Card>

        <Card>
          <Divider>city</Divider>
          <Cascader.DistrictCombo
            type={'city'}
            value={value3}
            onChange={(newValue) => {
              console.log('修改: ', newValue)
              setValue3(newValue as CascaderItem[])
            }}
            placeholder={'city'}
            allowClear
          />
        </Card>

        <Card>
          <Divider>district</Divider>
          <Cascader.DistrictCombo
            type={'district'}
            value={value4}
            onChange={(newValue) => {
              console.log('修改: ', newValue)
              setValue4(newValue as CascaderItem[])
            }}
            placeholder={'district'}
            allowClear
          />
        </Card>

        <Card>
          <Divider>street</Divider>
          <Cascader.DistrictCombo
            type={'street'}
            value={value5}
            onChange={(newValue) => {
              console.log('修改: ', newValue)
              setValue5(newValue as CascaderItem[])
            }}
            placeholder={'street'}
            allowClear
          />
        </Card>

        <Card>
          <Divider>searchVisible</Divider>
          <Cascader.DistrictCombo
            searchVisible
            type="province"
            value={value6}
            onChange={(newValue) => {
              console.log('修改: ', newValue)
              setValue6(newValue as CascaderItem[])
            }}
            placeholder={'searchVisible'}
            allowClear
          />
        </Card>
        <Card>
          <Divider>disabled</Divider>
          <Cascader.DistrictCombo
            disabled
            value={value7}
            onChange={(newValue) => {
              console.log('修改: ', newValue)
              setValue7(newValue as CascaderItem[])
            }}
            placeholder={'disabled'}
            allowClear
          />
        </Card>
        <Card>
          <Divider>min=&quot;city&quot;</Divider>
          <Cascader.DistrictCombo
            min="city"
            value={value8}
            onChange={(newValue) => {
              console.log('修改: ', newValue)
              setValue8(newValue as CascaderItem[])
            }}
            placeholder={'min'}
            allowClear
          />
        </Card>
        <Card>
          <Divider>zIndex</Divider>
          <Cascader.DistrictCombo
            value={value9}
            onChange={(newValue) => {
              console.log('修改: ', newValue)
              setValue9(newValue as CascaderItem[])
            }}
            placeholder={'zIndex'}
            allowClear
            maskStyle={{ zIndex: '9' }}
          />
        </Card>
      </Page.Main>
    </Page>
  )
}
