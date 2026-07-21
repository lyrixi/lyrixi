import { StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'

import { getDemo } from './demoRegistry'

function readDemoId() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  return decodeURIComponent(hash)
}

function PreviewApp() {
  const id = readDemoId()
  const Demo = id ? getDemo(id) : null
  const isMobile = id.startsWith('mobile/') && !id.startsWith('mobile-rn/')

  // H5 demos need the design-token stylesheet from lyrixi-mobile.
  useMemo(() => {
    if (isMobile) {
      void import('../../../../lyrixi-mobile/src/assets/index.less')
    }
    return null
  }, [isMobile])

  if (!id) {
    return <div style={{ padding: 16 }}>Missing demo id in hash.</div>
  }

  if (!Demo) {
    return (
      <div style={{ padding: 16, color: '#666', fontSize: 13 }}>
        Demo not found: <code>{id}</code>
        {id.startsWith('mobile-rn/') ? (
          <p style={{ marginTop: 8 }}>
            RN 预览依赖 react-native-web；部分原生模块已 stub。BridgeWebView 等可能无法在浏览器运行。
          </p>
        ) : null}
      </div>
    )
  }

  return <Demo />
}

const root = document.getElementById('preview-root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <PreviewApp />
    </StrictMode>,
  )
}
