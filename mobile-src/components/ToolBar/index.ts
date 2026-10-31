import _ToolBar from './ToolBar'
import Dropdown from './Dropdown'
import DateRange from './DateRange'
import List from './List'
import ActionSheet from './ActionSheet'
import Search from './Search'
import SearchActive from './SearchActive'
import Button from './Button'
import Compact from './Compact'
import Filter from './Filter'

import type { ToolBarComponents } from './types/ToolBar.modules.types'

const ToolBar = _ToolBar as ToolBarComponents

ToolBar.Dropdown = Dropdown
ToolBar.DateRange = DateRange
ToolBar.List = List
ToolBar.ActionSheet = ActionSheet
ToolBar.Search = Search
ToolBar.SearchActive = SearchActive
ToolBar.Button = Button
ToolBar.Compact = Compact
ToolBar.Filter = Filter

export default ToolBar
