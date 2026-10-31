import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

import { stripFrontmatter } from './stripFrontmatter'

import styles from './DocMarkdown.module.css'

interface DocMarkdownProps {
  source: string
  /** Called when a Dumi-style <code src="./demos/X.tsx"> is found. */
  onDemoSrc?: (src: string) => void
  /** Active demo src highlighted as a live slot note. */
  activeDemoSrc?: string | null
}

/**
 * Renders component docs. Dumi `<code src="...">` tags become preview hooks
 * instead of being executed in the markdown tree.
 */
export function DocMarkdown({ source, onDemoSrc, activeDemoSrc }: DocMarkdownProps) {
  const content = stripFrontmatter(source)

  const components: Components = {
    code({ className, children, ...props }) {
      if (className) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
      return <code {...props}>{children}</code>
    },
  }

  // Replace <code src="..."></code> before markdown parse for reliable handling.
  const rewritten = content.replace(
    /<code\s+src=["']([^"']+)["']\s*>\s*<\/code>/g,
    (_match, src: string) => {
      onDemoSrc?.(src)
      const isActive = activeDemoSrc === src
      return `\n\n> 📱 右侧手机框预览：\`${src}\`${isActive ? '（当前）' : ''}\n\n`
    },
  )

  return (
    <div className={styles.doc}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
        {rewritten}
      </ReactMarkdown>
    </div>
  )
}
