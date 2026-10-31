import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import Uploading from './../Uploading'

import type { AttachButtonProps, AttachButtonRef } from '../types/Attach.Button.types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import LocaleUtil from './../../../utils/LocaleUtil'
import Icons from '../../../icons'
import Button from './../../Button'
import type { ButtonRef } from './../../Button/types'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, LocaleUtil, Icons, Button } from 'lyrixi-mobile'
测试使用-end */

// 上传按钮
const UploadButton = forwardRef<AttachButtonRef, AttachButtonProps>(
  ({ uploadingRender, style, className, disabled }, ref) => {
    const buttonRef = useRef<ButtonRef | null>(null)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return buttonRef.current?.element ?? null
        }
      }
    })

    return (
      <Button
        ref={buttonRef}
        style={style}
        className={DOMUtil.classNames('lyrixi-attach-choose-button', className)}
        variant="filled"
        disabled={disabled}
      >
        <Button.Icon
          svg={Icons.Plus}
          size="xxxs"
          className="lyrixi-attach-choose-icon lyrixi-attach-choose-icon-add"
        />

        {/* Loading图标 */}
        <Uploading
          uploadingType="choose"
          uploadingRender={uploadingRender}
          className="lyrixi-attach-choose-icon"
        />

        {/* 文字 */}
        <div className="lyrixi-attach-choose-button-label">
          {LocaleUtil.locale('附件', 'lyrixi_c9a6ee90f5d43732e3f6cf4dcaa8493c')}
        </div>
      </Button>
    )
  }
)

export default UploadButton
