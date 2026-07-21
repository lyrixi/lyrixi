import type { ReactNode } from 'react'

/** WebView is not interactive in docs preview — show a placeholder. */
export default function WebView(props: {
  source?: { uri?: string; html?: string }
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        padding: 16,
        background: '#f5f5f5',
        color: '#666',
        fontSize: 13,
        ...props.style,
      }}
    >
      WebView preview unavailable in browser
      {props.source?.uri ? ` (${props.source.uri})` : null}
    </div>
  )
}

export type WebViewProps = {
  children?: ReactNode
}
