import { GuideLayout } from '@/layouts/GuideLayout'
import { useProduct } from '@/context/ProductContext'

import styles from './GuidePage.module.css'

export function GuidePage() {
  const { product } = useProduct()
  const isRn = product.id === 'mobile-rn'

  return (
    <GuideLayout>
      <section className={styles.hero}>
        <img
          className={styles.heroArt}
          src={`${import.meta.env.BASE_URL}brand/loading-hero.png`}
          alt="lyrixi"
        />
        <p className={styles.slogan}>你只要负责自律即可</p>
        <h1 className={styles.title}>{product.label}</h1>
        <p className={styles.tagline}>{product.tagline}</p>
        <div className={styles.actions}>
          <a className={styles.primary} href="#install">
            开始安装
          </a>
          <a
            className={styles.secondary}
            href={`${import.meta.env.BASE_URL}${product.routePrefix}/components/button`}
          >
            浏览组件
          </a>
        </div>
      </section>

      <section className="page-section" id="install">
        <h2>环境安装</h2>
        {isRn ? (
          <>
            <p>
              <code>lyrixi-mobile-rn</code> 目前以源码包形式提供（仓库内 <code>private: true</code>
              ），推荐本地联调：
            </p>
            <pre>
              <code>{`npm install file:../lyrixi-mobile-rn`}</code>
            </pre>
            <p>宿主需提供 React Native ≥ 0.74，以及 Navigation / Screens 等 peer 依赖。</p>
            <h2>桥接能力</h2>
            <p>
              RN 侧核心能力是 <code>BridgeWebView</code> + 可注入的 <code>lyrixi</code> JSSDK，用于
              Hybrid H5 与原生通信。详见仓库 README。
            </p>
          </>
        ) : (
          <>
            <p>使用 npm 安装（需 React / React DOM）：</p>
            <pre>
              <code>{`npm install lyrixi-mobile`}</code>
            </pre>
            <h2>样式</h2>
            <pre>
              <code>{`@import 'lyrixi-mobile/assets/index.less';`}</code>
            </pre>
            <h2>快速上手</h2>
            <pre>
              <code>{`import { Button } from 'lyrixi-mobile'

export default () => <Button className="primary">PRESS ME</Button>`}</code>
            </pre>
          </>
        )}
      </section>
    </GuideLayout>
  )
}
