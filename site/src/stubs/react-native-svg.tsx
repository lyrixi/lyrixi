import type { ReactNode, SVGProps } from 'react'

/**
 * Lightweight react-native-svg stub for docs preview.
 * Real SVG rendering for icons should prefer H5 package demos.
 */
export function Svg(props: SVGProps<SVGSVGElement> & { children?: ReactNode }) {
  return <svg {...props}>{props.children}</svg>
}

export function Path(props: SVGProps<SVGPathElement>) {
  return <path {...props} />
}

export function Circle(props: SVGProps<SVGCircleElement>) {
  return <circle {...props} />
}

export function Rect(props: SVGProps<SVGRectElement>) {
  return <rect {...props} />
}

export function G(props: SVGProps<SVGGElement> & { children?: ReactNode }) {
  return <g {...props}>{props.children}</g>
}

export function Defs(props: { children?: ReactNode }) {
  return <defs>{props.children}</defs>
}

export function LinearGradient(props: SVGProps<SVGLinearGradientElement> & { children?: ReactNode }) {
  return <linearGradient {...props}>{props.children}</linearGradient>
}

export function Stop(props: SVGProps<SVGStopElement>) {
  return <stop {...props} />
}

export default Svg
