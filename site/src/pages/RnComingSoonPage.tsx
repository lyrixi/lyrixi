import { Link } from 'react-router-dom'

import { GuideLayout } from '@/layouts/GuideLayout'

/** Placeholder while lyrixi-mobile-rn is not yet published. */
export function RnComingSoonPage() {
  return (
    <GuideLayout>
      <section className="page-section">
        <h1>lyrixi-mobile-rn</h1>
        <p>该组件库尚未发布到 npm，文档站已预留入口，发布后将开放完整指南、组件与预览。</p>
        <p>
          当前请先使用 <Link to="/mobile/guide">lyrixi-mobile</Link>。
        </p>
      </section>
    </GuideLayout>
  )
}
