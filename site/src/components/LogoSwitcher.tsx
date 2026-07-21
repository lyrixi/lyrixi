import { useEffect, useRef, useState } from 'react'

import { PRODUCTS, type ProductId } from '@/config/products'
import { useProduct } from '@/context/ProductContext'

import styles from './LogoSwitcher.module.css'

/**
 * Brand mark + product name. Hover (desktop) / tap (mobile) to switch libraries.
 * Disabled products stay visible as a reserved hook (e.g. RN before npm publish).
 */
export function LogoSwitcher() {
  const { productId, product, switchProduct } = useProduct()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  return (
    <div
      ref={rootRef}
      className={styles.root}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
      >
        <img className={styles.mark} src={`${import.meta.env.BASE_URL}brand/logo-mark.png`} alt="" />
        <span className={styles.label}>{product.label}</span>
        <span className={styles.caret} aria-hidden>
          ▾
        </span>
      </button>

      {open ? (
        <ul className={styles.menu} role="listbox">
          {PRODUCTS.map((item) => {
            const disabled = !item.enabled
            return (
              <li key={item.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={item.id === productId}
                  aria-disabled={disabled}
                  disabled={disabled}
                  className={
                    item.id === productId
                      ? styles.optionActive
                      : disabled
                        ? styles.optionDisabled
                        : styles.option
                  }
                  onClick={() => {
                    if (disabled) return
                    switchProduct(item.id as ProductId)
                    setOpen(false)
                  }}
                >
                  <span>{item.label}</span>
                  {disabled ? <span className={styles.badge}>即将发布</span> : null}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
