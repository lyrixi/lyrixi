import type { CSSProperties, ReactNode } from 'react'

/** Minimal Slider stub for browser preview. */
export default function Slider(props: {
  value?: number
  minimumValue?: number
  maximumValue?: number
  onValueChange?: (value: number) => void
  style?: CSSProperties
}) {
  return (
    <input
      type="range"
      value={props.value ?? 0}
      min={props.minimumValue ?? 0}
      max={props.maximumValue ?? 100}
      onChange={(event) => props.onValueChange?.(Number(event.target.value))}
      style={{ width: '100%', ...props.style }}
    />
  )
}
