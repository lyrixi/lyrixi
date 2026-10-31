import type { TreeItem } from 'lyrixi-mobile'

const treeDemoAvatar = (seed: string) =>
  `https://api.dicebear.com/7.x/miniavs/svg?seed=${encodeURIComponent(seed)}`

export const treeDemoList: TreeItem[] = [
  {
    id: 'root',
    name: '树选项',
    children: [
      {
        id: 'l1',
        name: '一级树结构',
        parentid: 'root',
        children: [
          {
            id: 'l2',
            name: '二级树结构',
            parentid: 'l1',
            children: [
              {
                id: 'a',
                name: '员工1',
                parentid: 'l2',
                isLeaf: true,
                avatarUrl: treeDemoAvatar('a')
              },
              {
                id: 'b',
                name: '员工2',
                parentid: 'l2',
                isLeaf: true,
                avatarUrl: treeDemoAvatar('b')
              },
              {
                id: 'c',
                name: '员工3',
                parentid: 'l2',
                isLeaf: true
              }
            ]
          }
        ]
      }
    ]
  }
]
