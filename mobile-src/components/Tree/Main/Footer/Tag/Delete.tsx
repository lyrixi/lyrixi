import React from 'react'

import type { TreeMainTagDeleteProps } from './Tree.Main.Tag.Delete.types'

// 内库使用-start
import Icon from '../../../../Icon'
import Icons from '../../../../../icons'
// 内库使用-end

function Delete({ onClick }: TreeMainTagDeleteProps) {
  return (
    <Icon
      className="lyrixi-tree-footer-tag-close"
      svg={Icons.Close}
      size="xxs"
      // variant="solid"
      color="secondary"
      radius="100%"
      style={{ padding: 2 }}
      onClick={onClick}
    />
  )
}

export default Delete
