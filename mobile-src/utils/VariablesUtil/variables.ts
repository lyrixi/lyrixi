// 与 src/assets/variables.less 中 :root CSS 变量一一对应

import type { Variables } from './types'

const variables: Variables = {
  // 动画时长
  'lyrixi-animation-duration': 'var(--lyrixi-animation-duration)',
  'lyrixi-animation-duration-open': 'var(--lyrixi-animation-duration-open)',
  'lyrixi-animation-duration-close': 'var(--lyrixi-animation-duration-close)',

  // 背景色
  'lyrixi-bg-default': 'var(--lyrixi-bg-default)',
  'lyrixi-bg-secondary': 'var(--lyrixi-bg-secondary)',
  'lyrixi-bg-tertiary': 'var(--lyrixi-bg-tertiary)',
  'lyrixi-bg-quaternary': 'var(--lyrixi-bg-quaternary)',
  'lyrixi-bg-mask': 'var(--lyrixi-bg-mask)',
  'lyrixi-bg-divider': 'var(--lyrixi-bg-divider)',

  // 边框色
  'lyrixi-border-color': 'var(--lyrixi-border-color)',

  // 常用色
  'lyrixi-color-white': 'var(--lyrixi-color-white)',
  'lyrixi-color-transparent': 'var(--lyrixi-color-transparent)',

  // 文字色
  'lyrixi-color-default': 'var(--lyrixi-color-default)',
  'lyrixi-color-secondary': 'var(--lyrixi-color-secondary)',
  'lyrixi-color-tertiary': 'var(--lyrixi-color-tertiary)',
  'lyrixi-color-quaternary': 'var(--lyrixi-color-quaternary)',

  // 颜色
  'lyrixi-color-primary': 'var(--lyrixi-color-primary)',
  'lyrixi-color-primary-lighten': 'var(--lyrixi-color-primary-lighten)',
  'lyrixi-color-info': 'var(--lyrixi-color-info)',
  'lyrixi-color-info-lighten': 'var(--lyrixi-color-info-lighten)',
  'lyrixi-color-warning': 'var(--lyrixi-color-warning)',
  'lyrixi-color-warning-lighten': 'var(--lyrixi-color-warning-lighten)',
  'lyrixi-color-danger': 'var(--lyrixi-color-danger)',
  'lyrixi-color-danger-lighten': 'var(--lyrixi-color-danger-lighten)',
  'lyrixi-color-success': 'var(--lyrixi-color-success)',
  'lyrixi-color-success-lighten': 'var(--lyrixi-color-success-lighten)',
  'lyrixi-color-disabled': 'var(--lyrixi-color-disabled)',
  'lyrixi-color-disabled-lighten': 'var(--lyrixi-color-disabled-lighten)',

  // 高度大小
  'lyrixi-height-xxl': 'var(--lyrixi-height-xxl)',
  'lyrixi-height-xl': 'var(--lyrixi-height-xl)',
  'lyrixi-height-l': 'var(--lyrixi-height-l)',
  'lyrixi-height-m': 'var(--lyrixi-height-m)',
  'lyrixi-height-s': 'var(--lyrixi-height-s)',
  'lyrixi-height-xs': 'var(--lyrixi-height-xs)',

  // 文字大小
  'lyrixi-font-size-xxxl': 'var(--lyrixi-font-size-xxxl)',
  'lyrixi-font-size-xxl': 'var(--lyrixi-font-size-xxl)',
  'lyrixi-font-size-xl': 'var(--lyrixi-font-size-xl)',
  'lyrixi-font-size-l': 'var(--lyrixi-font-size-l)',
  'lyrixi-font-size-m': 'var(--lyrixi-font-size-m)',
  'lyrixi-font-size-s': 'var(--lyrixi-font-size-s)',
  'lyrixi-font-size-xs': 'var(--lyrixi-font-size-xs)',
  'lyrixi-font-size-xxs': 'var(--lyrixi-font-size-xxs)',

  // 图标大小
  'lyrixi-icon-size-xxxl': 'var(--lyrixi-icon-size-xxxl)',
  'lyrixi-icon-size-xxl': 'var(--lyrixi-icon-size-xxl)',
  'lyrixi-icon-size-xl': 'var(--lyrixi-icon-size-xl)',
  'lyrixi-icon-size-l': 'var(--lyrixi-icon-size-l)',
  'lyrixi-icon-size-m': 'var(--lyrixi-icon-size-m)',
  'lyrixi-icon-size-s': 'var(--lyrixi-icon-size-s)',
  'lyrixi-icon-size-xs': 'var(--lyrixi-icon-size-xs)',
  'lyrixi-icon-size-xxs': 'var(--lyrixi-icon-size-xxs)',
  'lyrixi-icon-size-xxxs': 'var(--lyrixi-icon-size-xxxs)',
  'lyrixi-icon-size-xxxxs': 'var(--lyrixi-icon-size-xxxxs)',

  // 文字粗细
  'lyrixi-font-weight-xl': 'var(--lyrixi-font-weight-xl)',
  'lyrixi-font-weight-l': 'var(--lyrixi-font-weight-l)',
  'lyrixi-font-weight-m': 'var(--lyrixi-font-weight-m)',
  'lyrixi-font-weight-s': 'var(--lyrixi-font-weight-s)',

  // 圆角大小
  'lyrixi-radius-xxxl': 'var(--lyrixi-radius-xxxl)',
  'lyrixi-radius-xxl': 'var(--lyrixi-radius-xxl)',
  'lyrixi-radius-xl': 'var(--lyrixi-radius-xl)',
  'lyrixi-radius-l': 'var(--lyrixi-radius-l)',
  'lyrixi-radius-m': 'var(--lyrixi-radius-m)',
  'lyrixi-radius-s': 'var(--lyrixi-radius-s)',
  'lyrixi-radius-xs': 'var(--lyrixi-radius-xs)',

  // 间距大小
  'lyrixi-space-xxl': 'var(--lyrixi-space-xxl)',
  'lyrixi-space-xl': 'var(--lyrixi-space-xl)',
  'lyrixi-space-l': 'var(--lyrixi-space-l)',
  'lyrixi-space-m': 'var(--lyrixi-space-m)',
  'lyrixi-space-s': 'var(--lyrixi-space-s)',
  'lyrixi-space-xs': 'var(--lyrixi-space-xs)',
  'lyrixi-space-xxs': 'var(--lyrixi-space-xxs)',
  'lyrixi-space-xxxs': 'var(--lyrixi-space-xxxs)',

  // 安全区
  'lyrixi-safe-area-inset-top': 'var(--lyrixi-safe-area-inset-top)',
  'lyrixi-safe-area-inset-bottom': 'var(--lyrixi-safe-area-inset-bottom)'
}

export default variables
