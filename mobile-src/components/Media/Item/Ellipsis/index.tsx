import React from 'react'

import type { MediaEllipsisProps } from './Media.Item.Ellipsis.types'

const Ellipsis = ({
  // Value & Display Value
  text,
  // Style
  style
}: MediaEllipsisProps) => {
  return (
    <div
      // Style
      className="lyrixi-media-item-ellipsis"
      style={style}
    >
      {text}
    </div>
  )
}
export default Ellipsis
