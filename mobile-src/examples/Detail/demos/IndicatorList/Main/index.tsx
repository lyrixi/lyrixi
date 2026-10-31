import React, { type CSSProperties } from 'react'

import { Card, Flex, LocaleUtil } from 'lyrixi-mobile'

import type { MetricItem, MainProps } from './types'

const locale = LocaleUtil.locale

const styles: Record<string, CSSProperties> = {
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },
  label: {
    margin: 5,
    fontSize: 12,
    color: '#999'
  },
  value: {
    marginTop: 2,
    fontSize: 22,
    color: '#333',
    fontWeight: 500
  }
}

function MetricCard({ item }: { item: MetricItem }) {
  return (
    <Card>
      <Card.Header>{item.title}</Card.Header>
      <Card.Main>
        <Flex>
          <div style={styles.column}>
            <div style={styles.label}>{locale('目标')}</div>
            <div style={styles.value}>{item.target}</div>
          </div>
          <div style={styles.column}>
            <div style={styles.label}>{locale('完成')}</div>
            <div style={styles.value}>{item.complete}</div>
          </div>
          <div style={styles.column}>
            <div style={styles.label}>{locale('完成率')}</div>
            <div style={styles.value}>{item.rate}%</div>
          </div>
        </Flex>
      </Card.Main>
    </Card>
  )
}

// 内容区：主指标 + 指标卡片列表（仅展示）
const Main = ({ data }: MainProps) => {
  return (
    <>
      {data.mainTarget && <MetricCard item={data.mainTarget} />}

      {data.subTargets.map((item) => (
        <MetricCard key={item.id} item={item} />
      ))}
    </>
  )
}

export default Main
