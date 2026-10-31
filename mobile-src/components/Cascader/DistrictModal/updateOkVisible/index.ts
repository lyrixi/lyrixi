import compareType from './compareType'

import type { DistrictModalUpdateOkVisibleTabItem } from '../Cascader.DistrictModal.updateOkVisible.types'

// 根据min判断是否显示确定按钮
function updateOkVisible(
  tabs: DistrictModalUpdateOkVisibleTabItem[] | null | undefined,
  minType: string
): boolean {
  if (!Array.isArray(tabs) || !tabs.length || !minType) {
    return false
  }

  let newOkVisible = false

  const currentTypes = tabs[tabs.length - 1]?.type
  if (currentTypes) {
    for (const currentType of currentTypes) {
      const cmp = compareType(currentType, minType)
      if (cmp !== null && cmp >= 0) {
        newOkVisible = true
        break
      }
    }
  }

  return newOkVisible
}

export default updateOkVisible
