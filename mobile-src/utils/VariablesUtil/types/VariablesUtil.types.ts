// 与 `src/assets/variables.less` 中 CSS 变量一一对应
export type Variables = Record<string, string>

// 文字颜色（`--lyrixi-color-*` / `.lyrixi-color-*`）
export type FontColor =
  | 'transparent'
  | 'white'
  | 'default'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'primary'
  | 'info'
  | 'warning'
  | 'danger'
  | 'success'
  | 'disabled'

// 背景颜色（`.lyrixi-bg-*`）
export type BackgroundColor =
  | 'transparent'
  | 'white'
  | 'default'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'primary'
  | 'primary-lighten'
  | 'info'
  | 'info-lighten'
  | 'warning'
  | 'warning-lighten'
  | 'danger'
  | 'danger-lighten'
  | 'success'
  | 'success-lighten'
  | 'disabled'
  | 'disabled-lighten'

// 边框颜色（`.lyrixi-border-color-*`）
export type BorderColor =
  | 'transparent'
  | 'white'
  | 'default'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'primary'
  | 'info'
  | 'warning'
  | 'danger'
  | 'success'
  | 'disabled'

// 文字大小（`--lyrixi-font-size-*`）
export type FontSize = 'xxxl' | 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs' | 'xxs'

// 文字粗细（`--lyrixi-font-weight-*`）
export type FontWeight = 'xl' | 'l' | 'm' | 's'

// 高度（`--lyrixi-height-*`）
export type Height = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'

// 图标大小（`--lyrixi-icon-size-*`）
export type IconSize = 'xxxxs' | 'xxxs' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'

// 圆角（`--lyrixi-radius-*`）
export type Radius = 'xxxl' | 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs'
