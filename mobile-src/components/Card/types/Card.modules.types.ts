import Card from '../Card'
import Header from '../Header'
import Main from '../Main'

export type CardComponents = typeof Card & { Header: typeof Header; Main: typeof Main }
