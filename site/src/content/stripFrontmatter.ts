/** Strip YAML frontmatter for browser-side doc rendering (no Node `Buffer`). */
export function stripFrontmatter(source: string): string {
  if (!source.startsWith('---')) return source
  const match = source.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/)
  if (!match) return source
  return source.slice(match[0].length)
}
