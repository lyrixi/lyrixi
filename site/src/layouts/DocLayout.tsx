import type { ReactNode } from 'react'

import { Sidebar } from '@/components/Sidebar'
import { DocMarkdown } from '@/content/DocMarkdown'
import type { ProductId } from '@/config/products'

interface DocLayoutProps {
  productId: ProductId
  mode: 'components' | 'tools' | 'templates'
  markdown: string | null
  title: string
  resourceSlug: string
  mdRelative: string
  emptyHint?: ReactNode
}

export function DocLayout({
  productId,
  mode,
  markdown,
  title,
  resourceSlug,
  mdRelative,
  emptyHint,
}: DocLayoutProps) {
  return (
    <div className="doc-layout">
      <Sidebar mode={mode} />
      <article className="doc-layout__content">
        {markdown ? (
          <DocMarkdown
            source={markdown}
            productId={productId}
            resourceSlug={resourceSlug}
            mdRelative={mdRelative}
          />
        ) : (
          <div>
            <h1>{title}</h1>
            {emptyHint || <p>文档尚未找到。</p>}
          </div>
        )}
      </article>
    </div>
  )
}
