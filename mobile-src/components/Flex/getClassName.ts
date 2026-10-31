import type { FlexAlign, FlexJustify, FlexProps } from './types'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const justifyClassMap: Record<FlexJustify, string> = {
  start: 'lyrixi-flex-justify-flex-start',
  center: 'lyrixi-flex-justify-center',
  end: 'lyrixi-flex-justify-flex-end',
  between: 'lyrixi-flex-justify-space-between',
  around: 'lyrixi-flex-justify-space-around',
  evenly: 'lyrixi-flex-justify-space-evenly'
}

const alignClassMap: Record<FlexAlign, string> = {
  start: 'lyrixi-flex-align-flex-start',
  center: 'lyrixi-flex-align-center',
  end: 'lyrixi-flex-align-flex-end'
}

function getClassName({
  wrap,
  direction,
  justify,
  align,
  flex,
  block
}: Pick<FlexProps, 'wrap' | 'direction' | 'justify' | 'align' | 'flex' | 'block'>) {
  const isScroll = wrap === 'scroll'
  const isVertical = direction === 'vertical'

  return (DOMUtil.classNames as (...args: unknown[]) => string)(
    block ? 'lyrixi-flex' : 'lyrixi-inline-flex',
    // direction / justify / align / wrap / 常见 flex → flex.less
    isVertical ? 'lyrixi-flex-vertical' : 'lyrixi-flex-horizontal',
    justify ? justifyClassMap[justify] : undefined,
    align ? alignClassMap[align] : undefined,
    {
      'lyrixi-flex-wrap': wrap === true,
      'lyrixi-flex-scroll': isScroll,
      'lyrixi-flex-1': flex === 1 || flex === '1',
      'lyrixi-flex-0': flex === 0 || flex === '0',
      'lyrixi-flex-none': flex === 'none',
      'lyrixi-flex-initial': flex === 'initial',
      // 非 block 时避免在父级 Flex 的 stretch 下被拉满交叉轴
      'lyrixi-flex-align-self-start': !block
    }
  )
}

export default getClassName
