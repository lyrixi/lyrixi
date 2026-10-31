import React, { forwardRef, type Ref } from 'react'

import { ListPagination, type ListPaginationMainRef } from 'lyrixi-mobile'

import formatPayload from './formatPayload'
import localData from './formatResponse'
import formatViewItem from './formatViewItem'
import type { IndexBarListMainProps, ListDemoFormatPayloadParams } from './types'

const Main = forwardRef<ListPaginationMainRef, IndexBarListMainProps>(
  (
    { cacheName, virtual, queryParams, onLoad, onItemVisibleChange }: IndexBarListMainProps,
    ref: Ref<ListPaginationMainRef>
  ) => {
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
        onLoad={onLoad}
        onItemVisibleChange={onItemVisibleChange}
        onChange={() => {}}
      />
    )
  }
)

export type { IndexBarListMainProps } from './types'
export default Main
