import styles from './PhoneFrame.module.css'

interface PhoneFrameProps {
  /** Absolute or site-relative preview URL loaded in the iframe. */
  src: string
  title?: string
}

/** Mobile device chrome around the live demo iframe. */
export function PhoneFrame({ src, title = 'Preview' }: PhoneFrameProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.device}>
        <div className={styles.notch} aria-hidden />
        <iframe key={src} className={styles.frame} title={title} src={src} />
      </div>
    </div>
  )
}
