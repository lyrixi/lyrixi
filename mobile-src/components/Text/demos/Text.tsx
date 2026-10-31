import React from 'react'
import { Page, Text, Card } from 'lyrixi-mobile'

export default function TextDemo() {
  const longText =
    '这是一段很长的文本内容，用来演示省略功能。这是一段很长的文本内容，用来演示省略功能。这是一段很长的文本内容，用来演示省略功能。这是一段很长的文本内容，用来演示省略功能。这是一段很长的文本内容，用来演示省略功能。这是一段很长的文本内容，用来演示省略功能。'

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>基础用法</Card.Header>
          <Card.Main>
            <Text>普通文本内容</Text>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>颜色 (color)</Card.Header>
          <Card.Main>
            <Text color="primary">primary 颜色</Text>
            <Text color="success">success 颜色</Text>
            <Text color="warning">warning 颜色</Text>
            <Text color="danger">danger 颜色</Text>
            <Text color="info">info 颜色</Text>
            <Text color="secondary">secondary 颜色</Text>
            <Text color="tertiary">tertiary 颜色</Text>
            <Text color="#ff6600">自定义颜色 #ff6600</Text>
            <Text color="rgb(0, 123, 255)">自定义颜色 rgb(0, 123, 255)</Text>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>字体大小 (fontSize)</Card.Header>
          <Card.Main>
            <Text fontSize="xs">xs 字体大小</Text>
            <Text fontSize="s">s 字体大小</Text>
            <Text fontSize="m">m 字体大小</Text>
            <Text fontSize="l">l 字体大小</Text>
            <Text fontSize="xl">xl 字体大小</Text>
            <Text fontSize="xxl">xxl 字体大小</Text>
            <Text fontSize={20}>自定义字体大小 20px</Text>
            <Text fontSize="1.2rem">自定义字体大小 1.2rem</Text>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>字体粗细 (fontWeight)</Card.Header>
          <Card.Main>
            <Text fontWeight="s">s 字体粗细</Text>
            <Text fontWeight="m">m 字体粗细</Text>
            <Text fontWeight="l">l 字体粗细</Text>
            <Text fontWeight={300}>自定义字体粗细 300</Text>
            <Text fontWeight={500}>自定义字体粗细 500</Text>
            <Text fontWeight={700}>自定义字体粗细 700</Text>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>高亮文本 (highlight)</Card.Header>
          <Card.Main>
            <Text highlight="高亮">这是一段包含高亮关键词的文本内容</Text>
            <Text highlight={['高亮', '关键词']}>
              这是一段包含多个高亮关键词的文本内容，可以同时高亮多个关键词
            </Text>
            <Text highlight="Text">This is a text with highlight keyword Text</Text>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>省略 (ellipsis) - 单行省略</Card.Header>
          <Card.Main>
            <Text ellipsis={{ rows: 1 }}>{longText}</Text>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>省略 (ellipsis) - 多行省略</Card.Header>
          <Card.Main>
            <Text ellipsis={{ rows: 2 }}>{longText}</Text>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>省略 (ellipsis) - 可展开收起</Card.Header>
          <Card.Main>
            <Text style={{ lineHeight: '32px' }} ellipsis={{ rows: 2, expandable: true }}>
              {longText}
            </Text>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>省略 (ellipsis) - 默认展开</Card.Header>
          <Card.Main>
            <Text ellipsis={{ rows: 2, expandable: true, defaultExpanded: true }}>{longText}</Text>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>自定义样式 (style)</Card.Header>
          <Card.Main>
            <Text style={{ textDecoration: 'underline' }}>下划线文本</Text>
            <Text style={{ letterSpacing: '2px' }}>字间距文本</Text>
            <Text style={{ lineHeight: '2' }}>行高文本</Text>
            <Text style={{ textTransform: 'uppercase' }}>uppercase text</Text>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>自定义类名 (className)</Card.Header>
          <Card.Main>
            <Text className="custom-text-class">自定义类名的文本</Text>
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}
