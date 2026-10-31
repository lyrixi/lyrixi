import hasIntersection from './hasIntersection'

import type { DistrictSearchByKeywordNode, DistrictSearchByKeywordResult } from '../../../types'

// 内库使用-start
import ArrayUtil from './../../../../../utils/ArrayUtil'
import LocaleUtil from '../../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, ArrayUtil } from 'lyrixi-mobile'
测试使用-end */

function searchByKeyword(
  keyword: string,
  { list: externalList, type }: { list: DistrictSearchByKeywordNode[]; type: string }
): DistrictSearchByKeywordResult {
  const levelTypes = ['country', 'province', 'city', 'district', 'street']
  const currentLevelTypes = levelTypes.slice(0, levelTypes.indexOf(type) + 1)

  const currentList =
    keyword && keyword.trim()
      ? ArrayUtil.getDeepTreeNodes(externalList, (node: DistrictSearchByKeywordNode) => {
          if (
            String(node.name).includes(keyword) &&
            Array.isArray(node.type) &&
            hasIntersection(currentLevelTypes, node.type)
          ) {
            return true
          }
          return false
        })
      : []

  if (currentList.length > 0) {
    return {
      status: 'success',
      message: '',
      data: {
        list: currentList.map((node: DistrictSearchByKeywordNode) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { children, ...restNode } = node
          const path = ArrayUtil.getDeepTreePredecessorNodes(
            externalList,
            node.id
          ) as DistrictSearchByKeywordNode[]
          return {
            ...restNode,
            path: path.concat(node)
          }
        })
      }
    }
  }

  return {
    status: 'empty',
    message: !keyword?.trim?.()
      ? String(LocaleUtil.locale('请输入关键字', 'lyrixi_db91cb073ee4c9b76289e93ae2b4aa04') ?? '')
      : String(LocaleUtil.locale('暂无数据', 'lyrixi_21efd88b67a39834582ad99aabb9dc60') ?? ''),
    data: { list: [] }
  }
}

export default searchByKeyword
