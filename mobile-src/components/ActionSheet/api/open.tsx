import React, { useEffect, useState } from 'react'
// 内库使用-start
import { createRoot } from '../../../utils/ReactDOMClientCompat'
// 内库使用-end

import close from './close'
import { ACTION_SHEET_ENTRANCE_ACTIVE_DELAY, ACTION_SHEET_ID } from './constants'
import actionSheetInstance from './ActionSheetInstance'
import ActionSheetModal from '../Modal'

import type { ActionSheetModalProps, ActionSheetOpenProps } from '../types'

function OpenActionSheet(props: Omit<ActionSheetOpenProps, 'portal'>) {
  const { onClose: externalOnClose, ...modalProps } = props

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), ACTION_SHEET_ENTRANCE_ACTIVE_DELAY)
    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  const handleClose: ActionSheetModalProps['onClose'] = () => {
    externalOnClose?.()
    void close({ animated: true })
  }

  return <ActionSheetModal {...modalProps} open={open} portal={false} onClose={handleClose} />
}

// 打开动作面板（全局同时仅存在一个，再次 open 会先关闭上一个）
export default async function open(props: ActionSheetOpenProps): Promise<void> {
  await close({ animated: false })

  const { portal: externalPortal, ...modalProps } = props
  const portal = externalPortal || document.body
  const rootElement = document.createElement('div')
  rootElement.id = ACTION_SHEET_ID
  portal.appendChild(rootElement)

  const root = createRoot(rootElement)
  actionSheetInstance.root = root
  actionSheetInstance.rootElement = rootElement

  root.render(<OpenActionSheet {...modalProps} />)
}
