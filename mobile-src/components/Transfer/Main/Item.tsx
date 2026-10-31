import React from 'react'

import type { TransferItemProps } from './../types'

// 内库使用-start
import Icon from '../../Icon'
import Icons from '../../../icons'
// 内库使用-end

// 单项
const Item = ({
  // Value & Display Value
  id,
  children,
  sortable,
  onAdd,
  onDelete
}: TransferItemProps) => {
  return (
    <div className="lyrixi-transfer-item">
      {/* Elements: Operate */}
      <div
        id={id}
        className="lyrixi-transfer-item-operate"
        onClick={() => {
          if (onAdd) onAdd()
          else onDelete?.()
        }}
      >
        {onAdd ? (
          <Icon
            svg={Icons.CirclePlus}
            size="xxs"
            className="lyrixi-transfer-item-operate-icon lyrixi-add"
          />
        ) : (
          <Icon
            svg={Icons.CircleMinus}
            size="xxs"
            className="lyrixi-transfer-item-operate-icon lyrixi-delete"
          />
        )}
      </div>

      {/* Elements: Content */}
      <div className="lyrixi-transfer-item-content">{children}</div>

      {/* Elements: Drop Handle */}
      {sortable ? (
        <div className="lyrixi-transfer-item-drop">
          <Icon svg={Icons.TransferDrop} size="xxxs" className="lyrixi-transfer-item-drop-icon" />
        </div>
      ) : null}
    </div>
  )
}
export default Item
