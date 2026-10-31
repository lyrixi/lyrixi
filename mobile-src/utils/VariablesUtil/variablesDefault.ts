// 与 src/assets/variables.less 中 :root CSS 变量一一对应（实体值）

import type { Variables } from './types'

const variablesDefault: Variables = {
  // 动画时长
  'lyrixi-animation-duration': '300ms',
  'lyrixi-animation-duration-open': '300ms',
  'lyrixi-animation-duration-close': '250ms',

  // 背景色
  'lyrixi-bg-default': '#f1f2f5',
  'lyrixi-bg-secondary': '#eff0f0',
  'lyrixi-bg-tertiary': '#f3f4f5',
  'lyrixi-bg-quaternary': '#f6f7f8',
  'lyrixi-bg-mask': 'rgba(0, 0, 0, 30%)',
  'lyrixi-bg-divider': '#f9fafb',

  // 边框色
  'lyrixi-border-color': '#e6e8eb',

  // 常用色
  'lyrixi-color-white': 'white',
  'lyrixi-color-transparent': 'transparent',

  // 文字色
  'lyrixi-color-default': '#1a1c1f',
  'lyrixi-color-secondary': '#5c646c',
  'lyrixi-color-tertiary': '#85909c',
  'lyrixi-color-quaternary': '#a9b1b9',

  // 颜色
  'lyrixi-color-primary': '#ff9008',
  'lyrixi-color-primary-lighten': '#fff7e6',
  'lyrixi-color-info': '#0076ff',
  'lyrixi-color-info-lighten': '#e6f4ff',
  'lyrixi-color-warning': '#f4984e',
  'lyrixi-color-warning-lighten': '#fffbe6',
  'lyrixi-color-danger': '#fc484a',
  'lyrixi-color-danger-lighten': '#fff1f0',
  'lyrixi-color-success': '#00a870',
  'lyrixi-color-success-lighten': '#f6ffed',
  'lyrixi-color-disabled': '#a9b1b9',
  'lyrixi-color-disabled-lighten': '#f1f2f5',

  // 高度大小
  'lyrixi-height-xxl': '56px',
  'lyrixi-height-xl': '48px',
  'lyrixi-height-l': '40px',
  'lyrixi-height-m': '32px',
  'lyrixi-height-s': '24px',
  'lyrixi-height-xs': '20px',

  // 文字大小
  'lyrixi-font-size-xxxl': '20px',
  'lyrixi-font-size-xxl': '18px',
  'lyrixi-font-size-xl': '16px',
  'lyrixi-font-size-l': '15px',
  'lyrixi-font-size-m': '14px',
  'lyrixi-font-size-s': '12px',
  'lyrixi-font-size-xs': '11px',
  'lyrixi-font-size-xxs': '8px',

  // 图标大小
  'lyrixi-icon-size-xxxl': '28px',
  'lyrixi-icon-size-xxl': '26px',
  'lyrixi-icon-size-xl': '24px',
  'lyrixi-icon-size-l': '22px',
  'lyrixi-icon-size-m': '20px',
  'lyrixi-icon-size-s': '18px',
  'lyrixi-icon-size-xs': '16px',
  'lyrixi-icon-size-xxs': '14px',
  'lyrixi-icon-size-xxxs': '12px',
  'lyrixi-icon-size-xxxxs': '10px',

  // 文字粗细
  'lyrixi-font-weight-xl': '700',
  'lyrixi-font-weight-l': '600',
  'lyrixi-font-weight-m': '500',
  'lyrixi-font-weight-s': '400',

  // 圆角大小
  'lyrixi-radius-xxxl': '16px',
  'lyrixi-radius-xxl': '12px',
  'lyrixi-radius-xl': '10px',
  'lyrixi-radius-l': '8px',
  'lyrixi-radius-m': '6px',
  'lyrixi-radius-s': '4px',
  'lyrixi-radius-xs': '2px',

  // 间距大小
  'lyrixi-space-xxl': '16px',
  'lyrixi-space-xl': '14px',
  'lyrixi-space-l': '12px',
  'lyrixi-space-m': '10px',
  'lyrixi-space-s': '8px',
  'lyrixi-space-xs': '6px',
  'lyrixi-space-xxs': '4px',
  'lyrixi-space-xxxs': '2px',

  // 安全区
  'lyrixi-safe-area-inset-top': 'env(safe-area-inset-top)',
  'lyrixi-safe-area-inset-bottom': 'env(safe-area-inset-bottom)'
}

export default variablesDefault
