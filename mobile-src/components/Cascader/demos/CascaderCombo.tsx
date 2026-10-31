import React, { useState } from 'react'
import { Page, Cascader, Loading, type CascaderItem, type LoadDataResult } from 'lyrixi-mobile'

export default function CascaderComboDemo() {
  const [value, setValue] = useState<CascaderItem[]>([
    {
      id: '1',
      name: '根节点',
      parentid: null
    },
    {
      id: '1-1',
      name: '子节点',
      parentid: '1'
    },
    {
      parentid: '1-1',
      name: '孙子节点',
      id: '1-1-1',
      isLeaf: true
    }
  ])

  function loadData(
    tabs: CascaderItem[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ctx: { list: CascaderItem[] }
  ): Promise<LoadDataResult> {
    return new Promise((resolve) => {
      console.log('loadData:', tabs)
      Loading.open()
      const lastTab = tabs?.[tabs.length - 1]
      const leaves: CascaderItem[] = [
        {
          parentid: lastTab?.id,
          name: '孙子节点1',
          id: '1-1-1',
          isLeaf: true
        },
        {
          parentid: lastTab?.id,
          name: '孙子节点2',
          id: '1-1-2',
          isLeaf: true
        }
      ]
      setTimeout(() => {
        Loading.close()
      }, 100)
      resolve({
        status: 'success',
        data: { list: leaves }
      })
    })
  }

  return (
    <Page>
      <Page.Main>
        <Cascader.Combo
          list={[
            {
              id: '1',
              name: '根节点',
              children: [
                {
                  id: '1-1',
                  name: '子节点'
                }
              ]
            }
          ]}
          loadData={loadData}
          value={value}
          placeholder="Select"
          onChange={(newValue) => {
            console.log('修改:', newValue)
            setValue(newValue as CascaderItem[])
          }}
          safeArea
          title="级联选择"
        />
      </Page.Main>
    </Page>
  )
}
