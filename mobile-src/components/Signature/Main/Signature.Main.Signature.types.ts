import type { CSSProperties } from 'react'

export type SignatureCanvas = HTMLCanvasElement & { ctx?: CanvasRenderingContext2D }

export interface SignatureMainDrawProps {
  // Value & Display Value
  suffix?: string
  quality?: number
  color?: string
  backgroundColor?: string
  lineWidth?: number
  // Style
  style?: CSSProperties
}

export interface SignatureMainDrawRef {
  element: HTMLDivElement | null
  getBase64: () => Promise<string | null>
  clear: () => void
}
