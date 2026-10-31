// 获取tabs
function queryTabs() {
  return new Promise((resolve) => {
    resolve({
      data: [
        { id: 'id1', name: 'Type1' },
        { id: 'id2', name: 'Type2' }
      ]
    })
  })
}

export default queryTabs
