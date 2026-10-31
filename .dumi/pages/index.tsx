import { Link } from 'dumi'

import './index.less'

export default function HomePage() {
  return (
    <div className="lyrixi-home">
      <section className="lyrixi-home__hero">
        <img
          className="lyrixi-home__hero-art"
          src="/lyrixi/brand/logo-loading.png"
          alt="Lyrixi"
        />
        <p className="lyrixi-home__slogan">更懂你的前端专家</p>
        <h1 className="lyrixi-home__title">lyrixi-mobile</h1>
        <p className="lyrixi-home__tagline">React 19 移动端 UI 组件库</p>
        <div className="lyrixi-home__actions">
          <a className="lyrixi-home__btn lyrixi-home__btn--primary" href="#install">
            开始安装
          </a>
          <Link className="lyrixi-home__btn lyrixi-home__btn--secondary" to="/components/button">
            浏览组件
          </Link>
        </div>
      </section>

      <section className="lyrixi-home__section" id="install">
        <h2>AI文档初始化</h2>
        <pre>
          <code>{`npx lyrixi-mobile`}</code>
        </pre>
        <h2>环境安装</h2>
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
      </section>
    </div>
  )
}
