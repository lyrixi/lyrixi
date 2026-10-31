// 内库使用-start
import type { ListItem } from '../../List/types'
// 内库使用-end

// 业务已拉平 list；为虚拟列表高度计算同步 virtualData.type
function flattenList(list: ListItem[] | undefined | null): ListItem[] {
  if (!Array.isArray(list)) return []

  return list.map((item) => {
    if (item.type === 'group' && item.virtualData?.type !== 'group') {
      return {
        ...item,
        virtualData: {
          ...item.virtualData,
          type: 'group'
        }
      }
    }
    return item
  })
}

export default flattenList
