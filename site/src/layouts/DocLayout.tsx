import { useMemo, useState, type ReactNode } from 'react'

import { PhoneFrame } from '@/components/PhoneFrame'
import { Sidebar } from '@/components/Sidebar'
import { DocMarkdown } from '@/content/DocMarkdown'
import type { ProductId } from '@/config/products'

interface DocLayoutProps {
  productId: ProductId
  mode: 'components' | 'tools' | 'templates'
  markdown: string | null
  title: string
  /** Demo id registered in preview host, e.g. mobile/button/Button */
  previewDemoId?: string | null
  emptyHint?: ReactNode
}

function resolveDemoSrcToId(
  productId: ProductId,
  componentName: string,
  demoSrc: string,
): string {
  // ./demos/Button.tsx -> Button
  const file = demoSrc.split('/').pop()?.replace(/\.(tsx|jsx)$/, '') || 'index'
  return `${productId}/${componentName.toLowerCase()}/${file}`
}

export function DocLayout({
  productId,
  mode,
  markdown,
  title,
  previewDemoId,
  emptyHint,
}: DocLayoutProps) {
  const [demoSrc, setDemoSrc] = useState<string | null>(null)

  const computedPreviewId = useMemo(() => {
    if (previewDemoId) return previewDemoId
    if (!demoSrc) return null
    // title is often "Button"; slug lowercased in routes
    const name = title.replace(/\s.*/, '')
    return resolveDemoSrcToId(productId, name, demoSrc)
  }, [previewDemoId, demoSrc, productId, title])

  const previewUrl = computedPreviewId
    ? `${import.meta.env.BASE_URL}preview.html#/${computedPreviewId}`
    : null

  return (
    <div className="doc-layout">
      <Sidebar mode={mode} />
      <article className="doc-layout__content">
        {markdown ? (
          <DocMarkdown
            source={markdown}
            activeDemoSrc={demoSrc}
            onDemoSrc={(src) => setDemoSrc((prev) => prev ?? src)}
          />
        ) : (
          <div>
            <h1>{title}</h1>
            {emptyHint || <p>文档尚未找到。</p>}
          </div>
        )}
      </article>
      {mode === 'components' && previewUrl ? (
        <div className="doc-layout__preview">
          <PhoneFrame src={previewUrl} title={`${title} preview`} />
        </div>
      ) : null}
    </div>
  )
}
