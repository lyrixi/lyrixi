/**
 * Registers lyrixi-mobile demos for the preview iframe.
 * RN demos will be wired after lyrixi-mobile-rn is published (see products.enabled).
 */
import type { ComponentType } from 'react'

type DemoModule = { default: ComponentType }

const mobileDemoGlobs = import.meta.glob(
  [
    '../../../../lyrixi-mobile/src/components/*/demos/*.{tsx,jsx}',
    '../../../../lyrixi-mobile/src/utils/*/demos/*.{tsx,jsx}',
    '../../../../lyrixi-mobile/src/examples/*/demos/*.{tsx,jsx}',
    '../../../../lyrixi-mobile/src/examples/*/demos/*/index.{tsx,jsx}',
  ],
  { eager: true },
) as Record<string, DemoModule>

function toId(product: 'mobile' | 'mobile-rn', pathKey: string): string | null {
  let match = pathKey.match(/components\/([^/]+)\/demos\/([^/]+)\.(tsx|jsx)$/)
  if (match) {
    const [, component, demo] = match
    return `${product}/${component.toLowerCase()}/${demo}`
  }

  match = pathKey.match(/utils\/([^/]+)\/demos\/([^/]+)\.(tsx|jsx)$/)
  if (match) {
    const [, util, demo] = match
    return `${product}/${util.toLowerCase()}/${demo}`
  }

  match = pathKey.match(/examples\/([^/]+)\/demos\/([^/]+)\/index\.(tsx|jsx)$/)
  if (match) {
    const [, example, demo] = match
    return `${product}/${example.toLowerCase()}/${demo}`
  }

  match = pathKey.match(/examples\/([^/]+)\/demos\/([^/]+)\.(tsx|jsx)$/)
  if (match) {
    const [, example, demo] = match
    return `${product}/${example.toLowerCase()}/${demo}`
  }

  return null
}

const registry = new Map<string, ComponentType>()

for (const [key, mod] of Object.entries(mobileDemoGlobs)) {
  const id = toId('mobile', key)
  if (id && mod?.default) registry.set(id, mod.default)
}

export function getDemo(id: string) {
  return registry.get(id) ?? null
}

export function listDemoIds() {
  return [...registry.keys()]
}
