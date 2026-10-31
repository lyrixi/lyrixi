import dimensionalArray from './dimensionalArray'

import type { PickerItem } from '../../types'

// 一维数组强制改成二维数组
function listViewFormatter(list?: PickerItem[] | PickerItem[][] | null): {
  lists: PickerItem[][] | null
  listCount: number
} {
  const dimensional = dimensionalArray(list)

  if (dimensional === 2) {
    return {
      lists: list as PickerItem[][],
      listCount: (list as PickerItem[][]).length
    }
  }

  if (dimensional === 1) {
    return {
      lists: [list as PickerItem[]],
      listCount: 1
    }
  }

  return {
    lists: null,
    listCount: 0
  }
}

export default listViewFormatter
