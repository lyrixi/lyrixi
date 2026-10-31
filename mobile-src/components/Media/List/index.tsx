import React from 'react'
import Item from './../Item'
import isAllowClear from './../utils/isAllowClear'

import type { MediaListMainProps } from '../types'

// 内库使用-start
import type { FileItem } from './../../../utils/Bridge/types'
// 内库使用-end

// 照片视频预览
const List = ({
  // Value & Display Value
  list, // [{id: '', fileName: '', fileThumbnail: '', fileUrl: '', status: 'choose|uploading|error|success'}]
  ellipsis,
  // Style
  itemStyle,
  ellipsisStyle,

  // Status
  allowClear,

  // Elements
  uploadingRender,
  itemRender,

  // Events
  onChange,
  onReUpload,
  onPreview // 是否支持单击预览, readOnly为true时才生效
}: MediaListMainProps) => {
  // Delete
  function handleDelete(item: FileItem, { index }: { index: number }) {
    const newList = list.filter((_photo, photoIndex) => {
      return photoIndex !== index
    })
    onChange?.(newList, { action: 'delete' })
  }

  const maxCountVisible = ellipsis?.maxCount

  return (
    <>
      {/* 图片列表 */}
      {list && list.length > 0
        ? list.map((item, index) => {
            if (maxCountVisible && index + 1 > maxCountVisible) return null

            // 判断当前项是否允许删除
            const canClear = isAllowClear(allowClear, item)

            return (
              <Item
                key={index}
                // Value & Display Value
                item={item}
                index={index}
                // Elements
                ellipsisText={
                  maxCountVisible && index === maxCountVisible - 1
                    ? `+${list.length - maxCountVisible + 1}`
                    : null
                }
                style={itemStyle}
                ellipsisStyle={ellipsisStyle}
                uploadingRender={uploadingRender}
                itemRender={itemRender}
                // Events
                onDelete={canClear ? handleDelete : undefined}
                onReUpload={onReUpload}
                onPreview={onPreview}
              />
            )
          })
        : null}
    </>
  )
}
export default List
