import { useEffect, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

import { DemoPlayground } from '@/components/DemoPlayground'
import type { ProductId } from '@/config/products'
import { buildPreviewDemoId } from '@/content/demoId'
import { getDemoSourceByPath, resolveDemoFilePath } from '@/content/loadDemoSource'
import { splitDocByDemos } from '@/content/parseDocParts'
import { stripFrontmatter } from '@/content/stripFrontmatter'

import styles from './DocMarkdown.module.css'

interface DocMarkdownProps {
  source: string
  productId: ProductId
  resourceSlug: string
  mdRelative: string
}

const markdownComponents: Components = {
  code({ className, children, ...props }) {
    if (className) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
    return <code {...props}>{children}</code>
  },
}

export function DocMarkdown({ source, productId, resourceSlug, mdRelative }: DocMarkdownProps) {
  const body = stripFrontmatter(source)
  const parts = useMemo(() => splitDocByDemos(body), [body])
  const hasDemo = parts.some((p) => p.type === 'demo')

  useEffect(() => {
    if (!hasDemo) return
    void import('../../../../lyrixi-mobile/src/assets/index.less')
  }, [hasDemo])

  return (
    <div className={styles.doc}>
      {parts.map((part, index) => {
        if (part.type === 'markdown') {
          const trimmed = part.content.trim()
          if (!trimmed) return null
          return (
            <ReactMarkdown
              key={`md-${index}`}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={markdownComponents}
            >
              {part.content}
            </ReactMarkdown>
          )
        }

        const filePath = resolveDemoFilePath(mdRelative, part.src)
        const code = getDemoSourceByPath(filePath)
        const demoId = buildPreviewDemoId(productId, resourceSlug, part.src)
        const fileLabel = part.src.replace(/^\.\//, '')

        return (
          <DemoPlayground
            key={`demo-${index}-${part.src}`}
            demoId={demoId}
            code={code}
            fileLabel={fileLabel}
          />
        )
      })}
    </div>
  )
}
