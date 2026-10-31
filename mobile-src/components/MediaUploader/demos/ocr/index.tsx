import React, { useState } from 'react'
import vconsole from 'vconsole'
import { Page, MediaUploader, FileItem, Bridge } from 'lyrixi-mobile'

Bridge.load({})

new vconsole()
export default function MediaUploaderOcrDemo() {
  const [list, setList] = useState<FileItem[]>([
    {
      fileThumbnail: 'https://lyrixi.github.io/lyrixi/assets/test/1.jpg',
      fileUrl: 'https://lyrixi.github.io/lyrixi/assets/test/1.jpg',
      filePath: '/lyrixi-mobile/assets/test/1.jpg'
    }
  ])

  function handlePhotoChange(newList: FileItem[]) {
    // setList(
    //   newList.map((item) => {
    //     if (item.ocrResult) item.ocr_result = item.ocrResult
    //     if (item.filePath) item.image_path = item.filePath
    //     return item
    //   })
    // )
    setList(newList)
  }
  return (
    <Page>
      <Page.Header className="lyrixi-text-center">OCR识别</Page.Header>
      <Page.Main className="lyrixi-bg-white">
        <MediaUploader
          sizeType={['compressed']}
          sourceType={['camera']}
          list={list}
          maxCount={15}
          onChange={handlePhotoChange}
        />
      </Page.Main>
    </Page>
  )
}
