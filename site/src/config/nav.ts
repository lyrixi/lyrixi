import type { ProductId } from './products'

export type NavKey = 'guide' | 'components' | 'tools' | 'templates' | 'ai'

export interface NavItem {
  key: NavKey
  label: string
  /** Path segment under /{product}/ */
  path: string
}

/** Top navigation shared by both products. */
export const NAV_ITEMS: NavItem[] = [
  { key: 'guide', label: '指南', path: 'guide' },
  { key: 'components', label: '组件', path: 'components' },
  { key: 'tools', label: '工具', path: 'tools' },
  { key: 'templates', label: '模板', path: 'templates' },
  { key: 'ai', label: 'AI', path: 'ai' },
]

export function buildProductPath(
  productId: ProductId,
  section: string,
  slug?: string,
): string {
  const base = `/${productId === 'mobile' ? 'mobile' : 'mobile-rn'}/${section}`
  return slug ? `${base}/${slug}` : base
}
