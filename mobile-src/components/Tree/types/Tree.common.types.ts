import type { ListLoadResult } from '../../ListAsync/types'
import type { ListItem } from '../../List/types'

/** `true` / `false` 控制整表；`'leaf'` 仅末级节点展示 Checkbox（经 formatViewItem 写入行级 checkable） */
export type TreeCheckable = boolean | 'leaf'

export interface TreeItem extends Omit<ListItem, 'id' | 'name'> {
  id: string | number
  name: string
  isLeaf?: boolean
  parentid?: string | number | null
  children?: TreeItem[]
}

export interface TreeLoadDataResult {
  status: string
  code?: string
  message?: string
  data?: { list?: ListItem[] }
}

/** 逐级加载；根层级传 `null` */
export type TreeLoadDataFn = (node: TreeItem | null) => Promise<TreeLoadDataResult>

/** 异步搜索；返回形态与 {@link ListLoadResult} / ListAsync `loadData` 一致（如 `noMore`、`empty`） */
export type TreeLoadSearchDataFn = (keyword: string) => Promise<ListLoadResult>

/** `submit` 回车/搜索键触发；`input` 输入防抖后触发 */
export type TreeSearchAction = 'submit' | 'input'
