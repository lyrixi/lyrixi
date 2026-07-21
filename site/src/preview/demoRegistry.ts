/**
 * Registers lyrixi-mobile demos for the preview iframe.
 * RN demos will be wired after lyrixi-mobile-rn is published (see products.enabled).
 */
import type { ComponentType } from 'react'

type DemoModule = { default: ComponentType }

const mobileDemos = import.meta.glob(
  '../../../../lyrixi-mobile/src/components/*/demos/*.{tsx,jsx}',
  { eager: true },
) as Record<string, DemoModule>

function toId(product: 'mobile' | 'mobile-rn', pathKey: string) {
  const match = pathKey.match(/components\/([^/]+)\/demos\/([^/]+)\.(tsx|jsx)$/)
  if (!match) return null
  const [, component, demo] = match
  return `${product}/${component.toLowerCase()}/${demo}`
}

const registry = new Map<string, ComponentType>()

for (const [key, mod] of Object.entries(mobileDemos)) {
  const id = toId('mobile', key)
  if (id && mod?.default) registry.set(id, mod.default)
}

export function getDemo(id: string) {
  return registry.get(id) ?? null
}

export function listDemoIds() {
  return [...registry.keys()]
}
