import React from 'react'

import type { ListChangeAction, ListItemProps } from './../types'

// 内库使用-start
import Input from '../../Input'
import DOMUtil from './../../../utils/DOMUtil'
import Checkbox from './../../Checkbox'
import Icon from './../../Icon'
// 内库使用-end

/* 测试使用-start
import { DOMUtil,Checkbox } from 'lyrixi-mobile'
测试使用-end */

const Item = ({
  // Value & Display Value
  id,
  _raw,
  checked,

  // Status
  disabled,
  checkable,

  // Style
  style,
  className,
  layout,

  // Elements
  imageUrl,
  imageSvg,
  imageRender,
  avatarUrl,
  avatarSvg,
  avatarRender,
  title,
  description,
  note,
  content,
  actionRender,
  arrowVisible,
  checkboxVariant,
  checkboxPlacement,

  // Events
  onChange
}: ListItemProps) => {
  function handleChange(newChecked: boolean, action: ListChangeAction) {
    if (disabled) return
    const currentItem = { ...(_raw || {}), checked: newChecked }
    onChange?.(currentItem, { action, currentItem })
  }

  // 获取checkbox
  function renderCheckbox() {
    if (!checkable) return null

    return (
      <Checkbox
        variant={checkboxVariant}
        checked={checked}
        onChange={(newChecked) => {
          handleChange(newChecked, 'checkbox')
        }}
      />
    )
  }

  // 获取note
  function renderNote() {
    return <div className="lyrixi-list-item-meta-note">{note}</div>
  }

  // 渲染图片
  function renderImage() {
    if (typeof imageRender === 'function') {
      return imageRender({ ...(_raw || {}), checked })
    }
    if (imageSvg) {
      return (
        <div className="lyrixi-list-item-meta-image">
          <Icon svg={imageSvg} color="quaternary" size="l" />
        </div>
      )
    }
    if (imageUrl && typeof imageUrl === 'string') {
      return (
        <div
          className={DOMUtil.classNames('lyrixi-list-item-meta-image', 'lyrixi-bg-image-default')}
        >
          <img
            alt=""
            src={imageUrl}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.parentElement?.classList.add('lyrixi-error')
            }}
            onLoad={(e) => {
              const target = e.target as HTMLImageElement
              target.parentElement?.classList.add('lyrixi-success')
            }}
            className="lyrixi-image"
          />
        </div>
      )
    }
    return null
  }

  // 渲染头像
  function renderAvatar() {
    if (typeof avatarRender === 'function') {
      return avatarRender({ ...(_raw || {}), checked })
    }
    if (avatarSvg) {
      return (
        <div className="lyrixi-list-item-meta-avatar">
          <Icon svg={avatarSvg} color="quaternary" size="m" />
        </div>
      )
    }
    if (avatarUrl && typeof avatarUrl === 'string') {
      return (
        <div
          className={DOMUtil.classNames('lyrixi-list-item-meta-avatar', 'lyrixi-bg-avatar-default')}
        >
          {avatarUrl !== 'default' && (
            <img
              alt=""
              src={avatarUrl}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.parentElement?.classList.add('lyrixi-error')
              }}
              onLoad={(e) => {
                const target = e.target as HTMLImageElement
                target.parentElement?.classList.add('lyrixi-success')
              }}
              className="lyrixi-avatar"
            />
          )}
        </div>
      )
    }
    return null
  }

  // 获取action
  function renderAction() {
    if (typeof actionRender === 'function') {
      return actionRender({ ...(_raw || {}), checked })
    }

    return null
  }

  // 获取item节点
  function renderItem() {
    return (
      <div
        id={id}
        style={style}
        className={DOMUtil.classNames(
          'lyrixi-list-item',
          className,
          disabled ? 'lyrixi-disabled' : '',
          checked ? 'lyrixi-checked' : '',
          layout ? `lyrixi-${layout}` : ''
        )}
        onClick={(e) => {
          e.stopPropagation()
          handleChange(!checked, 'item')
        }}
      >
        {/* Left Checkbox */}
        {checkboxPlacement !== 'right' && renderCheckbox()}

        {/* Main */}
        <div className="lyrixi-list-item-main">
          {/* Meta */}
          <div className="lyrixi-list-item-meta">
            {renderImage()}

            {renderAvatar()}

            <div className="lyrixi-list-item-meta-content">
              <div className="lyrixi-list-item-meta-title">{title}</div>
              {description && (
                <div className="lyrixi-list-item-meta-description">{description}</div>
              )}
            </div>

            {renderNote()}
          </div>

          {/* Content */}
          {content && <div className="lyrixi-list-item-content">{content}</div>}

          {/* Action */}
          {actionRender && <div className="lyrixi-list-item-action">{renderAction()}</div>}

          {/* Arrow */}
          {arrowVisible && <Input.IconRightArrow />}
        </div>

        {/* Right Checkbox */}
        {checkboxPlacement === 'right' && renderCheckbox()}
      </div>
    )
  }

  return renderItem()
}

export default Item
