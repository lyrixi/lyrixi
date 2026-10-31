import React from 'react'
import type { LoadingProps } from '../types'

import close from './close'
import { DEFAULT_LOADING_ID } from './constants'
import { setLoadingInstance } from './LoadingInstance'

// 内库使用-start
import { createRoot } from '../../../utils/ReactDOMClientCompat'
import Loading from '../Loading'
// 内库使用-end

// 显示 Loading（全局同时仅存在一个，再次 open 会先关闭上一个）
function open(props?: LoadingProps): HTMLDivElement {
  close()

  const { portal: externalPortal, ...loadingProps } = props || {}
  const id = DEFAULT_LOADING_ID
  const portal = externalPortal || document.getElementById('root') || document.body

  const rootElement = document.createElement('div')
  rootElement.id = id
  portal.appendChild(rootElement)

  const root = createRoot(rootElement)
  setLoadingInstance(id, { root, rootElement })

  root.render(<Loading {...loadingProps} />)

  return rootElement
}

export default open
