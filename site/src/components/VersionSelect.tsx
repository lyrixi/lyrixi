import { useState } from 'react'

import { VERSIONS } from '@/config/versions'
import { useProduct } from '@/context/ProductContext'

import styles from './VersionSelect.module.css'

/** Pill-shaped version switcher in the header. */
export function VersionSelect() {
  const { productId } = useProduct()
  const options = VERSIONS[productId]
  const current = options.find((item) => item.current) ?? options[0]
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        {current.label}
      </button>
      {open ? (
        <ul className={styles.menu}>
          {options.map((item) => (
            <li key={item.label}>
              <a
                className={styles.option}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
