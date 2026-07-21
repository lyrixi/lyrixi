import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { mapSlugAcrossProducts } from '@/config/catalog'
import {
  DEFAULT_PRODUCT_ID,
  getProduct,
  PRODUCT_STORAGE_KEY,
  productFromPathname,
  type ProductDefinition,
  type ProductId,
} from '@/config/products'

interface ProductContextValue {
  productId: ProductId
  product: ProductDefinition
  switchProduct: (next: ProductId) => void
}

const ProductContext = createContext<ProductContextValue | null>(null)

function parseRouteParts(pathname: string) {
  const cleaned = pathname.replace(/^\/lyrixi/, '')
  const parts = cleaned.split('/').filter(Boolean)
  const section = parts[1] || 'guide'
  const slug = parts[2]
  return { section, slug }
}

function resolveActiveProductId(pathname: string): ProductId {
  const fromPath = productFromPathname(pathname)
  if (fromPath) {
    const product = getProduct(fromPath)
    // Disabled products keep their coming-soon route, but shell still shows mobile branding
    // when we are not on an RN placeholder path intentionally.
    return product.enabled ? fromPath : fromPath
  }
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(PRODUCT_STORAGE_KEY) as ProductId | null
    if (stored && getProduct(stored).enabled) return stored
  }
  return DEFAULT_PRODUCT_ID
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()

  const productId = resolveActiveProductId(location.pathname)

  const switchProduct = useCallback(
    (next: ProductId) => {
      const target = getProduct(next)
      if (!target.enabled) return

      localStorage.setItem(PRODUCT_STORAGE_KEY, next)
      const { section, slug } = parseRouteParts(location.pathname)
      const mapped = mapSlugAcrossProducts(productId, next, section, slug)
      const prefix = next === 'mobile' ? 'mobile' : 'mobile-rn'
      const path = mapped.slug
        ? `/${prefix}/${mapped.section}/${mapped.slug}`
        : `/${prefix}/${mapped.section}`
      navigate(path)
    },
    [location.pathname, navigate, productId],
  )

  const value = useMemo(
    () => ({
      productId: getProduct(productId).enabled ? productId : DEFAULT_PRODUCT_ID,
      product: getProduct(getProduct(productId).enabled ? productId : DEFAULT_PRODUCT_ID),
      switchProduct,
    }),
    [productId, switchProduct],
  )

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProduct() {
  const ctx = useContext(ProductContext)
  if (!ctx) {
    throw new Error('useProduct must be used within ProductProvider')
  }
  return ctx
}
