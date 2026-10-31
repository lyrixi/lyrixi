import React from 'react'

import type { TreeItem } from '../../types'
import type { TreeMainFooterProps } from '../../types'

// 内库使用-start
import LocaleUtil from '../../../../utils/LocaleUtil'
import Button from '../../../Button'
import Page from '../../../Page'
import Tag from './Tag'
// 内库使用-end

function getValueList(value?: TreeItem | TreeItem[] | null): TreeItem[] {
  if (Array.isArray(value)) {
    return value
  }
  if (value) {
    return [value]
  }
  return []
}

const Footer = ({ formatViewItem, value, ok, onDelete, onOk }: TreeMainFooterProps) => {
  const locale = LocaleUtil.locale
  const valueList = getValueList(value)
  const count = valueList.length

  return (
    <Page.Footer className="lyrixi-tree-footer">
      <div className="lyrixi-tree-footer-tags">
        {valueList.map((item, index) => (
          <Tag
            key={String(item.id)}
            formatViewItem={formatViewItem}
            item={item}
            index={index}
            onDelete={onDelete}
          />
        ))}
      </div>
      {onOk ? (
        <Button
          className="lyrixi-tree-footer-ok"
          variant="solid"
          color="primary"
          radius="l"
          onClick={onOk}
        >
          {ok ?? (
            <>
              {locale('确定', 'lyrixi_38cf16f2204ffab8a6e0187070558721')}
              {count ? `(${count})` : ''}
            </>
          )}
        </Button>
      ) : null}
    </Page.Footer>
  )
}

export default Footer
