import type { PickerItem } from '../../types'

// 内库使用-start
import DataUtil from './../../../../utils/DataUtil'
// 内库使用-end

// 格式化值
// 返回值 mock:
// null
// 或
// [
//   { id: '1', name: '选项1' },
//   { id: 'a', name: '选项A' }
// ]
function formatValue(
  value: PickerItem[] | null | undefined,
  { lists, listCount }: { lists: PickerItem[][] | null; listCount: number }
): PickerItem[] | null {
  if (!Array.isArray(lists)) return null

  let newValue: PickerItem[] | null = null
  if (!Array.isArray(value)) {
    newValue = [...Array(listCount)].map((_item, slotIndex) => {
      return (lists as PickerItem[][])[slotIndex][0]
    })
    return newValue
  } else {
    newValue = DataUtil.cloneDeep(value) as PickerItem[]
  }

  // 如果项数少，填充数组
  if (newValue.length < listCount) {
    newValue = [...Array(listCount)].map((item, slotIndex) => {
      if (!value?.[slotIndex]) {
        return lists[slotIndex][0]
      }
      return value[slotIndex]
    })
  }
  // 如果项数多，减少数组
  else if (newValue.length > listCount) {
    newValue = newValue.slice(0, listCount)
  }

  return newValue
}

export default formatValue
