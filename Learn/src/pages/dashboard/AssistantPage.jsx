import React, { useState } from 'react'

function AssistantPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I can help manage your sustainability activities. What would you like to do today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return
    const next = [...messages, { role: 'user', content: input }]
    setMessages(next)
    setInput('')
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('ecoswarm_token')
      const res = await fetch('http://localhost:3001/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ messages: next })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'AI error')
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-200">
        <h1 className="text-2xl font-bold text-emerald-900">AI Assistant</h1>
        <p className="text-emerald-700">Powered by Gemini</p>
      </div>
      <div className="bg-white rounded-2xl shadow-lg border border-emerald-200 h-[60vh] flex flex-col">
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {messages.map((m, idx) => (
            <div key={idx} className={`p-3 rounded-xl border ${m.role === 'assistant' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-lime-50 border-lime-200 text-emerald-900'} max-w-[85%] ${m.role === 'assistant' ? '' : 'ml-auto'}`}>
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
          ))}
          {loading && <div className="text-emerald-700 text-sm">Thinking...</div>}
          {error && <div className="text-red-700 text-sm">{error}</div>}
        </div>
        <form onSubmit={sendMessage} className="p-4 border-t border-emerald-200 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the assistant to plan activities, suggest goals, summarize metrics..."
            className="flex-1 px-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-lime-500 focus:outline-none"
          />
          <button type="submit" className="px-5 py-3 rounded-xl text-white bg-gradient-to-r from-lime-500 to-emerald-600 disabled:opacity-50" disabled={loading || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default AssistantPage


