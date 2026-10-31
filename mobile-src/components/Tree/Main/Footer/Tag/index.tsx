import React from 'react'
import type { TreeMainTagProps } from './Tree.Main.Tag.types'

// 内库使用-start
import DOMUtil from '../../../../../utils/DOMUtil'
import Button from '../../../../Button'
import Icon from '../../../../Icon'
import Delete from './Delete'
// 内库使用-end

function Tag({ formatViewItem, item, index, onDelete }: TreeMainTagProps) {
  const _avatarRender = () => {
    const { avatarSvg, avatarUrl } = formatViewItem(item, { index })

    if (avatarSvg) {
      return <Icon svg={avatarSvg} color="quaternary" size="xs" className="lyrixi-button-icon" />
    }
    if (avatarUrl && typeof avatarUrl === 'string') {
      return <Icon src={avatarUrl} size="xs" className="lyrixi-button-icon" />
    }
    return null
  }

  return (
    <Button
      className={DOMUtil.classNames('lyrixi-tree-footer-tag')}
      size="s"
      radius="s"
      variant="filled"
      color="default"
    >
      {_avatarRender()}
      <Button.Text>{item.name}</Button.Text>
      <Delete
        onClick={(e) => {
          e.stopPropagation()
          onDelete?.(item)
        }}
      />
    </Button>
  )
}

export default Tag
