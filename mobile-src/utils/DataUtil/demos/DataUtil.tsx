import React from 'react'
import { Card, DataUtil, Divider, Page } from 'lyrixi-mobile'

export default function DataUtilDemo() {
  const pickByObj = { a: 1, b: 2, c: 3, d: 4 }
  const pickByResult = DataUtil.pickBy(pickByObj, (v) => v > 2)

  const cloneSrc = { a: 1, b: { c: 2 } }
  const cloneResult = DataUtil.cloneDeep(cloneSrc)
  const cloneRef = cloneResult !== cloneSrc && cloneResult.b !== cloneSrc.b

  const desensitizeResult = DataUtil.desensitize('13812345678', {
    start: 3,
    end: 7
  })

  return (
    <Page>
      <Page.Main>
        <Card>
          <Divider>pickBy(object, predicate)</Divider>
          <div style={{ margin: '0 12px' }}>
            从对象中挑选 predicate(value, key) 为真的属性。例：从 {'{ a:1, b:2, c:3, d:4 }'}{' '}
            中挑出值 &gt; 2。
          </div>
          <div style={{ margin: '4px 12px' }}>
            DataUtil.pickBy(..., v =&gt; v &gt; 2) → {JSON.stringify(pickByResult)}
          </div>
        </Card>

        <Card>
          <Divider>cloneDeep(value)</Divider>
          <div style={{ margin: '0 12px' }}>深拷贝对象或数组，新对象与原始无引用关系。</div>
          <div style={{ margin: '4px 12px' }}>
            cloneResult !== cloneSrc && cloneResult.b !== cloneSrc.b → {String(cloneRef)}
          </div>
          <div style={{ margin: '4px 12px' }}>
            DataUtil.cloneDeep({'{ a:1, b:{ c:2 } }'}) → {JSON.stringify(cloneResult)}
          </div>
        </Card>

        <Card>
          <Divider>desensitize(value, params)</Divider>
          <div style={{ margin: '0 12px' }}>
            按 [start, end) 将字符串替换为 *。例：手机号保留前 3 位与后 4 位。
          </div>
          <div style={{ margin: '4px 12px' }}>
            {`DataUtil.desensitize('13812345678', { start: 3, end: 7 }) → ${desensitizeResult}`}
          </div>
        </Card>
      </Page.Main>
    </Page>
  )
}
