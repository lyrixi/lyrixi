/**
 * Loads sibling markdown as raw strings via Vite glob.
 * Keys are normalized to posix-like relative paths from the front workspace root.
 */
const rawModules = import.meta.glob(
  [
    '../../../../lyrixi-mobile/src/**/index.zh-CN.md',
    '../../../../lyrixi-mobile-rn/src/**/index.zh-CN.md',
    '../../../../lyrixi-mobile/src-docs/**/*.md',
    '../../../../lyrixi-mobile/.ai/README.md',
    '../../../../lyrixi-mobile-rn/.ai/README.md',
    '../../../../lyrixi-mobile-rn/README.md',
  ],
  {
    query: '?raw',
    import: 'default',
    eager: true,
  },
) as Record<string, string>

function normalizeKey(key: string) {
  // e.g. ../../../../lyrixi-mobile/src/components/Button/index.zh-CN.md
  const idx = key.indexOf('lyrixi-mobile')
  if (idx === -1) return key
  return key.slice(idx).replace(/\\/g, '/')
}

const byRelativePath = new Map<string, string>()
for (const [key, value] of Object.entries(rawModules)) {
  byRelativePath.set(normalizeKey(key), value)
}

export function getMarkdownByRelativePath(relativePath: string): string | null {
  const normalized = relativePath.replace(/\\/g, '/')
  return byRelativePath.get(normalized) ?? null
}

export function listLoadedMarkdownPaths() {
  return [...byRelativePath.keys()]
}
