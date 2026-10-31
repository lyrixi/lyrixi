import React from 'react'

// 内库使用-start
import Result from '../../Result'
// 内库使用-end

const TreeResult = Result as React.ComponentType<{
  title?: React.ReactNode
  status?: string
  full?: boolean
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}>

export type { TreeResult }
