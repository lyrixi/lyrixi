import React, { type MouseEvent } from 'react'

import type { MediaItemProps } from './Media.Item.types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

import Img from './Img'
import Uploading from './../Uploading'
import Reload from './Reload'
import Delete from './Delete'
import Ellipsis from './Ellipsis'

// 照片视频预览
const Item = ({
  // Value & Display Value
  item,
  index,
  ellipsisText,
  // Style
  style,
  ellipsisStyle,

  // Elements
  uploadingRender,
  itemRender,

  // Events
  onDelete,
  onReUpload,
  onPreview // 是否支持单击预览, readOnly为true时才生效
}: MediaItemProps) => {
  return (
    <div
      id={typeof item.id === 'string' ? item.id : undefined}
      // Elements
      data-index={index}
      // Style, 状态status: choose|uploading|error|success
      style={style}
      className={DOMUtil.classNames(
        'lyrixi-media-item',
        typeof item.className === 'string' ? item.className : null,
        `lyrixi-${item.status}`
      )}
      // Events
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        onPreview?.(item, { index })
      }}
    >
      {/* 缩略图 */}
      {item?.localFile?.tempFileThumbnail || item?.fileThumbnail ? (
        <Img
          reloadKey={item?.reloadKey}
          fileUrl={String(item?.localFile?.tempFileThumbnail || item?.fileThumbnail || '')}
        />
      ) : null}

      {/* 重新上传图标 */}
      <Reload
        id={typeof item.id === 'string' ? `${item.id}-reload` : undefined}
        onClick={() => {
          onReUpload?.(item, { index })
        }}
      />

      {/* 上传中 */}
      <Uploading uploadingType="item" item={item} uploadingRender={uploadingRender} />

      {/* 删除按钮 */}
      {onDelete && (
        <Delete
          id={typeof item.id === 'string' ? `${item.id}-delete` : undefined}
          onClick={() => {
            onDelete(item, { index })
          }}
        />
      )}

      {ellipsisText ? <Ellipsis text={ellipsisText} style={ellipsisStyle} /> : null}

      {itemRender?.(item)}
    </div>
  )
}
export default Item
