import React from 'react'

export const Highlight = ({
  children,
  color,
  onClick,
}: {
  children: React.ReactNode
  color: string
  onClick?(): void
}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '10px',
      color: '#fff',
      padding: '10px 20px',
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    {children}
  </span>
)
