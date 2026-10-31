import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react'
import getChildrenByList from './api/getChildrenByList'
import getChildrenByLoad from './api/getChildrenByLoad'
import DefaultAvatar from './DefaultAvatar'
import defaultFormatViewItem from './formatViewItem'
import formatValue from './formatValue'
import getItemCheckable from './getItemCheckable'
import Footer from './Footer'
import SearchControl from './SearchControl'

import type { TreeMainProps, TreeMainRef, TreeItem } from '../types'
import type { BreadcrumbItem } from '../../Breadcrumb/types'
import type { ListAsyncRef, ListLoadResult } from '../../ListAsync/types'

// 内库使用-start
import type { ListItem, ListViewItem } from '../../List/types'
import DOMUtil from '../../../utils/DOMUtil'
import LocaleUtil from '../../../utils/LocaleUtil'
import ListAsync from '../../ListAsync'
import Breadcrumb from '../../Breadcrumb'
import Page from '../../Page'
// 内库使用-end

const TreeMain = forwardRef<TreeMainRef, TreeMainProps>(
  (
    {
      // Value & Display Value
      value: externalValue,
      list: externalList,
      loadData: externalLoadData,
      loadSearchData: externalLoadSearchData,
      defaultParentAvatarSvg,
      defaultParentAvatarUrl,
      defaultLeafAvatarSvg,
      defaultLeafAvatarUrl,
      formatViewItem,

      // Status
      multiple = true,
      checkable = true,
      virtual,

      // Style
      className,

      // Elements
      searchVisible,
      searchAction,
      searchNodeTitle,
      searchGroupTitle,
      ok,

      // Events
      onChange,
      onOk
    },
    ref
  ) => {
    const listAsyncRef = useRef<ListAsyncRef | null>(null)
    // loadData已加载过的数据无需再次加载
    const loadDataListRef = useRef<TreeItem[]>([])
    const tabsRef = useRef<TreeItem[]>([])
    const [tabs, setTabs] = useState<TreeItem[]>([])

    let value = formatValue(externalValue, externalList, loadDataListRef.current)

    // 默认头像
    const defaultAvatar = {
      parentDefaultAvatar: DefaultAvatar.getParentDefaultAvatar({
        defaultParentAvatarSvg,
        defaultParentAvatarUrl
      }),
      leafDefaultAvatar: DefaultAvatar.getDefaultLeafAvatar({
        defaultLeafAvatarSvg,
        defaultLeafAvatarUrl
      })
    }

    async function loadData(): Promise<ListLoadResult> {
      const parent = tabsRef.current.at(-1) ?? null

      if (externalList?.length) {
        return getChildrenByList(parent, externalList)
      }

      if (typeof externalLoadData === 'function') {
        return getChildrenByLoad(parent, externalLoadData, loadDataListRef)
      }

      return {
        status: 'error',
        message: LocaleUtil.locale(
          '请传入list或者loadData用于加载数据',
          'lyrixi_09997e55c1dc0eca78896d80f812cb24'
        ) as string
      }
    }

    function updateTabs(next: TreeItem[]) {
      tabsRef.current = next
      setTabs(next)
      listAsyncRef.current?.reload?.('reload')
    }

    useImperativeHandle(ref, () => ({
      get mainElement() {
        return listAsyncRef.current?.element ?? null
      },
      getMainElement: () => listAsyncRef.current?.element ?? null,
      reset: () => {
        tabsRef.current = []
        setTabs([])
        listAsyncRef.current?.reload?.('load')
      }
    }))

    function handleDrill(item: TreeItem) {
      if (item.isLeaf) {
        return
      }

      updateTabs([
        ...tabsRef.current,
        { id: item.id, name: item.name, parentid: item.parentid, isLeaf: item.isLeaf }
      ])
    }

    function handleTabClick(item: BreadcrumbItem) {
      if (item.id === '0') {
        updateTabs([])
        return
      }
      const index = tabsRef.current.findIndex((row) => row.id === item.id)
      if (index === -1) {
        return
      }
      updateTabs(tabsRef.current.slice(0, index + 1))
    }

    function handleDelete(item: TreeItem) {
      if (!multiple || !Array.isArray(value)) {
        onChange?.(null)
        return
      }
      onChange?.(value.filter((row) => row.id !== item.id))
    }

    // 显示底部选中区域时，搜索页面底部需要空出来，单选没有底部选中区域
    const footerVisible = checkable && multiple

    function _formatViewItem(item: ListItem, options: { index: number }): ListViewItem {
      if (item.type === 'group') {
        return item
      }

      let viewItem: ListViewItem
      if (formatViewItem) {
        viewItem = formatViewItem(item as TreeItem, { index: options.index }, defaultAvatar)
      } else {
        viewItem = defaultFormatViewItem(item, { index: options.index }, defaultAvatar)
      }

      viewItem.checkable = getItemCheckable(item, viewItem, checkable)
      return viewItem
    }

    return (
      <Page className={DOMUtil.classNames('lyrixi-tree-page', className)} full={false}>
        {searchVisible ? (
          <SearchControl
            list={externalList}
            loadSearchData={externalLoadSearchData}
            value={value}
            multiple={multiple}
            virtual={virtual}
            formatViewItem={_formatViewItem}
            searchAction={searchAction}
            searchNodeTitle={searchNodeTitle}
            searchGroupTitle={searchGroupTitle}
            footerVisible={footerVisible}
            onChange={onChange}
          />
        ) : null}
        {tabs.length > 0 ? (
          <Breadcrumb
            className="lyrixi-tree-breadcrumb"
            block
            list={[
              {
                name: LocaleUtil.locale('全部', 'lyrixi_a8b0c20416853bda54120bf19477ad11'),
                id: '0'
              },
              ...tabs
            ]}
            value={tabs[tabs.length - 1]}
            onChange={handleTabClick}
          />
        ) : null}

        <ListAsync
          ref={listAsyncRef}
          className="lyrixi-tree-list"
          topRefreshEnabled={false}
          bottomRefreshEnabled={false}
          loadData={loadData}
          formatViewItem={_formatViewItem}
          multiple={multiple}
          virtual={virtual}
          value={value}
          onChange={(newValue, options) => {
            if (options?.action === 'item' && options.currentItem && !options.currentItem?.isLeaf) {
              handleDrill(options.currentItem as TreeItem)
              return
            }
            onChange?.(newValue as TreeItem | TreeItem[] | null)
          }}
        />

        {footerVisible ? (
          <Footer
            formatViewItem={_formatViewItem}
            value={value}
            ok={ok}
            onDelete={handleDelete}
            onOk={onOk}
          />
        ) : null}
      </Page>
    )
  }
)

export default TreeMain
