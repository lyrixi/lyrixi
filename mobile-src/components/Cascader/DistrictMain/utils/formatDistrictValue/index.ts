import sortValue from './sortValue'
import findDistrictLeafIndex from './findDistrictLeafIndex'

import type { DistrictItem } from '../../../types'

// 内库使用-start
import ValidatorUtil from '../../../../../utils/ValidatorUtil'
import ArrayUtil from '../../../../../utils/ArrayUtil'
// 内库使用-end

/* 测试使用-start
import { ValidatorUtil, ArrayUtil } from 'lyrixi-mobile'
测试使用-end */

// 更新value的type
function formatDistrictValue(
  value: DistrictItem[],
  { list, maxType }: { list: DistrictItem[]; maxType?: string }
): DistrictItem[] | null {
  if (!Array.isArray(value) || !value.length || !Array.isArray(list) || !list.length) return null

  for (const item of value) {
    if (item.id && typeof item.id === 'number') {
      item.id = String(item.id)
    }

    if (item.id) {
      // getDeepTreeNode 期望带 id 的树节点；与 DistrictItem 在运行时一致
      const node = ArrayUtil.getDeepTreeNode(
        list as unknown as Parameters<typeof ArrayUtil.getDeepTreeNode>[0],
        item.id
      ) as DistrictItem | null
      if (node) {
        item.type = node.type
      }
    }
  }

  sortValue(value)

  for (let index = 0; index < value.length; index++) {
    const item = value[index] as DistrictItem
    if (item.parentid && typeof item.parentid === 'number') {
      item.parentid = String(item.parentid)
    }
    if (index !== 0 && !item.parentid) {
      item.parentid = value?.[index - 1]?.id || ''
    }

    if (
      ValidatorUtil.isEmpty(value[index].type) &&
      index === value.length - 1 &&
      (value[index - 1]?.type?.includes('city') || value[index - 1]?.type?.includes('district'))
    ) {
      item.type = ['street']
    }
  }

  if (maxType) {
    const leafIndex = findDistrictLeafIndex(value, maxType)
    if (leafIndex >= 0 && leafIndex < value.length) {
      value.length = leafIndex + 1
      value[value.length - 1].isLeaf = true
    }
  }

  return value
}

export default formatDistrictValue
