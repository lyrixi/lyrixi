// 暗色主题：基于 default，覆盖若干颜色

import variablesDefault from './variablesDefault'

import type { Variables } from './types'

const variablesDark: Variables = {
  ...variablesDefault,

  // 背景色
  'lyrixi-bg-default': '#1a1c1f',
  'lyrixi-bg-secondary': '#2a2c2f',
  'lyrixi-bg-tertiary': '#252729',
  'lyrixi-bg-quaternary': '#323436',
  'lyrixi-bg-mask': 'rgba(0, 0, 0, 60%)',
  'lyrixi-bg-divider': '#2a2c2f',

  // 边框色
  'lyrixi-border-color': '#3a3c3f',

  // 文字色
  'lyrixi-color-default': '#f1f2f5',
  'lyrixi-color-secondary': '#a9b1b9',
  'lyrixi-color-tertiary': '#85909c',
  'lyrixi-color-quaternary': '#5c646c',

  // 颜色 lighten（暗色下用更深底）
  'lyrixi-color-primary-lighten': '#3d2a14',
  'lyrixi-color-info-lighten': '#0a2540',
  'lyrixi-color-warning-lighten': '#3d2e14',
  'lyrixi-color-danger-lighten': '#3d1415',
  'lyrixi-color-success-lighten': '#0a2e20',
  'lyrixi-color-disabled-lighten': '#2a2c2f'
}

export default variablesDark
