import React from 'react'

function GrassBlurCard({ className = '', children }) {
  return (
    <div className={`grass-blur-card ${className}`}>
      <div className="grass-blur-inner p-6">
        {children}
      </div>
    </div>
  )
}

export default GrassBlurCard


