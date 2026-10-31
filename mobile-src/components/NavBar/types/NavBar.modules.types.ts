import Button from '../Button'
import NavBar from '../NavBar'
import Title from '../Title'

export type NavBarComponents = typeof NavBar & {
  Title: typeof Title
  Button: typeof Button
}
