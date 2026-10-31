import React, { useEffect, useState, useRef } from 'react'
import { Toast, Page, Divider, Bridge, Button, Attach } from 'lyrixi-mobile'
import type { FileItem, AttachRef } from 'lyrixi-mobile'

export default function AttachDemo2() {
  const uploadRef = useRef<AttachRef | null>(null)
  const [list, setList] = useState<FileItem[]>([
    {
      fileName: '1',
      fileUrl: 'https://lyrixi.github.io/lyrixi/assets/images/logo.png',
      status: 'error'
    },
    {
      fileName: '2',
      fileUrl: 'https://lyrixi.github.io/lyrixi/assets/images/logo.png',
      status: 'success'
    }
  ])

  const [customList, setCustomList] = useState<FileItem[]>([])

  useEffect(() => {
    Bridge.load({ onSuccess: () => console.log('加载桥接') })
  }, [])

  // 异步上传
  async function handleAsyncUpload() {
    const isOK = Attach.validateListStatus(list)
    if (isOK !== true) {
      Toast.open({
        content: typeof isOK === 'string' ? isOK : String(isOK ?? '')
      })
      const el = uploadRef.current
      if (el) {
        const result = await el.uploadList(undefined, { action: 'upload' })
        console.log('上传结果：', result)
      }
      return
    }
  }

  return (
    <Page className="lyrixi-full lyrixi-bg-white">
      <Page.Main>
        <Divider>Default Attach</Divider>
        <Attach
          ref={uploadRef}
          reUpload={false}
          allowChoose
          allowClear
          uploadPlacement="start"
          maxSize={300 * 1024 * 1024}
          list={list}
          maxCount={9}
          onChange={(newList) => {
            console.log('修改:', newList)
            setList(newList)
          }}
          onUpload={(item) => {
            console.log(item)
            return item
          }}
        />
        <Divider>Custom Attach</Divider>
        <Attach
          className="custom-upload"
          reUpload={false}
          allowChoose
          allowClear
          uploadPlacement="start"
          maxSize={300 * 1024 * 1024}
          list={customList}
          maxCount={9}
          onChange={(newList) => {
            console.log('修改:', newList)
            setCustomList(newList)
          }}
          onUpload={(item) => {
            console.log(item)
            return item
          }}
        >
          {Array.isArray(customList) && customList.length ? (
            <Attach.List
              list={customList}
              onPreview={() => {
                console.log('preview')
                return false
              }}
            />
          ) : (
            'Custom Attach Render'
          )}
        </Attach>
      </Page.Main>
      <Page.Footer>
        <Button className="lyrixi-flex" color="primary" onClick={handleAsyncUpload}>
          Sync Attach
        </Button>
      </Page.Footer>
    </Page>
  )
}
