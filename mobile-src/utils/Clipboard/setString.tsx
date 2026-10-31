import React from 'react'
import Clipboard from './Clipboard'

// 内库使用-start
import LocaleUtil from './../LocaleUtil'
import Toast from './../../components/Toast'
import Message from './../../components/Message'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Toast, Message } from 'lyrixi-mobile'
测试使用-end */

// 复制连接
function setString(url: string, opts?: { onSuccess?: () => void; onError?: () => void }) {
  const { onSuccess, onError } = opts || {}
  Clipboard.copy(url, {
    onSuccess: () => {
      if (onSuccess) {
        onSuccess()
      } else {
        Toast.open({
          content: LocaleUtil.locale(
            '已复制到剪贴板',
            'lyrixi_4fb42e6eb1ba1f834e82ddef4adf2115'
          ) as string
        })
      }
    },
    onError: () => {
      if (onError) {
        onError()
      } else {
        Message.open({
          maskStyle: {
            zIndex: 100
          },
          title: LocaleUtil.locale('提示', 'lyrixi_02d9819ddaaaeb1b7b22b12608c7e5ca', undefined),
          content: (
            <>
              {LocaleUtil.locale(
                '复制到剪贴板失败, 请长按复制',
                'lyrixi_994313c7644d8ee13aa1570c6e2a6fc3'
              )}
              <br />
              {url}
            </>
          ),
          buttons: [
            {
              name: '确定',
              className: 'lyrixi-primary',
              onClick: () => true
            }
          ]
        })
      }
    }
  })
}

export default setString
