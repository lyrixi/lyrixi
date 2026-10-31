/** Map Dumi-style `./demos/Foo.tsx` or `./demos/Foo/index.tsx` to preview registry id segment. */
export function demoNameFromSrc(demoSrc: string): string {
  const m = demoSrc.match(/\/demos\/(.+)\.(tsx|jsx)$/i)
  if (!m) return 'index'
  const rel = m[1]
  if (rel.endsWith('/index')) {
    const folder = rel.slice(0, -'/index'.length)
    return folder.split('/').pop() || 'index'
  }
  return rel.split('/').pop() || 'index'
}

export function buildPreviewDemoId(
  productId: string,
  resourceSlug: string,
  demoSrc: string,
): string {
  return `${productId}/${resourceSlug.toLowerCase()}/${demoNameFromSrc(demoSrc)}`
}
