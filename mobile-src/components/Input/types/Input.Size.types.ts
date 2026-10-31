// Input 尺寸，与 NumberBox / InputText.less 中 `.lyrixi-size-*` 一致
export type InputSize = 'xs' | 's' | 'm' | 'l' | 'xl'

export const InputSizeClasses = {
  xs: { className: 'lyrixi-size-xs' },
  s: { className: 'lyrixi-size-s' },
  m: { className: 'lyrixi-size-m' },
  l: { className: 'lyrixi-size-l' },
  xl: { className: 'lyrixi-size-xl' }
} as const
