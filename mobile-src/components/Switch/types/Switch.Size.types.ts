// Switch 尺寸，与 Switch.less 中 `.lyrixi-size-*` 一致
export type SwitchSize = 'xxxs' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'

export const SwitchSizeClasses = {
  xxxs: { className: 'lyrixi-size-xxxs' },
  xxs: { className: 'lyrixi-size-xxs' },
  xs: { className: 'lyrixi-size-xs' },
  s: { className: 'lyrixi-size-s' },
  m: { className: 'lyrixi-size-m' },
  l: { className: 'lyrixi-size-l' },
  xl: { className: 'lyrixi-size-xl' },
  xxl: { className: 'lyrixi-size-xxl' },
  xxxl: { className: 'lyrixi-size-xxxl' }
} as const
