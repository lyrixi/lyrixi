// 获取滑块
function querySlides() {
  return new Promise((resolve) => {
    resolve({
      data: [
        {
          id: 'week',
          name: 'Week'
        },
        {
          id: 'month',
          name: 'Month'
        }
      ]
    })
  })
}

export default querySlides
