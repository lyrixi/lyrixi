import { Navigate, Route, Routes } from 'react-router-dom'

import { SiteHeader } from '@/components/SiteHeader'
import { ProductProvider } from '@/context/ProductContext'
import { AiPage } from '@/pages/AiPage'
import { ComponentDocPage } from '@/pages/ComponentDocPage'
import { GuidePage } from '@/pages/GuidePage'
import { RnComingSoonPage } from '@/pages/RnComingSoonPage'
import { TemplatesPage } from '@/pages/TemplatesPage'
import { ToolsPage } from '@/pages/ToolsPage'

export function App() {
  return (
    <ProductProvider>
      <div className="site-shell">
        <SiteHeader />
        <main className="site-main">
          <Routes>
            <Route path="/" element={<Navigate to="/mobile/guide" replace />} />

            <Route path="mobile/guide" element={<GuidePage />} />
            <Route
              path="mobile/components"
              element={<Navigate to="/mobile/components/button" replace />}
            />
            <Route path="mobile/components/:slug" element={<ComponentDocPage />} />
            <Route path="mobile/tools" element={<ToolsPage />} />
            <Route path="mobile/tools/:slug" element={<ToolsPage />} />
            <Route path="mobile/templates" element={<TemplatesPage />} />
            <Route path="mobile/templates/:slug" element={<TemplatesPage />} />
            <Route path="mobile/ai" element={<AiPage />} />

            {/* Reserved hook for lyrixi-mobile-rn — enable routes after npm publish. */}
            <Route path="mobile-rn/*" element={<RnComingSoonPage />} />

            <Route path="*" element={<Navigate to="/mobile/guide" replace />} />
          </Routes>
        </main>
      </div>
    </ProductProvider>
  )
}
