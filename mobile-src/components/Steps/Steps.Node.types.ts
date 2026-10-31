import type { ReactNode } from 'react'

export interface StepsNodeProps {
  // Value & Display Value
  iconChildren?: ReactNode
  status?: string
  rail?: boolean
  description?: ReactNode
  // Elements
  iconRender?: (options: { children: ReactNode; className: string; status?: string }) => ReactNode
  title?: ReactNode
}
