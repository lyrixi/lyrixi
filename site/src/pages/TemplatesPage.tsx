import { Navigate, useParams } from 'react-router-dom'

import { findExample, getProductCatalog } from '@/config/catalog'
import { getMarkdownByRelativePath } from '@/content/loadMarkdown'
import { useProduct } from '@/context/ProductContext'
import { DocLayout } from '@/layouts/DocLayout'

export function TemplatesPage() {
  const { slug } = useParams()
  const { productId, product } = useProduct()
  const examples = getProductCatalog(productId).examples

  if (!slug) {
    const first = examples[0]
    if (first) {
      return <Navigate to={`/${product.routePrefix}/templates/${first.slug}`} replace />
    }
    return (
      <DocLayout
        productId={productId}
        mode="templates"
        markdown={null}
        title="模板"
        emptyHint={
          <p>
            {productId === 'mobile-rn'
              ? 'RN 侧暂以组件 Demo App（src/entry）为主，模板文档可参考 H5 examples。'
              : '暂无模板文档。'}
          </p>
        }
      />
    )
  }

  const item = findExample(productId, slug)
  const markdown = item ? getMarkdownByRelativePath(item.mdRelative) : null

  return (
    <DocLayout
      productId={productId}
      mode="templates"
      markdown={markdown}
      title={item?.title || slug}
      resourceSlug={item?.slug ?? slug}
      mdRelative={item?.mdRelative ?? ''}
      emptyHint={<p>未找到模板文档。请确认 sibling 源码与 catalog 是否已生成。</p>}
    />
  )
}
