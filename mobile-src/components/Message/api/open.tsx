import React, { useEffect, useState } from 'react'
// 内库使用-start
import { createRoot } from '../../../utils/ReactDOMClientCompat'
// 内库使用-end

import close from './close'
import { MESSAGE_ENTRANCE_ACTIVE_DELAY, MESSAGE_ID } from './constants'
import messageInstance from './MessageInstance'
import MessageModal from '../Modal'

import type { MessageComboProps } from '../types'

type MessageOpenProps = Omit<MessageComboProps, 'children'>

function OpenMessage(props: Omit<MessageOpenProps, 'portal'>) {
  const { className, style, onOpen, open: comboOpen, ...modalProps } = props
  void className
  void style
  void onOpen
  void comboOpen

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), MESSAGE_ENTRANCE_ACTIVE_DELAY)
    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  const handleClose: MessageComboProps['onClose'] = () => {
    void close({ animated: true })
  }

  return <MessageModal {...modalProps} open={open} portal={false} onClose={handleClose} />
}

// 打开消息对话框（全局同时仅存在一个，再次 open 会先关闭上一个）
export default async function open(props: MessageOpenProps): Promise<void> {
  await close({ animated: false })

  const { portal: externalPortal, ...comboProps } = props
  const portal = externalPortal || document.body
  const rootElement = document.createElement('div')
  rootElement.id = MESSAGE_ID
  portal.appendChild(rootElement)

  const root = createRoot(rootElement)
  messageInstance.root = root
  messageInstance.rootElement = rootElement

  root.render(<OpenMessage {...comboProps} />)
}
