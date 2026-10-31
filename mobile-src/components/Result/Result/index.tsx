import React from 'react'
import getDefaultStatus from './getDefaultStatus'

import type { ResultProps } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

// 结果页, status: empty|500|success|waiting|info|warning|error
function Result({
  // Value & Display Value
  id,
  status,
  title,
  description,

  // Style
  full = true,
  style,
  className,

  // Elements
  imageRender,
  imageUrl,
  children
}: ResultProps) {
  let defaultStatus = getDefaultStatus(status)

  // 渲染图片
  function renderImage() {
    if (imageUrl === null) return null

    if (imageRender) {
      return imageRender()
    }
    if (typeof imageUrl === 'string') {
      return <img alt="" src={imageUrl} className="lyrixi-result-image" />
    }
    return defaultStatus?.image
  }

  // 渲染标题
  function renderTitle() {
    if (title === null) return null
    if (title) {
      return <div className="lyrixi-result-title">{title}</div>
    }
    return <div className="lyrixi-result-title">{defaultStatus?.title}</div>
  }

  return (
    <div
      id={id}
      // Style
      style={style}
      className={DOMUtil.classNames('lyrixi-result', full ? 'lyrixi-full' : '', className)}
    >
      {/* Elements: Image */}
      {renderImage()}

      {/* Value & Display Value: Title */}
      {renderTitle()}

      {/* Value & Display Value: Description */}
      {description && <div className="lyrixi-result-description">{description}</div>}

      {/* Elements: Children */}
      {children}
    </div>
  )
}

export default Result
