import HeaderItem from '../HeaderItem'
import InfiniteScroll from '../InfiniteScroll'
import Item from '../Item'
import List from '../List'

export type ListComponents = typeof List & {
  HeaderItem: typeof HeaderItem
  InfiniteScroll: typeof InfiniteScroll
  Item: typeof Item
}
