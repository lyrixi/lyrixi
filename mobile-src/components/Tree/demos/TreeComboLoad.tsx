import React, { useState } from 'react'
import {
  Page,
  Card,
  Tree,
  Request,
  // Loading,
  LocaleUtil,
  type ListLoadResult,
  type TreeItem,
  type TreeLoadDataResult
} from 'lyrixi-mobile'

const locale = LocaleUtil.locale

const menuId = ''

async function loadDepartEmployeeTree(currentItem: TreeItem | null): Promise<TreeLoadDataResult> {
  // Loading.open()
  try {
    const result = await Request.post(
      '/platform/combo/v1/getComboTree.do?comboCode=depart_employee_tree',
      Request.serializeParams({
        viewSub: '1',
        menuId,
        isControl: '0',
        hasEmp: '1',
        opCodes: 'VIEW',
        deptId: currentItem?.id || '-1'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    if (!Array.isArray(result)) {
      return {
        status: 'error',
        message: 'Request failed'
      }
    }
    const list = result.map((item) => {
      return {
        id: item.id,
        name: item.text,
        parentid: currentItem?.id,
        avatarUrl: item?.props?.avatar,
        isLeaf: item?.props?.type === 'emp' ? true : false
      }
    })
    if (!list.length) {
      return { status: 'empty', data: { list: [] } }
    }
    return { status: 'success', data: { list } }
  } catch (error) {
    return {
      status: 'error',
      message: 'Request failed'
    }
  } finally {
    // Loading.close()
  }
}

async function loadSearchData(keyword: string): Promise<ListLoadResult> {
  const trimmed = keyword.trim()
  if (!trimmed) {
    return { status: 'empty', data: { list: [] } }
  }
  // Loading.open()
  try {
    const result = await Request.post(
      '/platform/combo/v1/getComboGrid.do?comboCode=employeeDepartForAt',
      Request.serializeParams({
        name: trimmed
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    const record =
      typeof result === 'object' && result !== null
        ? (result as { rows?: unknown; message?: unknown })
        : null
    if (!record || !Array.isArray(record.rows)) {
      const message = typeof record?.message === 'string' ? record.message : ''
      return {
        status: 'error',
        message: message || (locale('请求失败', 'tree_combo_request_failed') as string)
      }
    }
    const list = record.rows.map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.type === '1' ? item?.deptFullNames || '' : '',
        avatarUrl: item?.avatar,
        isLeaf: item.type === '1' ? true : false
      }
    })
    console.log(list)
    if (!list.length) {
      return { status: 'empty', data: { list: [] }, message: locale('未搜索到相关数据') as string }
    }
    return { status: 'noMore', data: { list } }
  } catch {
    return {
      status: 'error',
      message: locale('请求失败', 'tree_combo_request_failed') as string
    }
  } finally {
    // Loading.close()
  }
}

export default function TreeComboLoad() {
  const [value, setValue] = useState<TreeItem | TreeItem[] | null>([])

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Main>
            <Tree.Combo
              multiple
              checkable
              allowClear
              mode="tags"
              title={locale('部门员工', 'tree_combo_depart_employee')}
              placeholder={locale('请选择', 'tree_combo_placeholder') as string}
              loadData={loadDepartEmployeeTree}
              loadSearchData={loadSearchData}
              searchVisible
              searchNodeTitle={locale('人员') as string}
              searchGroupTitle={locale('部门') as string}
              value={value}
              defaultParentAvatarUrl="default"
              defaultLeafAvatarUrl="default"
              onChange={setValue}
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}
