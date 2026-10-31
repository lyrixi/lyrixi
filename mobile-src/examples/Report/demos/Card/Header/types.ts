export type CardItem = { id?: string; name?: string; [key: string]: unknown }

export type CardHeaderProps = {
  title: string
  tabs: CardItem[] | null
  tab: CardItem | null
  slides: CardItem[] | null
  slide: CardItem | null
  onTabChange: (tabs: CardItem[]) => void
  onSlideChange: (slide: CardItem) => void
}
