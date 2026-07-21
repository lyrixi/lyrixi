import { createContext, type ReactNode } from 'react'

const insets = { top: 0, right: 0, bottom: 0, left: 0 }

export const SafeAreaInsetsContext = createContext(insets)
export const SafeAreaFrameContext = createContext({ x: 0, y: 0, width: 0, height: 0 })

export function SafeAreaProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function SafeAreaView({
  children,
  style,
}: {
  children?: ReactNode
  style?: React.CSSProperties
}) {
  return <div style={style}>{children}</div>
}

export function useSafeAreaInsets() {
  return insets
}

export function useSafeAreaFrame() {
  return { x: 0, y: 0, width: typeof window !== 'undefined' ? window.innerWidth : 0, height: 0 }
}
