const rawDemoModules = import.meta.glob(
  [
    '../../../../lyrixi-mobile/src/components/**/demos/**/*.{tsx,jsx}',
    '../../../../lyrixi-mobile/src/utils/**/demos/**/*.{tsx,jsx}',
    '../../../../lyrixi-mobile/src/examples/**/demos/**/*.{tsx,jsx}',
  ],
  {
    query: '?raw',
    import: 'default',
    eager: true,
  },
) as Record<string, string>

function normalizeKey(key: string) {
  const idx = key.indexOf('lyrixi-mobile')
  if (idx === -1) return key.replace(/\\/g, '/')
  return key.slice(idx).replace(/\\/g, '/')
}

const byRelativePath = new Map<string, string>()
for (const [key, value] of Object.entries(rawDemoModules)) {
  byRelativePath.set(normalizeKey(key), value)
}

/** Resolve `./demos/Foo.tsx` against the doc markdown path. */
export function resolveDemoFilePath(mdRelative: string, demoSrc: string): string {
  const normalized = mdRelative.replace(/\\/g, '/')
  const dir = normalized.slice(0, normalized.lastIndexOf('/'))
  const rel = demoSrc.replace(/^\.\//, '')
  return `${dir}/${rel}`
}

export function getDemoSourceByPath(relativePath: string): string | null {
  return byRelativePath.get(relativePath.replace(/\\/g, '/')) ?? null
}
