import React, { useEffect, useState } from 'react'
import GrassBlurCard from '../../components/GrassBlurCard'

function ContactsPage() {
  const [messages, setMessages] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('ecoswarm_token')
        const res = await fetch('http://localhost:3001/api/admin/contact-messages', { headers: { Authorization: `Bearer ${token}` } })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.message || 'Failed to load messages')
        setMessages(Array.isArray(data) ? data : [])
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
        <h2 className="text-xl font-bold text-emerald-900 mb-4">Contact Messages</h2>
        {loading && <div className="text-emerald-700">Loading...</div>}
        {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl">{error}</div>}
        {!loading && !error && (
          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="text-emerald-700">No messages</div>
            ) : messages.map(m => (
              <div key={m.id} className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-emerald-900 font-semibold">{m.subject}</div>
                  <div className="text-emerald-600 text-sm">{new Date(m.created_at).toLocaleString()}</div>
                </div>
                <div className="text-emerald-700 text-sm mb-2">From: {m.name} &lt;{m.email}&gt;</div>
                <div className="text-emerald-900 whitespace-pre-wrap">{m.message}</div>
              </div>
            ))}
          </div>
        )}
      </GrassBlurCard>
    </div>
  )
}

export default ContactsPage


