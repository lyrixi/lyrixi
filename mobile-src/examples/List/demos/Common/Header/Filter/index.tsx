import React, { useEffect, useRef, useState } from 'react'

import { FooterBar, Form, Input, LocaleUtil, ToolBar } from 'lyrixi-mobile'

import type { FormRef } from 'lyrixi-mobile'
import type {
  FilterHeaderProps,
  ToolBarFilterFooterRenderParams,
  ToolBarFilterModalRenderParams,
  ToolBarFilterProps
} from './types'

const locale = LocaleUtil.locale

function Filter({ queryParams, onSearch }: FilterHeaderProps) {
  const modifiedRef = useRef(false)
  const formRef = useRef<FormRef>(null)

  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)

  // 显示弹窗时需要还原值
  useEffect(() => {
    if (!visible) return
    formRef.current?.setFieldsValue({
      keyword: queryParams?.keyword || '',
      input: queryParams?.input || ''
    })
    // eslint-disable-next-line
  }, [visible])

  const handleOpen = () => {
    setVisible(true)
  }

  const handleClose = () => {
    setVisible(false)
  }

  const handleConfirm = (onClose: () => void) => {
    const values = formRef.current?.getFieldsValue() || {}
    setActive(!!modifiedRef.current)
    onSearch?.({ ...queryParams, ...values })
    onClose()
  }

  const handleFieldsChange = () => {
    modifiedRef.current = true
  }

  const filterProps = {
    square: true,
    color: active ? 'primary' : 'default',
    onOpen: handleOpen,
    onClose: handleClose,
    modalRender: ({ onClose: _onClose }: ToolBarFilterModalRenderParams) => {
      return (
        <Form
          ref={formRef}
          label={{ span: 24 }}
          content={{ span: 24 }}
          onFieldsChange={handleFieldsChange}
          style={{ marginLeft: '12px' }}
        >
          <Form.Item>
            <Form.Label>{String(locale('单行文本框'))}</Form.Label>
            <Form.Field name="input">
              <Input.Text allowClear placeholder={String(locale('请输入'))} maxLength={50} />
            </Form.Field>
          </Form.Item>
        </Form>
      )
    },
    footerRender: (params: ToolBarFilterFooterRenderParams) => {
      const close = () => {
        params.onClose?.()
      }
      return (
        <FooterBar>
          <FooterBar.Button block variant="filled" color="default" onClick={close}>
            {String(locale('取消'))}
          </FooterBar.Button>
          <FooterBar.Button
            block
            variant="solid"
            color="primary"
            onClick={() =>
              handleConfirm(() => {
                params.onClose?.()
              })
            }
          >
            {String(locale('确定'))}
          </FooterBar.Button>
        </FooterBar>
      )
    }
  } as unknown as ToolBarFilterProps

  return <ToolBar.Filter {...filterProps} />
}

export default Filter
