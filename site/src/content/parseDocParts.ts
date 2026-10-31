export type DocPart =
  | { type: 'markdown'; content: string }
  | { type: 'demo'; src: string }

const DEMO_TAG_RE = /<code\s+src=["']([^"']+)["']\s*>\s*<\/code>/g

export function splitDocByDemos(content: string): DocPart[] {
  const parts: DocPart[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  const re = new RegExp(DEMO_TAG_RE.source, 'g')
  while ((match = re.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'markdown', content: content.slice(lastIndex, match.index) })
    }
    parts.push({ type: 'demo', src: match[1] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < content.length) {
    parts.push({ type: 'markdown', content: content.slice(lastIndex) })
  }

  return parts.length > 0 ? parts : [{ type: 'markdown', content }]
}
