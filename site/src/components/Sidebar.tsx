import { NavLink } from 'react-router-dom'

import { groupComponents, getProductCatalog } from '@/config/catalog'
import type { ProductId } from '@/config/products'
import { useProduct } from '@/context/ProductContext'

import styles from './Sidebar.module.css'

type SidebarMode = 'components' | 'tools' | 'templates'

interface SidebarProps {
  mode: SidebarMode
}

export function Sidebar({ mode }: SidebarProps) {
  const { productId, product } = useProduct()
  const prefix = `/${product.routePrefix}`

  if (mode === 'components') {
    const groups = groupComponents(productId)
    return (
      <aside className={styles.aside}>
        {groups.map((group) => (
          <div key={group.group} className={styles.group}>
            <div className={styles.groupTitle}>{group.group}</div>
            <ul className={styles.list}>
              {group.items.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={`${prefix}/components/${item.slug}`}
                    className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
    )
  }

  const items =
    mode === 'tools'
      ? getProductCatalog(productId as ProductId).utils
      : getProductCatalog(productId as ProductId).examples
  const section = mode === 'tools' ? 'tools' : 'templates'

  return (
    <aside className={styles.aside}>
      <div className={styles.group}>
        <div className={styles.groupTitle}>{mode === 'tools' ? '工具' : '模板'}</div>
        <ul className={styles.list}>
          {items.length === 0 ? (
            <li className={styles.empty}>暂无条目</li>
          ) : (
            items.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={`${prefix}/${section}/${item.slug}`}
                  className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}
                >
                  {item.title}
                </NavLink>
              </li>
            ))
          )}
        </ul>
      </div>
    </aside>
  )
}
