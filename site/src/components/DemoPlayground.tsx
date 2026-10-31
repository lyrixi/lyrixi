import { Component, type ComponentType, type ReactNode, useState } from 'react'

import { getDemo } from '@/preview/demoRegistry'

import styles from './DemoPlayground.module.css'

interface DemoPlaygroundProps {
  demoId: string
  code: string | null
  fileLabel?: string
}

class DemoErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className={styles.previewError}>
          预览渲染失败：{this.state.error.message}
        </div>
      )
    }
    return this.props.children
  }
}

function DemoPreview({ demoId }: { demoId: string }) {
  const Demo: ComponentType | null = getDemo(demoId)

  if (!Demo) {
    return (
      <div className={styles.previewMissing}>
        未注册 Demo：<code>{demoId}</code>
      </div>
    )
  }

  return (
    <DemoErrorBoundary>
      <div className={styles.previewInner}>
        <Demo />
      </div>
    </DemoErrorBoundary>
  )
}

export function DemoPlayground({ demoId, code, fileLabel }: DemoPlaygroundProps) {
  const [copied, setCopied] = useState(false)

  async function copyCode() {
    if (!code) return
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className={styles.playground}>
      <div className={styles.codePane}>
        <div className={styles.toolbar}>
          {fileLabel ? <span style={{ marginRight: 'auto', fontSize: 12, color: '#888' }}>{fileLabel}</span> : null}
          <button type="button" onClick={() => void copyCode()} disabled={!code}>
            {copied ? '已复制' : '复制代码'}
          </button>
        </div>
        {code ? (
          <pre className={styles.codeScroll}>{code}</pre>
        ) : (
          <div className={styles.codeMissing}>未找到示例源码文件。</div>
        )}
      </div>
      <div className={styles.previewPane}>
        <DemoPreview demoId={demoId} />
      </div>
    </div>
  )
}
