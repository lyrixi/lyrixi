import { Navigate, useParams } from 'react-router-dom'

import { findUtil, getProductCatalog } from '@/config/catalog'
import { getMarkdownByRelativePath } from '@/content/loadMarkdown'
import { useProduct } from '@/context/ProductContext'
import { DocLayout } from '@/layouts/DocLayout'

export function ToolsPage() {
  const { slug } = useParams()
  const { productId, product } = useProduct()
  const utils = getProductCatalog(productId).utils

  if (!slug) {
    const first = utils[0]
    if (first) {
      return <Navigate to={`/${product.routePrefix}/tools/${first.slug}`} replace />
    }
    return (
      <DocLayout
        productId={productId}
        mode="tools"
        markdown={null}
        title="工具"
        emptyHint={<p>当前产品暂无工具文档。</p>}
      />
    )
  }

  const item = findUtil(productId, slug)
  const markdown = item ? getMarkdownByRelativePath(item.mdRelative) : null
  const previewDemoId =
    item?.primaryDemo != null
      ? `${productId}/${item.slug}/${item.primaryDemo}`
      : null

  return (
    <DocLayout
      productId={productId}
      mode="tools"
      markdown={markdown}
      title={item?.title || slug}
      resourceSlug={item?.slug ?? slug}
      previewDemoId={previewDemoId}
      emptyHint={<p>未找到工具文档。请确认 sibling 源码与 catalog 是否已生成。</p>}
    />
  )
}
