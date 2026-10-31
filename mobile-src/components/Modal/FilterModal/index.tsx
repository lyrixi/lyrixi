import React, { forwardRef, type MouseEvent } from 'react'
import Modal from './../Modal'
import NavBar from './../NavBarModal/NavBar'

import type { ModalFilterModalProps, ModalFilterModalRef } from '../types'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Page from './../../Page'
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Page, NavBar } from 'lyrixi-mobile'
测试使用-end */

// 侧边查询
const FilterModal = forwardRef<ModalFilterModalRef, ModalFilterModalProps>(
  (
    {
      // Value & Display Value
      id,
      // Status
      open,
      maskClosable,

      // Style
      safeArea,
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,

      // Elements
      portal,
      children,
      footerRender,

      // Events
      onClose,
      onCancel
    },
    ref
  ) => {
    return (
      <Modal
        id={id}
        ref={ref}
        safeArea={safeArea}
        portal={portal}
        open={open}
        animation="slideLeft"
        // Style
        maskClosable={maskClosable}
        maskClassName={DOMUtil.classNames('lyrixi-mask-filter', maskClassName)}
        maskStyle={maskStyle}
        modalClassName={DOMUtil.classNames('lyrixi-modal-filter', modalClassName)}
        modalStyle={modalStyle}
        // Events
        onClose={onClose}
      >
        <Page className="lyrixi-full lyrixi-bg-white">
          <Page.Header className="lyrixi-bg-default">
            <NavBar
              title={LocaleUtil.locale('筛选', 'lyrixi_c2fe6253c4ca802cf2230b0b5e15eb25')}
              cancel={LocaleUtil.locale('取消', 'lyrixi_625fb26b4b3340f7872b411f401e754c')}
              onCancel={(e: MouseEvent<HTMLDivElement>) => {
                e.stopPropagation()

                onCancel?.()
                onClose?.()
              }}
            />
          </Page.Header>
          <Page.Main>{children}</Page.Main>
          {/* 底部 */}
          {typeof footerRender === 'function' ? footerRender({ onClose }) : null}
        </Page>
      </Modal>
    )
  }
)
export default FilterModal
