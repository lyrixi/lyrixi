import React from 'react'

// 展开和收缩图标
const Toggle = ({ id, onClick }: { id?: string; onClick?: (e: React.MouseEvent) => void }) => {
  return (
    <div
      id={id ? `${id}-toggle` : undefined}
      className="lyrixi-calendar-toggle-button"
      onClick={onClick}
    >
      <svg width="300px" height="78px" viewBox="0 0 300 78" className="lyrixi-calendar-toggle-svg">
        <path d="M31.5,17L150,61l118.5,-44" />
      </svg>
    </div>
  )
}

export default Toggle
