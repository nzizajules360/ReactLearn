import React from 'react'
import { useAuth } from '../../context/AuthContext'

function MessageBubble({ msg }) {
  const { user } = useAuth()
  const isMe = Number(user?.id) === Number(msg.user_id)

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] md:max-w-[70%] ${isMe ? 'text-right' : 'text-left'}`}>
        <div className={`text-xs mb-1 ${isMe ? 'text-emerald-600' : 'text-emerald-700'}`}>{isMe ? 'You' : msg.user_name}</div>
        <div className={`grass-blur-card ${isMe ? 'bg-white/70' : ''}`}>
          <div className="grass-blur-inner px-4 py-2">
            {msg.type === 'text' && (
              <div className="text-emerald-900 whitespace-pre-wrap break-words leading-relaxed">{msg.body}</div>
            )}
            {msg.type === 'image' && msg.attachment_url && (
              <img src={`http://localhost:3001${msg.attachment_url}`} alt="attachment" className="rounded-lg max-h-72" />
            )}
            {msg.type === 'video' && msg.attachment_url && (
              <video controls className="rounded-lg max-h-72"><source src={`http://localhost:3001${msg.attachment_url}`} /></video>
            )}
            {msg.type === 'file' && msg.attachment_url && (
              <div className="space-y-2">
                {String(msg.attachment_url).toLowerCase().endsWith('.pdf') ? (
                  <iframe src={`http://localhost:3001${msg.attachment_url}`} className="w-full h-72 rounded-lg bg-white" />
                ) : (
                  <a className="text-emerald-700 underline" href={`http://localhost:3001${msg.attachment_url}`} target="_blank">Download file</a>
                )}
              </div>
            )}
            {msg.type === 'audio' && msg.attachment_url && (
              <audio controls className="w-full"><source src={`http://localhost:3001${msg.attachment_url}`} /></audio>
            )}
          </div>
        </div>
        <div className="text-[10px] text-emerald-500 mt-1">{new Date(msg.created_at).toLocaleTimeString()}</div>
      </div>
    </div>
  )
}

export default MessageBubble


