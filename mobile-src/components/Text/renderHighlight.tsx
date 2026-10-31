import React from 'react'

/**
 * 将文本中的关键词高亮显示
 * @param {ReactNode} children - 文本内容
 * @param highlight - 要高亮的关键词，支持多个（按长词优先避免短词抢占匹配）
 * @returns {ReactNode} 处理后的节点
 */
function renderHighlight(children: React.ReactNode, highlight: string | string[]): React.ReactNode {
  if (!highlight || typeof children !== 'string') {
    return children
  }

  const text = children
  const keywords = (Array.isArray(highlight) ? highlight : [highlight])
    .map((k) => String(k).trim())
    .filter(Boolean)

  if (keywords.length === 0) {
    return text
  }

  const keywordSet = new Set(keywords)
  const escaped = keywords
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length)

  const regex = new RegExp(`(${escaped.join('|')})`, 'g')
  const parts = text.split(regex)

  if (parts.length === 1) {
    return text
  }

  return parts.map((part, index) => {
    if (keywordSet.has(part)) {
      return (
        <span key={`highlight-${index}`} className="lyrixi-text-highlight">
          {part}
        </span>
      )
    }
    return <React.Fragment key={`text-${index}`}>{part}</React.Fragment>
  })
}

export default renderHighlight
