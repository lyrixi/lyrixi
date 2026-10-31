import React, { forwardRef, useRef, useImperativeHandle } from 'react'

import type { ChatItemProps, ChatItemRef } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import Checkbox from './../../Checkbox'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Checkbox } from 'lyrixi-mobile'
测试使用-end */

const Chat = forwardRef<ChatItemRef, ChatItemProps>(
  (
    {
      // Value & Display Value
      _raw,
      content,
      checked,
      checkable,
      placement,
      checkboxVariant,
      checkboxPlacement,
      // Style
      className,
      style,
      // Elements
      avatarUrl,
      avatarRender,
      authorRender
    }: ChatItemProps,
    ref: React.ForwardedRef<ChatItemRef>
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    function renderAvatar() {
      if (typeof avatarRender === 'function') {
        return (
          <div className="lyrixi-chat-item-avatar">
            {avatarRender({ ...(_raw || {}), checked })}
          </div>
        )
      }
      if (avatarUrl && typeof avatarUrl === 'string') {
        return (
          <div className="lyrixi-chat-item-avatar">
            <img
              alt=""
              src={avatarUrl}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                if (target.parentNode instanceof Element) {
                  target.parentNode.classList.add('lyrixi-error')
                }
              }}
              onLoad={(e) => {
                const target = e.target as HTMLImageElement
                if (target.parentNode instanceof Element) {
                  target.parentNode.classList.add('lyrixi-success')
                }
              }}
              className="lyrixi-avatar"
            />
          </div>
        )
      }
      return <div className="lyrixi-chat-item-avatar" />
    }

    function renderAuthor() {
      if (typeof authorRender === 'function') {
        return (
          <div className="lyrixi-chat-item-content-author">
            {authorRender({ ...(_raw || {}), checked })}
          </div>
        )
      }
      return null
    }

    function renderCheckbox() {
      if (!checkable) return null
      return <Checkbox variant={checkboxVariant} checked={checked} />
    }

    return (
      <div
        style={style}
        className={DOMUtil.classNames('lyrixi-chat-item', `lyrixi-${placement}`, className)}
        ref={rootRef}
      >
        {checkboxPlacement !== 'right' && renderCheckbox()}

        <div className="lyrixi-chat-item-main">
          {renderAvatar()}

          <div className="lyrixi-chat-item-content">
            {renderAuthor()}
            <div className="lyrixi-chat-item-content-bubble">{content}</div>
          </div>
        </div>

        {checkboxPlacement === 'right' && renderCheckbox()}
      </div>
    )
  }
)

export default Chat
