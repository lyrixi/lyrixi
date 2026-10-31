import type { ReactNode } from 'react'

export interface AppLoadResult {
  status: string
  message?: string
}

export interface AppProps {
  // Value & Display Value
  id?: string
  language?: string | null
  preload?: (() => Promise<AppLoadResult>) | null
  /** 主题名，默认 `'default'`，调用 `Theme.setTheme` */
  themeName?: string
  // Elements
  children?: ReactNode
}
