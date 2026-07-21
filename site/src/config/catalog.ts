import { catalog } from './catalog.generated'
import type { ProductId } from './products'

export interface CatalogItem {
  productId: string
  kind: string
  name: string
  slug: string
  title: string
  group: string
  groupOrder: number
  order: number
  mdRelative: string
  demos: readonly string[]
  primaryDemo: string | null
}

export function getProductCatalog(productId: ProductId) {
  return catalog.products[productId] as {
    packageName: string
    components: readonly CatalogItem[]
    utils: readonly CatalogItem[]
    examples: readonly CatalogItem[]
    skills: readonly { id: string; summary: string }[]
  }
}

/** Group components by frontmatter `group` for the sidebar. */
export function groupComponents(productId: ProductId) {
  const items = getProductCatalog(productId).components
  const map = new Map<string, { group: string; groupOrder: number; items: CatalogItem[] }>()

  for (const item of items) {
    const key = item.group
    if (!map.has(key)) {
      map.set(key, { group: item.group, groupOrder: item.groupOrder, items: [] })
    }
    map.get(key)!.items.push(item)
  }

  return [...map.values()].sort((a, b) => a.groupOrder - b.groupOrder)
}

export function findComponent(productId: ProductId, slug: string) {
  return getProductCatalog(productId).components.find(
    (item) => item.slug === slug.toLowerCase() || item.name.toLowerCase() === slug.toLowerCase(),
  )
}

export function findUtil(productId: ProductId, slug: string) {
  return getProductCatalog(productId).utils.find(
    (item) => item.slug === slug.toLowerCase() || item.name.toLowerCase() === slug.toLowerCase(),
  )
}

export function findExample(productId: ProductId, slug: string) {
  return getProductCatalog(productId).examples.find(
    (item) => item.slug === slug.toLowerCase() || item.name.toLowerCase() === slug.toLowerCase(),
  )
}

/**
 * When switching products, keep the same component slug when possible.
 */
export function mapSlugAcrossProducts(
  from: ProductId,
  to: ProductId,
  section: string,
  slug?: string,
): { section: string; slug?: string } {
  void from
  if (!slug) return { section: section === 'components' ? 'guide' : section }

  if (section === 'components') {
    const target = findComponent(to, slug)
    return target ? { section: 'components', slug: target.slug } : { section: 'guide' }
  }

  if (section === 'tools') {
    const target = findUtil(to, slug)
    return target ? { section: 'tools', slug: target.slug } : { section: 'tools' }
  }

  if (section === 'templates') {
    const target = findExample(to, slug)
    return target ? { section: 'templates', slug: target.slug } : { section: 'templates' }
  }

  return { section, slug }
}
