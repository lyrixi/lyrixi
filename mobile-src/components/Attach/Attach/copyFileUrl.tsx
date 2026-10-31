// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

// 内库使用-start
import Clipboard from './../../../utils/Clipboard'
// 内库使用-end

/* 测试使用-start
import { Clipboard, LocaleUtil, Message, Toast } from 'lyrixi-mobile'
测试使用-end */

function copyFileUrl(fileUrl: string) {
  Clipboard.setString(fileUrl)
}

export default copyFileUrl
