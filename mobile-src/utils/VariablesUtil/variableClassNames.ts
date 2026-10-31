import type {
  BackgroundColor,
  BorderColor,
  FontColor,
  FontSize,
  FontWeight,
  Height,
  IconSize,
  Radius
} from './types'

// 与 `types/VariablesUtil.types.ts` 枚举值一一对应，供 getXxxClass 校验
const variableClassNames = {
  fontColors: [
    'transparent',
    'white',
    'default',
    'secondary',
    'tertiary',
    'quaternary',
    'primary',
    'info',
    'warning',
    'danger',
    'success',
    'disabled'
  ] as FontColor[],

  backgroundColors: [
    'transparent',
    'white',
    'default',
    'secondary',
    'tertiary',
    'quaternary',
    'primary',
    'primary-lighten',
    'info',
    'info-lighten',
    'warning',
    'warning-lighten',
    'danger',
    'danger-lighten',
    'success',
    'success-lighten',
    'disabled',
    'disabled-lighten'
  ] as BackgroundColor[],

  borderColors: [
    'transparent',
    'white',
    'default',
    'secondary',
    'tertiary',
    'quaternary',
    'primary',
    'info',
    'warning',
    'danger',
    'success',
    'disabled'
  ] as BorderColor[],

  fontSizes: ['xxxl', 'xxl', 'xl', 'l', 'm', 's', 'xs', 'xxs'] as FontSize[],

  fontWeights: ['xl', 'l', 'm', 's'] as FontWeight[],

  heights: ['xs', 's', 'm', 'l', 'xl', 'xxl'] as Height[],

  iconSizes: ['xxxxs', 'xxxs', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'] as IconSize[],

  radiuses: ['xxxl', 'xxl', 'xl', 'l', 'm', 's', 'xs'] as Radius[]
}

export default variableClassNames
