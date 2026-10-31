import { useParams } from 'react-router-dom'

import { findComponent } from '@/config/catalog'
import { getMarkdownByRelativePath } from '@/content/loadMarkdown'
import { useProduct } from '@/context/ProductContext'
import { DocLayout } from '@/layouts/DocLayout'

export function ComponentDocPage() {
  const { slug = 'button' } = useParams()
  const { productId } = useProduct()
  const item = findComponent(productId, slug)

  const markdown = item ? getMarkdownByRelativePath(item.mdRelative) : null

  return (
    <DocLayout
      productId={productId}
      mode="components"
      markdown={markdown}
      title={item?.title || slug}
      resourceSlug={item?.slug ?? slug}
      mdRelative={item?.mdRelative ?? ''}
      emptyHint={<p>未找到组件文档。请确认 sibling 源码路径与 catalog 是否已生成。</p>}
    />
  )
}
