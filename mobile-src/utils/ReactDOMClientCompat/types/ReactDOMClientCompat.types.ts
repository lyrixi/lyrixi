import type { ReactNode } from 'react'

// Message.open 挂载用 Root（render / unmount）
export type Root = {
  render(element: ReactNode): void
  unmount(): void
}
