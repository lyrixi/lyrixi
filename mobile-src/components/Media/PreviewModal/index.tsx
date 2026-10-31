import React, { useEffect, forwardRef } from 'react'
import PreviewMain from './../PreviewMain'

import type { MediaPreviewMainRef, MediaPreviewModalProps } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import Page from './../../Page'
import NavBarModal from './../../Modal/NavBarModal'
// 内库使用-end

/* 测试使用-start
import { Page, Modal } from 'lyrixi-mobile'
const NavBarModal = Modal.NavBarModal
测试使用-end */

const PreviewModal = forwardRef<MediaPreviewMainRef, MediaPreviewModalProps>(
  (
    {
      // Value & Display Value
      id,
      list,
      index: externalIndex,
      current,
      mediaType,
      maxCount,
      sourceType = ['album', 'camera'],
      sizeType = ['compressed'],
      maxDuration,
      compressConfig,
      // Status
      open,
      // Value & Display Value
      allowChoose = false,
      // Status
      allowClear = false,
      // Style
      mainStyle,
      mainClassName,
      // Status
      safeArea,
      // Style
      navBarStyle,
      navBarClassName,
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,
      // Elements
      portal,
      // Value & Display Value
      cancelPlacement = 'right',
      // Events
      onBeforeChoose,
      onChoose,
      onFileChange,
      onUpload,
      onChange,
      onClose
    },
    ref
  ) => {
    const index = externalIndex ?? current

    useEffect(() => {
      if (!list?.length || !list[0]?.fileUrl) {
        if (open) {
          onClose?.()
        }
      }
      // eslint-disable-next-line
    }, [list])

    function handleClose() {
      onClose?.()
    }

    return (
      <NavBarModal
        id={id}
        open={open}
        safeArea={safeArea}
        navBarStyle={navBarStyle}
        navBarClassName={navBarClassName}
        modalStyle={modalStyle}
        modalClassName={DOMUtil.classNames('lyrixi-modal-media-preview', modalClassName)}
        maskStyle={maskStyle}
        maskClassName={DOMUtil.classNames('lyrixi-mask-media-preview', maskClassName)}
        portal={portal}
        cancelPlacement={cancelPlacement}
        onClose={handleClose}
      >
        <Page.Main>
          <PreviewMain
            ref={ref}
            list={list}
            index={index}
            mediaType={mediaType}
            maxCount={maxCount}
            sourceType={sourceType}
            sizeType={sizeType}
            maxDuration={maxDuration}
            compressConfig={compressConfig}
            open={open}
            closable={false}
            allowChoose={allowChoose}
            allowClear={allowClear}
            className={mainClassName}
            style={mainStyle}
            onBeforeChoose={onBeforeChoose}
            onChoose={onChoose}
            onFileChange={onFileChange}
            onUpload={onUpload}
            onChange={onChange}
            onClose={onClose}
          />
        </Page.Main>
      </NavBarModal>
    )
  }
)
export default PreviewModal
