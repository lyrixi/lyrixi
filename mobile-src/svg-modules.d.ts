declare module '*.svg' {
  import type { FC, SVGProps } from 'react'

  export const ReactComponent: FC<SVGProps<SVGSVGElement>>
  const SvgComponent: FC<SVGProps<SVGSVGElement>>
  export default SvgComponent
}
