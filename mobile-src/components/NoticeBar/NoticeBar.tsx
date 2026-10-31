import React, { forwardRef, useRef, useImperativeHandle, useState, type ReactNode } from 'react'
import getDefaultIconSvg from './getDefaultIconSvg'

import type { NoticeBarProps, NoticeBarRef } from './types'

// 内库使用-start
import Icons from '../../icons'
import DOMUtil from './../../utils/DOMUtil'
import Icon from './../Icon'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Icon, Icons } from 'lyrixi-mobile'
测试使用-end */

// 通告栏
const NoticeBar = forwardRef<NoticeBarRef, NoticeBarProps>(
  (
    {
      // Value & Display Value
      id,
      title,
      description,

      // Status
      type = 'info', // success,info,warning,error
      closable,

      // Style
      style,
      className,
      iconStyle,
      titleStyle,
      descriptionStyle,

      // Elements
      iconRender,
      iconClassName,
      iconColor,
      iconVariant,
      iconSize = 'm'
    },
    ref
  ) => {
    // 节点
    const rootRef = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(true)

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        },
        close: () => setVisible(false),
        open: () => setVisible(true)
      }
    })

    // 不显示
    if (!visible) return null

    // 获取图标节点
    function renderIcon(): ReactNode {
      // 自定义图标渲染
      if (typeof iconRender === 'function') {
        return iconRender()
      }

      // 默认图标
      const resolvedIconSvg = getDefaultIconSvg(type)
      if (resolvedIconSvg) {
        return (
          <Icon
            svg={resolvedIconSvg}
            className={iconClassName}
            size={iconSize ?? undefined}
            color={iconColor}
            variant={iconVariant}
          />
        )
      }

      return null
    }

    const IconNode = renderIcon()

    return (
      <div
        id={id}
        ref={rootRef}
        // Style
        style={style}
        className={DOMUtil.classNames(
          'lyrixi-noticebar',
          type && `lyrixi-noticebar-${type}`,
          className
        )}
      >
        {/* 图标 */}
        {IconNode ? (
          <div className="lyrixi-noticebar-icon" style={iconStyle}>
            {IconNode}
          </div>
        ) : null}

        {/* 内容 */}
        <div className="lyrixi-noticebar-content">
          {title && (
            <div className="lyrixi-noticebar-title" style={titleStyle}>
              {title}
            </div>
          )}
          {description && (
            <div className="lyrixi-noticebar-description" style={descriptionStyle}>
              {description}
            </div>
          )}
        </div>

        {/* 关闭按钮 */}
        {closable && (
          <div className="lyrixi-noticebar-close-icon">
            <Icon
              id={id ? `${id}-close` : undefined}
              svg={Icons.Close}
              size="xxxs"
              onClick={() => setVisible(false)}
            />
          </div>
        )}
      </div>
    )
  }
)

export default NoticeBar
