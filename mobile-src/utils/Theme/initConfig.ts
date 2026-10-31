import variablesDefault from './../VariablesUtil/variablesDefault'
import variablesDark from './../VariablesUtil/variablesDark'

if (!window.lyrixiThemes) {
  window.lyrixiThemes = {}
}
if (!window.lyrixiThemes.default) {
  window.lyrixiThemes.default = { ...variablesDefault }
}
if (!window.lyrixiThemes.dark) {
  window.lyrixiThemes.dark = { ...variablesDark }
}
if (!window.currentThemeName) {
  window.currentThemeName = 'default'
}
