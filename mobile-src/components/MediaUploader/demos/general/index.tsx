import React, { useRef, useState } from 'react'
import vconsole from 'vconsole'
import { MediaUploader, Page, Toast, type MediaHandle, type FileItem } from 'lyrixi-mobile'
import uploadListUtil from './../../utils/uploadList'

new vconsole()

export default function MediaUploaderGeneralDemo() {
  const imageUploaderRef = useRef<MediaHandle | null>(null)
  const [list, setList] = useState<FileItem[]>([
    {
      fileThumbnail: 'https://lyrixi.github.io/lyrixi/assets/test/1.jpg',
      fileUrl: 'https://lyrixi.github.io/lyrixi/assets/test/1.jpg',
      filePath: '/lyrixi-mobile/assets/test/1.jpg',
      status: 'error'
    },
    {
      fileThumbnail: 'https://lyrixi.github.io/lyrixi/assets/test/1.jpg',
      fileUrl: 'https://lyrixi.github.io/lyrixi/assets/test/1.jpg',
      filePath: '/lyrixi-mobile/assets/test/1.jpg'
    }
  ])

  function handlePhotoChange(newList: FileItem[]) {
    console.log('update:', newList)
    setList(newList)
  }

  async function handleAsyncUploadList() {
    const run = imageUploaderRef.current?.uploadList
    if (typeof run !== 'function') return
    const newList = await run()
    console.log('newList:', newList)
  }

  async function handleAsyncUploader() {
    const newList = await uploadListUtil(list, { platform: 'browser' })
    setList(Array.isArray(newList) ? newList : [])
  }

  async function handleValidate() {
    const failed = list.filter((i) => i.status === 'error' || i.status === 'uploading')
    if (failed.length) {
      Toast.open({ content: '存在未成功项，请检查后重试' })
    } else {
      Toast.open({ content: '状态正常' })
    }
  }

  return (
    <Page>
      <Page.Header className="lyrixi-text-center">普通拍照</Page.Header>
      <Page.Main className="lyrixi-bg-white">
        <MediaUploader
          platform="browser"
          uploadPlacement="start"
          ref={imageUploaderRef}
          sizeType={['compressed']}
          sourceType={['camera', 'album']}
          list={list}
          maxCount={4}
          onChange={handlePhotoChange}
          uploadRender={
            <div style={{ width: '100%', height: '100%', backgroundColor: 'ref' }}>1</div>
          }
        />
        <div style={{ height: '50px', background: '#f8f8f8' }} onClick={handleAsyncUploadList}>
          imageUploaderRef.current.uploadList
        </div>
        <div style={{ height: '50px', background: '#f8f8f8' }} onClick={handleAsyncUploader}>
          uploadList
        </div>
        <div style={{ height: '50px', background: '#f8f8f8' }} onClick={handleValidate}>
          校验列表状态
        </div>
      </Page.Main>
    </Page>
  )
}
