import type { CascaderMainUpdateIsLeafParams } from '../types'

// 设置叶子节点
function updateIsLeaf(
  id: string | number,
  { currentValue, value, tabsRef }: CascaderMainUpdateIsLeafParams
): void {
  for (const tab of currentValue || []) {
    if (tab && tab.id === id) {
      tab.isLeaf = true
      break
    }
  }

  for (const tab of value || []) {
    if (tab && tab.id === id) {
      tab.isLeaf = true
      break
    }
  }

  for (const tab of tabsRef.current || []) {
    if (tab && tab.id === id) {
      tab.isLeaf = true
      break
    }
  }
}

export default updateIsLeaf
