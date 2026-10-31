import Aside from '../Aside'
import Footer from '../Footer'
import Header from '../Header'
import Main from '../Main'
import Page from '../Page'

export type PageComponents = typeof Page & {
  Header: typeof Header
  Aside: typeof Aside
  Main: typeof Main
  Footer: typeof Footer
}
