import React from 'react'

import type { ActionSheetHeaderProps } from './ActionSheet.Header.types'

const Header = ({
  // Value & Display Value
  title
}: ActionSheetHeaderProps) => {
  if (!title) return null

  return (
    <div className="lyrixi-actionsheet-header">
      <div className="lyrixi-actionsheet-header-title">{title}</div>
    </div>
  )
}

export default Header
