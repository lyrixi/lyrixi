import { NavLink } from 'react-router-dom'

import { NAV_ITEMS } from '@/config/nav'
import { useProduct } from '@/context/ProductContext'

import { LogoSwitcher } from './LogoSwitcher'
import { VersionSelect } from './VersionSelect'
import styles from './SiteHeader.module.css'

export function SiteHeader() {
  const { product } = useProduct()
  const prefix = `/${product.routePrefix}`

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <LogoSwitcher />
      </div>

      <nav className={styles.nav} aria-label="主导航">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.key}
            to={`${prefix}/${item.path}`}
            className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.right}>
        <VersionSelect />
        <a
          className={styles.github}
          href="https://github.com/lyrixi"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          GitHub
        </a>
      </div>
    </header>
  )
}
