import React from 'react'
import type { ReactNode } from 'react'
import ReactDOM from 'react-dom'

import type { Root } from './types'

export type { Root } from './types'

// 判断版本
function isReactBelow18(): boolean {
  return parseInt(React.version.split('.')[0] ?? '0', 10) < 18
}

// 18创建
function createReact18Root(container: Element): Root {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
  const { createRoot } = require('react-dom/client')
  return createRoot(container)
}

// 17创建
function createReact17Root(container: Element): Root {
  const render = (ReactDOM as { render?: (element: ReactNode, container: Element) => void }).render
  const unmount = (ReactDOM as { unmountComponentAtNode?: (container: Element) => boolean })
    .unmountComponentAtNode
  if (!render || !unmount) {
    throw new Error('[lyrixi-mobile] createRoot requires react-dom 18+ or React 17.')
  }

  return {
    render(element) {
      render(element, container)
    },
    unmount() {
      unmount(container)
    }
  }
}

// createRoot：18+ 用 react-dom/client，17 用 render 垫片（供 Message.open）
export function createRoot(container: Element): Root {
  return isReactBelow18() ? createReact17Root(container) : createReact18Root(container)
}
