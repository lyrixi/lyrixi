/** Product ids used in routes and LogoSwitcher. */
export type ProductId = 'mobile' | 'mobile-rn'

export interface ProductDefinition {
  id: ProductId
  /** Display name in the header. */
  label: string
  /** npm / import package name. */
  packageName: string
  /** URL segment after base, e.g. /mobile/... */
  routePrefix: string
  /** Short description for guide hero. */
  tagline: string
  /**
   * Whether the product docs are live.
   * Flip to true after lyrixi-mobile-rn is published on npm.
   */
  enabled: boolean
}

export const PRODUCTS: ProductDefinition[] = [
  {
    id: 'mobile',
    label: 'lyrixi-mobile',
    packageName: 'lyrixi-mobile',
    routePrefix: 'mobile',
    tagline: 'React 19 移动端 UI 组件库',
    enabled: true,
  },
  {
    id: 'mobile-rn',
    label: 'lyrixi-mobile-rn',
    packageName: 'lyrixi-mobile-rn',
    routePrefix: 'mobile-rn',
    tagline: 'React Native 桥接与组件库',
    // Hook reserved — enable after npm publish.
    enabled: false,
  },
]

export const DEFAULT_PRODUCT_ID: ProductId = 'mobile'

export const PRODUCT_STORAGE_KEY = 'lyrixi-docs-product'

export function getProduct(id: ProductId): ProductDefinition {
  const found = PRODUCTS.find((item) => item.id === id)
  if (!found) {
    throw new Error(`Unknown product: ${id}`)
  }
  return found
}

export function productFromPathname(pathname: string): ProductId | null {
  if (pathname.includes('/mobile-rn')) return 'mobile-rn'
  if (pathname.includes('/mobile')) return 'mobile'
  return null
}
