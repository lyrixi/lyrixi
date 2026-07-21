import type { ProductId } from './products'

export interface VersionOption {
  label: string
  /** Relative or absolute URL when switching versions. */
  href: string
  current?: boolean
}

/**
 * Version dropdown options.
 * Historical builds can point at archived Paths later.
 */
export const VERSIONS: Record<ProductId, VersionOption[]> = {
  mobile: [{ label: '0.1.1', href: '/lyrixi/mobile/guide', current: true }],
  'mobile-rn': [{ label: '1.0.0 (dev)', href: '/lyrixi/mobile-rn/guide', current: true }],
}
