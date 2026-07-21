import { GuideLayout } from '@/layouts/GuideLayout'
import { getProductCatalog } from '@/config/catalog'
import { useProduct } from '@/context/ProductContext'

export function AiPage() {
  const { product, productId } = useProduct()
  const skills = getProductCatalog(productId).skills
  const cli =
    productId === 'mobile' ? 'npx lyrixi-mobile-ai' : 'npx lyrixi-mobile-rn-ai'

  return (
    <GuideLayout>
      <section className="page-section">
        <h1>AI 协作</h1>
        <p>
          {product.label} 附带 <code>.ai</code> 目录，把组件约定、规则与示例同步到 Cursor / Claude，
          让助手按库的真实 API 写代码。
        </p>

        <h2>快速接入</h2>
        <p>业务项目安装包后执行：</p>
        <pre>
          <code>{cli}</code>
        </pre>
        <p>
          库仓库内也可运行 <code>npm run create-ai</code>，逻辑相同：同步 <code>.ai</code> 并创建{' '}
          <code>.cursor</code> / <code>.claude</code> 软链。
        </p>

        <h2>目录说明</h2>
        <div className="card-grid">
          {[
            { title: 'rules/', desc: '编码与组件约定，供 IDE 规则引擎加载' },
            { title: 'docs/', desc: '面向 AI 的组件/工具摘要（props、示例索引）' },
            { title: 'commands/', desc: 'Claude commands' },
            { title: 'decisions/', desc: '架构决策记录' },
            { title: 'memory/', desc: '可沉淀的项目记忆' },
            { title: 'archive/', desc: '归档内容' },
          ].map((item) => (
            <div className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Skills</h2>
        {skills.length === 0 ? (
          <p>
            当前产品暂无 <code>skills/</code>
            {productId === 'mobile-rn' ? '（RN 侧结构更精简，后续可对齐 H5）' : ''}。
          </p>
        ) : (
          <div className="card-grid">
            {skills.map((skill) => (
              <div className="card" key={skill.id}>
                <h3>{skill.id}</h3>
                <p>{skill.summary || '可在 .ai/skills 中查看完整说明'}</p>
              </div>
            ))}
          </div>
        )}

        <h2>升级注意</h2>
        <p>
          升级 {product.packageName} 后请重新执行 CLI，以刷新库内文档与规则；你的自定义 skills/rules
          会保留，同名库技能会被覆盖更新。
        </p>
      </section>
    </GuideLayout>
  )
}
