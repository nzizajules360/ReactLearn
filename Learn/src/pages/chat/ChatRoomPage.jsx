import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import GrassBlurCard from '../../components/GrassBlurCard'
import MessageBubble from '../../components/chat/MessageBubble'
import Composer from '../../components/chat/Composer'

function ChatRoomPage() {
  const { chatId } = useParams()
  const [messages, setMessages] = useState([])
  const [chatInfo, setChatInfo] = useState(null)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const fileRef = useRef(null)
  const listRef = useRef(null)
  const pcRef = useRef(null)
  const localStreamRef = useRef(null)
  const remoteRef = useRef(null)
  const localRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('ecoswarm_token')
    // load chat meta
    fetch('http://localhost:3001/api/chat', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(list => setChatInfo((Array.isArray(list) ? list : []).find(c => Number(c.id) === Number(chatId)) || null).catch(() => {}))
    fetch(`http://localhost:3001/api/chat/${chatId}/messages?limit=200`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setMessages(Array.isArray(d) ? d.reverse() : [])).catch(() => {})

    const es = new EventSource(`http://localhost:3001/api/chat/stream?token=${encodeURIComponent(token)}`)
    es.onmessage = (evt) => {
      try {
        const payload = JSON.parse(evt.data)
        if (payload?.chat_id == chatId && payload?.message) {
          setMessages(prev => [...prev, payload.message])
        } else if (payload?.chat_id == chatId && payload?.type === 'webrtc') {
          handleSignal(payload)
        }
      } catch {}
    }
    return () => es.close()
  }, [chatId])

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const createPeer = async (withVideo = false) => {
    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] })
    pc.onicecandidate = (e) => {
      if (e.candidate) sendSignal({ type: 'candidate', candidate: e.candidate })
    }
    pc.ontrack = (e) => {
      if (remoteRef.current) remoteRef.current.srcObject = e.streams[0]
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: withVideo })
    stream.getTracks().forEach(t => pc.addTrack(t, stream))
    if (localRef.current) localRef.current.srcObject = stream
    localStreamRef.current = stream
    pcRef.current = pc
    return pc
  }

  const sendSignal = async (signal) => {
    const token = localStorage.getItem('ecoswarm_token')
    await fetch(`http://localhost:3001/api/chat/${chatId}/signal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(signal)
    })
  }

  const handleSignal = async (payload) => {
    const signal = payload.signal || {}
    if (signal.type === 'offer') {
      const pc = pcRef.current || await createPeer(signal.kind === 'video')
      await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp))
      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)
      await sendSignal({ type: 'answer', sdp: answer })
    } else if (signal.type === 'answer') {
      if (pcRef.current) await pcRef.current.setRemoteDescription(new RTCSessionDescription(signal.sdp))
    } else if (signal.type === 'candidate') {
      if (pcRef.current) await pcRef.current.addIceCandidate(new RTCIceCandidate(signal.candidate))
    }
  }

  const startCall = async (withVideo) => {
    const pc = await createPeer(withVideo)
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    await sendSignal({ type: 'offer', kind: withVideo ? 'video' : 'audio', sdp: offer })
  }

  const endCall = () => {
    pcRef.current?.close()
    pcRef.current = null
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(t => t.stop())
      localStreamRef.current = null
    }
    if (localRef.current) localRef.current.srcObject = null
    if (remoteRef.current) remoteRef.current.srcObject = null
  }

  const send = async (type = 'text', attachment, bodyOverride = '') => {
    try {
      setSending(true)
      const token = localStorage.getItem('ecoswarm_token')
      const form = new FormData()
      form.append('type', type)
      if (type === 'text') form.append('body', bodyOverride)
      if (attachment) form.append('attachment', attachment)
      const res = await fetch(`http://localhost:3001/api/chat/${chatId}/messages`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Failed to send')
      setMessages(prev => [...prev, data])
      if (fileRef.current) fileRef.current.value = ''
    } catch (e) {
      setError(e.message)
    } finally {
      setSending(false)
    }
  }

  const onFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const type = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'file'
    send(type, file)
  }

  return (
    <div className="space-y-4">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl">{error}</div>}
      <div className="flex items-center justify-between">
        <div className="text-emerald-900 font-bold">{chatInfo?.title || chatInfo?.participants || 'Chat'}</div>
        <div className="flex items-center gap-2">
          <button onClick={() => startCall(false)} className="px-3 py-1 border border-emerald-300 rounded-xl text-emerald-900">Audio Call</button>
          <button onClick={() => startCall(true)} className="px-3 py-1 border border-emerald-300 rounded-xl text-emerald-900">Video Call</button>
          <button onClick={endCall} className="px-3 py-1 border border-emerald-300 rounded-xl text-emerald-900">End</button>
        </div>
      </div>
      <GrassBlurCard>
        <div ref={listRef} className="h-[58vh] overflow-auto space-y-3 px-1">
          {messages.map(m => (
            <MessageBubble key={m.id} msg={m} />
          ))}
        </div>
        <div className="mt-3">
          <Composer onSend={async ({ type, text, file }) => {
            if (type === 'text') {
              await send('text', null, text)
            } else {
              await send(type, file)
            }
          }} />
        </div>
      </GrassBlurCard>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-emerald-700 text-sm mb-1">Local</div>
          <video ref={localRef} autoPlay muted playsInline className="w-full rounded-xl bg-black/20" />
        </div>
        <div>
          <div className="text-emerald-700 text-sm mb-1">Remote</div>
          <video ref={remoteRef} autoPlay playsInline className="w-full rounded-xl bg-black/20" />
        </div>
      </div>
    </div>
  )
}

export default ChatRoomPage


