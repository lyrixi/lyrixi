import React from 'react'

import Item from './../Item'

import type { AttachListProps } from './../types'

// 内库使用-start
import type { FileItem } from '../../../utils/Bridge/types'
import Media from './../../Media'
// 内库使用-end

/* 测试使用-start
import { Media } from 'lyrixi-mobile'
测试使用-end */

// File List
const List = ({
  // Value & Display Value
  list, // [{ fileName: '文件名', fileUrl: '全路径', status: 'choose|uploading|error|success'}]

  // Status
  allowClear,

  // Elements
  uploadingRender,
  itemRender,

  // Events
  onChange,
  onReUpload,
  onPreview // 是否支持单击预览, readOnly为true时才生效
}: AttachListProps) => {
  // Delete
  function handleDelete(item: FileItem, { index }: { index: number }) {
    const newList = (list ?? []).filter((attach, attachIndex) => {
      return attachIndex !== index
    })
    onChange?.(newList, { action: 'delete' })
  }

  return (
    <>
      {/* 列表 */}
      {list &&
        list.length > 0 &&
        list.map((item, index) => {
          // 判断当前项是否允许删除
          const canClear = typeof onChange === 'function' && Media.isAllowClear(allowClear, item)

          return (
            <Item
              key={index}
              item={item}
              index={index}
              uploadingRender={uploadingRender}
              itemRender={itemRender}
              onDelete={canClear ? handleDelete : null}
              onReUpload={onReUpload}
              onPreview={onPreview}
            />
          )
        })}
    </>
  )
}

export default List
