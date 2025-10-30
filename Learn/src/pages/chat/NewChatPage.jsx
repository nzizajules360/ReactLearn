import React, { useEffect, useState } from 'react'
import GrassBlurCard from '../../components/GrassBlurCard'
import { useNavigate } from 'react-router-dom'

function NewChatPage() {
  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState([])
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('ecoswarm_token')
        const res = await fetch('http://localhost:3001/api/users', { headers: { Authorization: `Bearer ${token}` } })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.message || 'Failed to fetch users')
        setUsers(Array.isArray(data) ? data : [])
      } catch (e) {
        setError(e.message)
      }
    }
    load()
  }, [])

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const createChat = async () => {
    try {
      const token = localStorage.getItem('ecoswarm_token')
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ participantIds: selected, title: title || null })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Failed to create chat')
      navigate(`/chat/${data.id}`)
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="space-y-6">
      <GrassBlurCard>
        <h2 className="text-xl font-bold text-emerald-900 mb-4">New Conversation</h2>
        {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-2">{error}</div>}
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Group title (optional)" className="w-full border border-emerald-200 rounded-xl px-3 py-2 mb-3 bg-white text-emerald-900" />
        <div className="max-h-64 overflow-auto border border-emerald-200 rounded-xl">
          {users.map(u => (
            <label key={u.id} className="flex items-center gap-3 p-3 border-b border-emerald-100">
              <input type="checkbox" checked={selected.includes(u.id)} onChange={() => toggle(u.id)} />
              <div className="text-emerald-900">{u.name} <span className="text-emerald-700 text-sm">({u.email})</span></div>
            </label>
          ))}
        </div>
        <div className="mt-3 flex justify-end">
          <button onClick={createChat} className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700">Create</button>
        </div>
      </GrassBlurCard>
    </div>
  )
}

export default NewChatPage


