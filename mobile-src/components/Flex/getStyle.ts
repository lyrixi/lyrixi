import type { CSSProperties } from 'react'

import type { FlexProps } from './types'

// 仅保留无对应全局 class 的动态值：gap、非常见 flex
function getStyle({ gap, flex }: Pick<FlexProps, 'gap' | 'flex'>): CSSProperties {
  const style: CSSProperties = {}

  if (gap !== undefined) {
    style.gap = `${gap}px`
  }

  if (
    flex !== undefined &&
    flex !== 1 &&
    flex !== '1' &&
    flex !== 0 &&
    flex !== '0' &&
    flex !== 'none' &&
    flex !== 'initial'
  ) {
    style.flex = flex
  }

  return style
}

export default getStyle
