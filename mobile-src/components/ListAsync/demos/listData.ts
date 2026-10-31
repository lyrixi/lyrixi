const GROUP_SIZE = 10
const TOTAL = 40

const listData: Array<Record<string, unknown>> = []

for (let i = 0; i < TOTAL; i++) {
  if (i % GROUP_SIZE === 0) {
    const groupIndex = i / GROUP_SIZE + 1
    listData.push({
      id: `group-${groupIndex}`,
      type: 'group',
      title: `第 ${groupIndex} 组`,
      name: `第 ${groupIndex} 组`,
      description: `分组 ${groupIndex}`
    })
  }
  listData.push({
    id: String(i + 1),
    name: `列表项 ${i + 1}`,
    description: `description ${i + 1}`
  })
}

export default listData
