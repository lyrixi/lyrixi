import type { ListLoadResult, TreeItem, TreeLoadDataResult } from 'lyrixi-mobile'

export function treeDemoLoadData(node: TreeItem | null): Promise<TreeLoadDataResult> {
  if (node === null) {
    return Promise.resolve({
      status: 'success',
      data: {
        list: [{ id: 'root', name: '树选项' }]
      }
    })
  }

  const nodeId = String(node.id ?? '')

  if (nodeId === 'root') {
    return Promise.resolve({
      status: 'success',
      data: {
        list: [{ id: 'l1', name: '一级树结构', parentid: 'root' }]
      }
    })
  }

  if (nodeId === 'l1') {
    return Promise.resolve({
      status: 'success',
      data: {
        list: [{ id: 'l2', name: '二级树结构', parentid: 'l1' }]
      }
    })
  }

  if (nodeId === 'l2') {
    return Promise.resolve({
      status: 'success',
      data: {
        list: [
          { id: 'a', name: 'A文件夹', parentid: 'l2', isLeaf: true },
          { id: 'b', name: 'B文件夹', parentid: 'l2', isLeaf: true }
        ]
      }
    })
  }

  return Promise.resolve({
    status: 'empty',
    data: { list: [] }
  })
}

export function treeDemoLoadSearchData(keyword: string): Promise<ListLoadResult> {
  const trimmed = keyword.trim()
  if (!trimmed) {
    return Promise.resolve({
      status: 'empty',
      data: { list: [] }
    })
  }

  const matches = [
    {
      id: 'a',
      name: 'A文件夹',
      path: [
        { id: 'root', name: '树选项' },
        { id: 'l1', name: '一级树结构' },
        { id: 'l2', name: '二级树结构' },
        { id: 'a', name: 'A文件夹' }
      ]
    },
    {
      id: 'b',
      name: 'B文件夹',
      path: [
        { id: 'root', name: '树选项' },
        { id: 'l1', name: '一级树结构' },
        { id: 'l2', name: '二级树结构' },
        { id: 'b', name: 'B文件夹' }
      ]
    }
  ].filter((row) => String(row.name).includes(trimmed))

  if (!matches.length) {
    return Promise.resolve({
      status: 'empty',
      data: { list: [] }
    })
  }

  return Promise.resolve({
    status: 'noMore',
    data: { list: matches }
  })
}
