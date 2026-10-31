// 任意路径 import Theme 时先 configure
import './initConfig'
import getTheme from './getTheme'
import setTheme from './setTheme'
import config from './config'

const Theme = {
  getTheme,
  setTheme,
  config
}

export default Theme
