import type { TreeItem } from '../types'

// 内库使用-start
import ArrayUtil from '../../../utils/ArrayUtil'
// 内库使用-end

/* 测试使用-start
import { ArrayUtil } from 'lyrixi-mobile'
测试使用-end */

function findNode(id: string | number, list?: TreeItem[]): TreeItem | null {
  if (!Array.isArray(list) || !list.length) {
    return null
  }
  return ArrayUtil.getDeepTreeNode(
    list as Parameters<typeof ArrayUtil.getDeepTreeNode>[0],
    id
  ) as TreeItem | null
}

// 优先用离线 list 补全，没有再查已加载缓存；选中项字段覆盖节点字段
function completeItem(
  item: TreeItem,
  externalList?: TreeItem[],
  loadDataList?: TreeItem[]
): TreeItem {
  if (item?.id === undefined || item?.id === null) {
    return item
  }

  const node = findNode(item.id, externalList) ?? findNode(item.id, loadDataList)
  if (!node) {
    return item
  }

  // 过滤掉 children 字段
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let { children, ...extraItem } = node

  return { ...extraItem, ...item }
}

function formatValue(
  value: TreeItem | TreeItem[] | null | undefined,
  externalList?: TreeItem[],
  loadDataList?: TreeItem[]
): TreeItem | TreeItem[] | null {
  if (!value) {
    return null
  }
  if (Array.isArray(value)) {
    return value.map((item) => completeItem(item, externalList, loadDataList))
  }
  return completeItem(value, externalList, loadDataList)
}

export default formatValue
