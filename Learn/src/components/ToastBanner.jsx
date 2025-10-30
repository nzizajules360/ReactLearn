import React, { useEffect, useState } from 'react'

function ToastBanner() {
  const [queue, setQueue] = useState([])
  const [visible, setVisible] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      const detail = e.detail || {}
      setQueue(prev => [...prev, { id: Date.now(), ...detail }])
    }
    window.addEventListener('app:toast', handler)
    return () => window.removeEventListener('app:toast', handler)
  }, [])

  useEffect(() => {
    if (visible || queue.length === 0) return
    const next = queue[0]
    setVisible(next)
    setQueue(q => q.slice(1))
    const t = setTimeout(() => setVisible(null), 4000)
    return () => clearTimeout(t)
  }, [queue, visible])

  if (!visible) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-md">
      <div className="grass-blur-card">
        <div className="grass-blur-inner px-4 py-3 flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-400 flex items-center justify-center text-white font-bold">✓</div>
          <div className="flex-1">
            <div className="text-emerald-900 font-semibold leading-tight">{visible.title || 'Notification'}</div>
            <div className="text-emerald-700 text-sm">{visible.body || ''}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function showToast({ title, body }) {
  window.dispatchEvent(new CustomEvent('app:toast', { detail: { title, body } }))
}

export default ToastBanner


