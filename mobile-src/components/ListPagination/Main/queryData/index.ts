import React from 'react'

import type { ListPaginationQueryDataParams } from './ListPagination.Main.queryData.types'

// 内库使用-start
import type { ListLoadResult } from '../../../ListAsync/types'
import LocaleUtil from './../../../../utils/LocaleUtil'
import Request from './../../../../utils/Request'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Request } from 'lyrixi-mobile'
测试使用-end */

function queryData(
  url: string,
  headers: Record<string, string> = {},
  payload: Record<string, unknown> | undefined,
  params: ListPaginationQueryDataParams = {} as ListPaginationQueryDataParams
): Promise<ListLoadResult> {
  const { rows, pageRef, previousResult, action, formatPayload, formatResponse } = params
  // eslint-disable-next-line
  return new Promise(async (resolve) => {
    if (action === 'bottomRefresh') {
      if (pageRef.current !== null) {
        ;(pageRef as React.MutableRefObject<number>).current++
      }
    } else {
      ;(pageRef as React.MutableRefObject<number>).current = 1
    }

    const baseParams: Record<string, unknown> = {
      rows: rows,
      ...(payload || {}),
      page: rows ? pageRef.current : undefined
    }
    let queryParams = (await formatPayload?.(baseParams)) || baseParams

    Request.post(url, queryParams, {
      headers: {
        'Content-Type': 'application/json',
        ...(headers || {})
      }
    })
      .then(async (response: unknown) => {
        let newResult: ListLoadResult = formatResponse
          ? await formatResponse(response, { payload: queryParams })
          : (response as ListLoadResult)
        // 当前列表
        let currentList = pageRef.current === 1 ? [] : previousResult?.data?.list
        const pageList = newResult.data?.list

        // 加载成功
        if (newResult.status !== 'error') {
          // 判断是否暂无数据
          if (!currentList?.length && !pageList?.length) {
            newResult.status = 'empty'
          }
          // 不分页
          else if (!rows) {
            newResult.status = 'noMore'
          }
          // 有总页数, 优先使用总页数判断
          else if (newResult.data?.totalPage) {
            if ((pageRef.current ?? 1) >= newResult.data.totalPage) {
              newResult.status = 'noMore'
            } else {
              newResult.status = 'loading'
            }
          }
          // 有总行数, 优先使用总页数判断
          else if (newResult.data?.totalRows) {
            if ((currentList?.length || 0) + (pageList?.length || 0) >= newResult.data.totalRows) {
              newResult.status = 'noMore'
            } else {
              newResult.status = 'loading'
            }
          }
          // 无总页数无总行数, 根据rows判断是否为最后一页
          else if ((pageList?.length ?? 0) < (rows ?? 0)) {
            newResult.status = 'noMore'
          }
          // 有更多数据
          else {
            newResult.status = 'loading'
          }
        }

        resolve(newResult)
      })
      .catch((err: { data?: { message?: string } }) => {
        const fallback = LocaleUtil.locale(
          '获取数据异常！',
          'lyrixi_a085fb7c5cb81143dcec0f299fff709a'
        )
        resolve({
          status: 'error',
          message: String((typeof err?.data?.message === 'string' && err.data.message) || fallback)
        })
      })
  })
}

export default queryData
