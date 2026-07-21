import type { ReactNode } from 'react'

interface GuideLayoutProps {
  children: ReactNode
}

/** Full-bleed dark layout for guide / AI marketing pages. */
export function GuideLayout({ children }: GuideLayoutProps) {
  return <div className="guide-layout">{children}</div>
}
