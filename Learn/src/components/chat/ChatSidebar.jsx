import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function ChatSidebar() {
  const [chats, setChats] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const location = useLocation()

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('ecoswarm_token')
        const res = await fetch('http://localhost:3001/api/chat', { headers: { Authorization: `Bearer ${token}` } })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.message || 'Failed to load chats')
        setChats(Array.isArray(data) ? data : [])
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [location.pathname])

  const filtered = chats.filter(c => (c.title || c.participants || '').toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-3 border-b border-emerald-200">
        <div className="flex gap-2">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search" className="flex-1 border border-emerald-200 rounded-xl px-3 py-2 bg-white text-emerald-900" />
          <Link to="/chat/new" className="px-3 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700">New</Link>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {loading && <div className="p-3 text-emerald-700">Loading...</div>}
        {error && <div className="p-3 text-red-600">{error}</div>}
        {!loading && !error && filtered.map(c => (
          <Link key={c.id} to={`/chat/${c.id}`} className="block p-3 border-b border-emerald-100 hover:bg-emerald-50">
            <div className="font-semibold text-emerald-900 truncate">{c.title || c.participants}</div>
            <div className="text-emerald-700 text-xs">{c.is_group ? 'Group' : 'Direct'}</div>
          </Link>
        ))}
        {!loading && !error && filtered.length === 0 && (
          <div className="p-3 text-emerald-700">No chats</div>
        )}
      </div>
    </div>
  )
}

export default ChatSidebar


