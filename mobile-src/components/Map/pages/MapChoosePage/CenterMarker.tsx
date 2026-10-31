import React from 'react'

import type { CenterMarkerProps } from './CenterMarker.types'

// 内库使用-start
import DOMUtil from './../../../../utils/DOMUtil'
// 内库使用-end

function CenterMarker({ markerIcon, style, className }: CenterMarkerProps) {
  if (!markerIcon?.width || !markerIcon?.height) {
    return null
  }

  const markerStyle: React.CSSProperties = {
    width: markerIcon.width,
    height: markerIcon.height,
    ...(markerIcon.backgroundImage
      ? { backgroundImage: `url(${markerIcon.backgroundImage})` }
      : {}),
    ...(markerIcon.backgroundColor ? { backgroundColor: markerIcon.backgroundColor } : {}),
    ...style
  }

  return (
    <div
      className={DOMUtil.classNames('lyrixi-map-choosepage-centermarker', className)}
      style={markerStyle}
    />
  )
}

export default CenterMarker
