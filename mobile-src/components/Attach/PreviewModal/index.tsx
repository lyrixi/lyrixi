import React, { forwardRef } from 'react'
import PreviewMain from './../PreviewMain'

import type { AttachPreviewModalProps } from './Attach.PreviewModal.types'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Clipboard from './../../../utils/Clipboard'
import NavBarModal from './../../Modal/NavBarModal'
import type { ModalRef } from './../../Modal/types'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil,Clipboard, Message, Toast, Modal } from 'lyrixi-mobile'
const NavBarModal = Modal.NavBarModal
测试使用-end */

// Modal
const AttachPreviewModal = forwardRef<ModalRef, AttachPreviewModalProps>(
  (
    { fileName, previewServerUrl, fileUrl, previewServerSourceType, open, portal, onClose },
    ref
  ) => {
    // 事件
    async function handleOk() {
      if (typeof fileUrl !== 'string' || !fileUrl) {
        return
      }
      Clipboard.setString(fileUrl)
    }

    return (
      <NavBarModal
        ref={ref}
        portal={portal}
        title={LocaleUtil.locale('附件预览', 'lyrixi_cce640e22bea3f02bd4a8c8c67500f57')}
        ok={LocaleUtil.locale('复制链接', 'lyrixi_879058ce06da016f3e2f79bdedc3e6b8')}
        okVisible={true}
        onOk={handleOk}
        open={open}
        onClose={onClose}
      >
        <PreviewMain
          fileName={fileName}
          fileUrl={fileUrl}
          previewServerUrl={previewServerUrl}
          previewServerSourceType={previewServerSourceType}
        />
      </NavBarModal>
    )
  }
)

export default AttachPreviewModal
