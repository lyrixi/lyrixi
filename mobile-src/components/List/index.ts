import _List from './List'
import InfiniteScroll from './InfiniteScroll'
import HeaderItem from './HeaderItem'
import Item from './Item'

import type { ListComponents } from './types/List.modules.types'

const List = _List as ListComponents

List.HeaderItem = HeaderItem
List.InfiniteScroll = InfiniteScroll
List.Item = Item

export default List
