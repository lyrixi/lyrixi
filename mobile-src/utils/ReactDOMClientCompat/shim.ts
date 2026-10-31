import type { ReactNode } from 'react'
import ReactDOM from 'react-dom'

export interface Root {
  render(children: ReactNode): void
  unmount(): void
}

const legacyReactDOM = ReactDOM as {
  render?: (element: ReactNode, container: Element) => void
  unmountComponentAtNode?: (container: Element) => boolean
}

export function createRoot(container: Element): Root {
  const { render, unmountComponentAtNode } = legacyReactDOM
  if (!render || !unmountComponentAtNode) {
    throw new Error('[lyrixi-mobile] shim createRoot requires React 17 legacy render APIs.')
  }

  return {
    render(children: ReactNode) {
      render(children, container)
    },
    unmount() {
      unmountComponentAtNode(container)
    }
  }
}

// react webpack配置: 勿删
/* 方法1:
plugins: [
// [自定义修改] 忽略 react-dom/client 模块的静态分析
new webpack.IgnorePlugin({
  resourceRegExp: /^react-dom\/client$/,
  contextRegExp: /compatibility/
}),
*/

/*方法2:
module.exports = {
  resolve: {
    alias: {
      'react-dom/client': path.resolve(
        __dirname,
        'src/library/v2/utils/ReactDOMClientCompat/shim.ts'
      )
    }
  }
}
*/
