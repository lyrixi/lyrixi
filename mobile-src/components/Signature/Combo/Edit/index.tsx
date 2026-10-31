import React, { useImperativeHandle, forwardRef, useRef } from 'react'

import type { SignatureComboEditProps, SignatureComboEditRef } from './Signature.Combo.Edit.types'

import Thumbnail from './Thumbnail'

// 内库使用-start
import Icon from '../../../Icon'
import Icons from '../../../../icons'
// 内库使用-end

// 照片视频预览
const Edit = forwardRef<SignatureComboEditRef, SignatureComboEditProps>(
  (
    {
      value,

      // Events
      onDelete,
      onPreview
    },
    ref
  ) => {
    const comboRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return comboRef?.current
        }
      }
    })

    return (
      <div ref={comboRef} className="lyrixi-signature-edit-container">
        {/* Elements: Thumbnail */}
        <Thumbnail
          // Value & Display Value
          src={value}
          // Events
          onPreview={onPreview}
        />

        {/* Elements: Delete Button */}
        {typeof onDelete === 'function' && (
          <div
            className="lyrixi-signature-edit-image-delete"
            // Events
            onClick={(e) => {
              e.stopPropagation()

              onDelete('')
            }}
          >
            <Icon
              svg={Icons.Close}
              size="xxxs"
              color="white"
              className="lyrixi-signature-edit-image-delete-icon"
            />
          </div>
        )}
      </div>
    )
  }
)
export default Edit
