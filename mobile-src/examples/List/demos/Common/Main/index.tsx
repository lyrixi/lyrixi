import React, { forwardRef, type Ref } from 'react'

import { ListPagination, type ListPaginationMainRef } from 'lyrixi-mobile'

import formatPayload from './formatPayload'
import localData from './formatResponse'
import formatViewItem from './formatViewItem'
import type { ListDemoFormatPayloadParams, ListDemoMainProps } from './types'

// 简便的列表组件, 只需要传入url和params即可
const Main = forwardRef<ListPaginationMainRef, ListDemoMainProps>(
  ({ cacheName, virtual, queryParams }: ListDemoMainProps, ref: Ref<ListPaginationMainRef>) => {
    return (
      <ListPagination.Main
        ref={ref}
        cacheName={cacheName}
        virtual={virtual}
        url="/"
        payload={queryParams}
        formatPayload={({ page, ...payload }: ListDemoFormatPayloadParams) => {
          return formatPayload({
            ...payload,
            page
          })
        }}
        formatResponse={localData}
        formatViewItem={formatViewItem}
        onChange={() => {}}
      />
    )
  }
)

export type { ListDemoMainProps } from './types'
export default Main
