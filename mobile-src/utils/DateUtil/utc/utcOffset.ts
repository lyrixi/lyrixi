import dayjs from 'dayjs'
// 时区方法: 获取当前UTC偏移量, 分钟数是国际时区标准, 返回: 总分钟数
function utcOffset() {
  return dayjs().utcOffset()
}

export default utcOffset
