import type { SelectItem } from '../types'

// 扁平分组：仅 type: 'group' 为分组头，普通项不必写 type（与 List 一致）
const groupList = [
  {
    avatar: 'https://api.dicebear.com/7.x/miniavs/svg',
    id: 'Option',
    name: 'Option',
    description: 'Description',
    content: 'Custom Content'
  },
  {
    id: 'group-title',
    type: 'group',
    name: 'This is group title'
  },
  {
    id: 'Group-Option',
    name: 'Group-Option',
    description: '分组内部描述'
  },
  {
    id: 'Group-Option2',
    name: 'Group-Option2'
  },
  {
    id: 'Option2',
    name: 'Option2',
    content: '+86'
  },
  {
    id: '3',
    name: 'Option5'
  },
  {
    id: '4',
    name: 'Option5'
  },
  {
    id: '5',
    name: 'Option5'
  },
  {
    id: '6',
    name: 'Option6'
  },
  {
    id: '7',
    name: 'Option7'
  },
  {
    id: '8',
    name: 'Option8'
  },
  {
    id: '9',
    name: 'Option9'
  },
  {
    id: '10',
    name: 'Option10'
  },
  {
    id: '11',
    name: 'Option11'
  },
  {
    id: '12',
    name: 'Option12'
  },
  {
    id: '13',
    name: 'Option13'
  },
  {
    id: '14',
    name: 'Option14'
  },
  {
    id: '15',
    name: 'Option15'
  },
  {
    id: '16',
    name: 'Option16'
  },
  {
    id: '17',
    name: 'Option17'
  },
  {
    id: '18',
    name: 'Option18'
  },
  {
    id: '19',
    name: 'Option19'
  },
  {
    id: '20',
    name: 'Option20'
  },
  {
    id: '21',
    name: 'Option21'
  }
] as SelectItem[]

export default groupList
