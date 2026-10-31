import _Page from './Page'
import Aside from './Aside'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'

import type { PageComponents } from './types/Page.modules.types'

const Page = _Page as PageComponents

Page.Header = Header
Page.Aside = Aside
Page.Main = Main
Page.Footer = Footer

export default Page
