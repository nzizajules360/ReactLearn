import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GrassBlurCard from '../../components/GrassBlurCard'

function ChatListPage() {
  const [chats, setChats] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

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
  }, [])

  return (
    <div className="space-y-6">
      <GrassBlurCard>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-emerald-900">Chats</h2>
          <Link to="/chat/new" className="px-3 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700">New</Link>
        </div>
        {loading && <div className="text-emerald-700">Loading...</div>}
        {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl">{error}</div>}
        {!loading && !error && (
          <div className="space-y-2">
            {chats.length === 0 ? (
              <div className="text-emerald-700">No conversations yet.</div>
            ) : chats.map(c => (
              <Link key={c.id} to={`/chat/${c.id}`} className="block p-4 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100">
                <div className="font-semibold text-emerald-900">{c.title || c.participants}</div>
                <div className="text-emerald-700 text-sm">{c.is_group ? 'Group' : 'Direct'}</div>
              </Link>
            ))}
          </div>
        )}
      </GrassBlurCard>
    </div>
  )
}

export default ChatListPage


