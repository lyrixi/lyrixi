// 测试数据
const mockResult = {
  code: '1',
  data: {
    list: [
      {
        id: '3',
        name: 'Alice Smith',
        anchor: 'A',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '29',
        name: 'Amy Adams',
        anchor: 'A',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '4',
        name: 'Bob Johnson',
        anchor: 'B',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '30',
        name: 'Brian Baker',
        anchor: 'B',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '5',
        name: 'Carol White',
        anchor: 'C',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '31',
        name: 'Catherine Nelson',
        anchor: 'C',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '32',
        name: 'Daniel Carter',
        anchor: 'D',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '6',
        name: 'David Brown',
        anchor: 'D',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '33',
        name: 'Emily Mitchell',
        anchor: 'E',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '7',
        name: 'Emma Davis',
        anchor: 'E',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '8',
        name: 'Frank Miller',
        anchor: 'F',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '34',
        name: 'Frederick Perez',
        anchor: 'F',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '35',
        name: 'Georgia Roberts',
        anchor: 'G',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '9',
        name: 'Grace Wilson',
        anchor: 'G',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '36',
        name: 'Harold Turner',
        anchor: 'H',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '10',
        name: 'Henry Moore',
        anchor: 'H',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '37',
        name: 'Iris Phillips',
        anchor: 'I',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '11',
        name: 'Isabel Taylor',
        anchor: 'I',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '12',
        name: 'Jack Anderson',
        anchor: 'J',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '38',
        name: 'James Campbell',
        anchor: 'J',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '2',
        name: 'Jane Doe',
        anchor: 'J',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '1',
        name: 'John Doe',
        anchor: 'J',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '13',
        name: 'Kate Thomas',
        anchor: 'K',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '39',
        name: 'Kelly Parker',
        anchor: 'K',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '14',
        name: 'Leo Jackson',
        anchor: 'L',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '40',
        name: 'Louis Evans',
        anchor: 'L',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '15',
        name: 'Mia Martin',
        anchor: 'M',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '41',
        name: 'Monica Edwards',
        anchor: 'M',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '42',
        name: 'Nathan Collins',
        anchor: 'N',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '16',
        name: 'Noah Lee',
        anchor: 'N',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '17',
        name: 'Olivia Harris',
        anchor: 'O',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '43',
        name: 'Ophelia Stewart',
        anchor: 'O',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '44',
        name: 'Patrick Sanchez',
        anchor: 'P',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '18',
        name: 'Peter Clark',
        anchor: 'P',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '45',
        name: 'Queenie Morris',
        anchor: 'Q',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '19',
        name: 'Quinn Lewis',
        anchor: 'Q',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '20',
        name: 'Rachel Walker',
        anchor: 'R',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '46',
        name: 'Raymond Rogers',
        anchor: 'R',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '21',
        name: 'Samuel Hall',
        anchor: 'S',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '47',
        name: 'Sophia Reed',
        anchor: 'S',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '48',
        name: 'Theodore Cook',
        anchor: 'T',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '22',
        name: 'Tina Young',
        anchor: 'T',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '49',
        name: 'Uma Morgan',
        anchor: 'U',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '23',
        name: 'Ursula King',
        anchor: 'U',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '24',
        name: 'Victor Wright',
        anchor: 'V',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '50',
        name: 'Vincent Bell',
        anchor: 'V',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '25',
        name: 'Wendy Lopez',
        anchor: 'W',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '26',
        name: 'Xavier Hill',
        anchor: 'X',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '27',
        name: 'Yolanda Scott',
        anchor: 'Y',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      },
      {
        id: '28',
        name: 'Zachary Green',
        anchor: 'Z',
        introduce: 'This is a introduce',
        avatarUrl: 'https://lyrixi.github.io/lyrixi/assets/images/list/avatar-default.png'
      }
    ],
    totalPage: 1
  }
}

export default mockResult
