import React, { useImperativeHandle, forwardRef, useEffect, useState } from 'react'
import {
  loadBaseData,
  loadData as _loadData,
  formatType,
  formatDistrictValue,
  searchByKeyword
} from './utils/index'
import api from './api'
import Main from './../Main'
import DistrictMainResult from './Result'
import DistrictMainLoading from './Loading'
import type { CascaderItem, LoadDataResult } from './../types'

import type { DistrictResultState } from '../types'
import type { DistrictItem } from './../types'
import type { CascaderDistrictMainProps, LoadCountryRegionsFn, LoadStreetsFn } from '../types'

// 内库使用-start
import DataUtil from '../../../utils/DataUtil'
import ArrayUtil from '../../../utils/ArrayUtil'
// 内库使用-end

/* 测试使用-start
import { DataUtil, LocaleUtil, ArrayUtil, Button, Result } from 'lyrixi-mobile'
测试使用-end */

// 地址选择
const CascaderDistrictMain = forwardRef<
  { loadList: () => Promise<void>; list: unknown },
  CascaderDistrictMainProps
>(
  (
    {
      // Value & Display Value
      value,
      type: externalType,
      loadCountries = api.loadCountries,
      loadCountryRegions = api.loadCountryRegions,
      loadStreets = api.loadStreets,
      // Status
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      open = true,
      searchVisible = true,
      // Style
      listStyle,
      listClassName,
      itemStyle,
      itemClassName,
      // Events
      onChange
    },
    ref
  ) => {
    const maxType = formatType(externalType ?? 'street')

    const [result, setResult] = useState<DistrictResultState | null>(null)

    const [fullValue, setFullValue] = useState<CascaderItem[] | null>(null)

    useEffect(() => {
      void initList()
      // eslint-disable-next-line
    }, [value])

    useImperativeHandle(ref, () => {
      return {
        loadList: initList,
        list: result?.data?.list
      }
    })

    async function initList() {
      setResult(null)

      const baseData = await loadBaseData({
        countryId: value?.[0]?.id,
        loadCountries,
        loadCountryRegions: loadCountryRegions as (
          id?: string | number
        ) => Promise<DistrictResultState>
      })

      if (baseData?.status === 'error') {
        setResult(baseData)
        return
      }

      let newValue = value
      if (value?.length && baseData?.data?.list?.length) {
        const formatted = formatDistrictValue(DataUtil.cloneDeep(value) as DistrictItem[], {
          list: baseData.data.list as DistrictItem[],
          maxType
        })
        newValue = (formatted ?? value) as CascaderItem[]
      }

      const lastTab = newValue?.[newValue.length - 1]
      if (
        !newValue?.length ||
        ArrayUtil.getDeepTreeNode(
          (baseData?.data?.list ?? []) as unknown as Parameters<
            typeof ArrayUtil.getDeepTreeNode
          >[0],
          lastTab?.id as string | number
        )
      ) {
        setResult(baseData)

        if (
          !ArrayUtil.isEqual(
            (fullValue ?? []) as Record<string, unknown>[],
            (newValue ?? []) as Record<string, unknown>[]
          )
        ) {
          setFullValue(newValue ?? null)
        }
        return
      }

      const districtId = value?.[value.length - 2]?.id
      if (districtId === undefined) {
        setResult(baseData)
        return
      }
      const streetsData = await loadStreets(districtId, { value: newValue })
      if (streetsData?.status === 'error') {
        setResult(streetsData)
        return
      }
      if (streetsData?.status === 'success' && baseData.data?.list) {
        const tree = baseData.data.list as unknown as Parameters<
          typeof ArrayUtil.setDeepTreeNode
        >[0]
        ArrayUtil.setDeepTreeNode(tree, districtId, (node) => {
          node.children = (streetsData.data?.list ?? []) as unknown as NonNullable<
            typeof node.children
          >
        })
      }

      setResult(baseData)

      if (
        !ArrayUtil.isEqual(
          (value ?? []) as Record<string, unknown>[],
          (newValue ?? []) as Record<string, unknown>[]
        )
      ) {
        setFullValue(newValue ?? null)
      }
    }

    async function loadData(
      tabs: CascaderItem[],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _ctx: { list: CascaderItem[] }
    ): Promise<LoadDataResult> {
      const childrenData = await _loadData(tabs, {
        loadCountryRegions: loadCountryRegions as LoadCountryRegionsFn,
        loadStreets: loadStreets as LoadStreetsFn
      })
      return {
        status: childrenData.status,
        code: childrenData.code,
        message: childrenData.message,
        data: {
          list: childrenData.data?.list as CascaderItem[] | undefined
        }
      }
    }

    return (
      <>
        {!result?.status && <DistrictMainLoading />}
        {result?.status === 'error' && (
          <DistrictMainResult
            result={result}
            onReload={initList}
            style={listStyle}
            className={listClassName}
          />
        )}
        {result?.status === 'success' && (
          <Main
            value={fullValue ?? undefined}
            list={result?.data?.list as CascaderItem[] | undefined}
            loadData={loadData}
            listStyle={listStyle}
            listClassName={listClassName}
            itemStyle={itemStyle}
            itemClassName={itemClassName}
            searchVisible={searchVisible}
            onSearch={(keyword, { list }) =>
              searchByKeyword(keyword, {
                list: list as never,
                type: maxType
              })
            }
            onChange={(newValue) => {
              setFullValue(newValue)
              onChange?.(newValue)
            }}
          />
        )}
      </>
    )
  }
)

export default CascaderDistrictMain
