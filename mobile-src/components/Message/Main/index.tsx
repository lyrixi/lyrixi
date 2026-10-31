import React, { forwardRef, useRef, useImperativeHandle } from 'react'

import Header from './Header'
import Footer from './Footer'
import Title from './Title'

import type { MessageButton, MessageMainProps, MessageMainRef } from '../types'

// 内库使用-start
import Icon from './../../Icon'
import Button from './../../Button'
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { Icon, Button, DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const Main = forwardRef<MessageMainRef, MessageMainProps>(
  (
    {
      // Elements
      iconSvg,
      iconSize = '32px',
      iconColor = 'primary',
      iconRender,
      title,
      // Style
      titleClassName,
      titleStyle,
      // Value & Display Value
      content,
      // Style
      contentClassName,
      contentStyle,
      footerClassName,
      footerStyle,
      // Value & Display Value
      buttonsDirection = 'horizontal',
      buttons,
      // Events
      // onButtonClick仅供 Message.Modal 注入按钮点击逻辑，外部请勿使用
      onButtonClick,
      // Style
      className,
      style
    },
    ref
  ) => {
    const rootRef = useRef<HTMLElement>(null)

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    function renderIcon() {
      if (typeof iconRender === 'function') {
        return iconRender()
      }

      if (iconSvg) {
        return (
          <Icon className="lyrixi-message-icon" svg={iconSvg} color={iconColor} size={iconSize} />
        )
      }

      return null
    }

    const IconNode = renderIcon()
    async function handleButtonClick(
      e: React.MouseEvent<HTMLDivElement>,
      options: { button: MessageButton }
    ) {
      if (typeof onButtonClick === 'function') {
        await onButtonClick(e, options)
        return
      }
      await options?.button?.onClick?.(e)
    }

    const hasHeader = IconNode || title
    const hasFooter = Array.isArray(buttons) && buttons.length > 0

    return (
      <>
        {hasHeader ? (
          <Header>
            {IconNode}
            {title ? (
              <Title className={titleClassName} style={titleStyle}>
                {title}
              </Title>
            ) : null}
          </Header>
        ) : null}

        {content ? (
          <main
            ref={rootRef}
            className={DOMUtil.classNames('lyrixi-message-content', contentClassName, className)}
            style={{ ...contentStyle, ...style }}
          >
            {content}
          </main>
        ) : null}

        {hasFooter ? (
          <Footer
            direction={buttonsDirection}
            className={DOMUtil.classNames(
              buttonsDirection === 'vertical' ? 'lyrixi-vertical' : 'lyrixi-horizontal',
              footerClassName
            )}
            style={footerStyle}
          >
            {buttons!.map((button, index) => (
              <Button
                key={button.id ?? index}
                id={button.id}
                variant={button.variant ?? 'text'}
                color={button.color ?? 'default'}
                size={button.size ?? 'xl'}
                block
                disabled={button.disabled}
                style={button.style}
                className={button.className}
                onClick={(e) => handleButtonClick(e, { button })}
              >
                {button.name}
              </Button>
            ))}
          </Footer>
        ) : null}
      </>
    )
  }
)

export default Main
