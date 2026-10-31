import React, { useEffect, useState, useRef } from 'react'
import {
  Page,
  Divider,
  Bridge,
  Media,
  HistoryUtil,
  type MediaRef,
  type FileItem
} from 'lyrixi-mobile'
// import VConsole from 'vconsole'
// new VConsole()

export default function MediaDemo() {
  const imageUploaderRef = useRef<MediaRef | null>(null)

  const [list, setList] = useState<FileItem[]>([
    {
      id: '1',
      fileThumbnail: 'https://lyrixi.github.io/lyrixi/assets/images/logo.png?id=1',
      fileUrl: 'https://lyrixi.github.io/lyrixi/assets/images/logo.png?id=1',
      fileType: 'image',
      status: 'error'
    },
    {
      id: '2',
      fileThumbnail: 'https://macqj.oss-cn-beijing.aliyuncs.com/2024/12/248300cfc75e100.jpg',
      fileUrl: 'https://macqj.oss-cn-beijing.aliyuncs.com/2024/12/248300cfc75e100.jpg',
      fileType: 'image'
      // status: 'uploading'
    },
    {
      id: '3',
      fileThumbnail:
        'https://thumbs.dreamstime.com/z/mobile-phone-wallpaper-serene-forest-path-sunlight-vibrant-greenery-354017056.jpg?ct=jpeg',
      fileUrl:
        'https://thumbs.dreamstime.com/z/mobile-phone-wallpaper-serene-forest-path-sunlight-vibrant-greenery-354017056.jpg?ct=jpeg',
      fileType: 'image'
      // status: 'uploading'
    },
    {
      id: '4',
      fileThumbnail: 'https://lyrixi.github.io/lyrixi/assets/images/logo.png?id=4',
      fileUrl: 'https://lyrixi.github.io/lyrixi/assets/images/logo.png?id=4',
      fileType: 'image'
    },
    {
      id: '5',
      fileThumbnail: 'https://lyrixi.github.io/lyrixi/assets/images/logo.png?id=5',
      fileUrl: 'https://lyrixi.github.io/lyrixi/assets/test/1.mp4?id=5',
      fileType: 'video',
      status: 'success'
    },
    {
      id: '6',
      fileThumbnail: 'https://lyrixi.github.io/lyrixi/assets/images/logo.png?id=6',
      fileUrl: 'https://lyrixi.github.io/lyrixi/assets/test/1.mp4?id=6',
      fileType: 'video',
      status: 'error'
    }
  ])

  useEffect(() => {
    Bridge.load({
      onSuccess: () => {
        console.log('加载桥接')
      }
    } as Record<string, unknown>)
  }, [])

  return (
    <Page>
      <Page.Main>
        <Divider>Default Media</Divider>
        <Media
          // async
          // reUpload={false}

          // Default
          allowClear
          allowChoose
          uploadPlacement="start"
          sizeType={['compressed']}
          sourceType={['camera', 'album']}
          list={list}
          maxCount={9}
          onFileChange={(items: FileItem[]): FileItem[] => {
            console.log('localFile:', items)
            return items
          }}
          onChange={(newList) => {
            console.log('修改:', newList)
            setList(newList)
          }}
        />

        <Divider>Preview Operate</Divider>
        <Media
          ref={imageUploaderRef}
          allowChoose={list?.length ? false : true}
          ellipsis={{ maxCount: 1 }}
          itemStyle={{ width: 32, height: 32, borderRadius: 6 }}
          chooseIconSize={12}
          ellipsisStyle={{ fontSize: 12 }}
          previewAllowChoose={true}
          previewAllowClear={true}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onPreview={(_item, _index) => {
            HistoryUtil.navigate('imagePreview=1', {
              onBack: () => {
                imageUploaderRef.current?.setPreviewVisible(null)
              }
            })
            return 'browser'
          }}
          // Preview operate: end
          sizeType={['compressed']}
          sourceType={['camera', 'album']}
          list={list}
          maxCount={9}
          onFileChange={(localFiles) => {
            return localFiles.map((localFile) => ({
              status: 'choose',
              localFile: localFile,
              fileThumbnail: localFile.fileUrl,
              fileUrl: localFile.fileUrl,
              fileType: localFile.fileType
            }))
          }}
          onChange={(newList) => {
            console.log('修改:', newList)
            setList(newList)
          }}
        />
      </Page.Main>
    </Page>
  )
}
