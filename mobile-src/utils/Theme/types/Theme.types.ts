import type { Variables } from './../../VariablesUtil/types'

// Theme.config 入参：主题名 → token（可部分覆盖）
export type Themes = Record<string, Partial<Variables>>
