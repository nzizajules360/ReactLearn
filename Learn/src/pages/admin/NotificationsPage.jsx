import React, { useState } from 'react'
import GrassBlurCard from '../../components/GrassBlurCard'
import ToastBanner, { showToast } from '../../components/ToastBanner'

function NotificationsPage() {
  const [title, setTitle] = useState('Announcement')
  const [body, setBody] = useState('Welcome to EcoSwarm!')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState('')

  const send = async () => {
    try {
      setSending(true)
      setResult('')
      const token = localStorage.getItem('ecoswarm_token')
      const res = await fetch('http://localhost:3001/api/admin/notifications/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, body })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Failed to send notification')
      setResult(`Sent to ${data.recipients} users`)
      showToast({ title, body })
    } catch (e) {
      setResult(e.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-6">
      <ToastBanner />
      <GrassBlurCard>
        <h2 className="text-xl font-bold text-emerald-900 mb-4">Broadcast Notification</h2>
        <div className="grid gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border border-emerald-200 rounded-xl px-4 py-2 text-emerald-900 bg-white"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Message"
            rows={4}
            className="border border-emerald-200 rounded-xl px-4 py-2 text-emerald-900 bg-white"
          />
          <div className="flex gap-3 items-center">
            <button onClick={send} disabled={sending} className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700">{sending ? 'Sending...' : 'Send to All Users'}</button>
            {result && <div className="text-emerald-700 text-sm">{result}</div>}
          </div>
        </div>
      </GrassBlurCard>

      <GrassBlurCard>
        <h3 className="text-lg font-semibold text-emerald-900 mb-3">Preview (iPhone-style banner)</h3>
        <div className="bg-emerald-50 rounded-2xl p-4">
          <div className="max-w-md mx-auto">
            <div className="grass-blur-card">
              <div className="grass-blur-inner px-4 py-3 flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-400 flex items-center justify-center text-white font-bold">✓</div>
                <div className="flex-1">
                  <div className="text-emerald-900 font-semibold leading-tight">{title || 'Notification'}</div>
                  <div className="text-emerald-700 text-sm">{body || 'Message'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GrassBlurCard>
    </div>
  )
}

export default NotificationsPage


