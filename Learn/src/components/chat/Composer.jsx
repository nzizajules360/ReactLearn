import React, { useEffect, useRef, useState } from 'react'

function Composer({ onSend }) {
  const [text, setText] = useState('')
  const [recording, setRecording] = useState(false)
  const [mediaError, setMediaError] = useState('')
  const fileRef = useRef(null)
  const dropRef = useRef(null)
  const mediaRef = useRef(null)
  const [preview, setPreview] = useState(null) // { url, type, name, text? }

  const submit = async () => {
    if (!text.trim()) return
    await onSend({ type: 'text', text })
    setText('')
  }

  const onFile = async (file) => {
    if (!file) return
    const type = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : file.type.startsWith('audio/') ? 'audio' : 'file'
    const url = URL.createObjectURL(file)
    const p = { url, type, name: file.name, file }
    if (file.type.startsWith('text/')) {
      try {
        const reader = new FileReader()
        reader.onload = () => setPreview({ ...p, text: String(reader.result).slice(0, 2000) })
        reader.readAsText(file)
        return
      } catch {}
    }
    setPreview(p)
  }

  const onInputFile = (e) => onFile(e.target.files?.[0])

  useEffect(() => {
    const el = dropRef.current
    if (!el) return
    const prevent = (e) => { e.preventDefault(); e.stopPropagation() }
    const onDrop = (e) => {
      prevent(e)
      const f = e.dataTransfer.files?.[0]
      if (f) onFile(f)
    }
    el.addEventListener('dragover', prevent)
    el.addEventListener('dragenter', prevent)
    el.addEventListener('drop', onDrop)
    return () => {
      el.removeEventListener('dragover', prevent)
      el.removeEventListener('dragenter', prevent)
      el.removeEventListener('drop', onDrop)
    }
  }, [])

  const toggleRecord = async () => {
    try {
      if (recording) {
        setRecording(false)
        mediaRef.current?.stop()
        return
      }
      setMediaError('')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const rec = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      const chunks = []
      rec.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data) }
      rec.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        const file = new File([blob], `voice_${Date.now()}.webm`, { type: 'audio/webm' })
        await onSend({ type: 'audio', file })
      }
      mediaRef.current = rec
      setRecording(true)
      rec.start()
    } catch (e) {
      setMediaError('Microphone unavailable')
    }
  }

  const addEmoji = (e) => setText((t) => t + e)

  return (
    <div ref={dropRef} className="space-y-2">
      {mediaError && <div className="text-red-600 text-sm">{mediaError}</div>}
      {preview && (
        <div className="grass-blur-card">
          <div className="grass-blur-inner p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-emerald-900 font-semibold truncate">{preview.name}</div>
              <div className="flex gap-2">
                <button onClick={() => { setPreview(null); if (fileRef.current) fileRef.current.value = '' }} className="px-2 py-1 border border-emerald-300 rounded-lg text-emerald-900">Remove</button>
                <button onClick={async () => { await onSend({ type: preview.type, file: preview.file }); setPreview(null); if (fileRef.current) fileRef.current.value = '' }} className="px-3 py-1 bg-emerald-600 text-white rounded-lg">Send</button>
              </div>
            </div>
            {preview.type === 'image' && <img src={preview.url} alt="preview" className="rounded-lg max-h-72" />}
            {preview.type === 'video' && <video controls className="rounded-lg max-h-72"><source src={preview.url} /></video>}
            {preview.type === 'audio' && <audio controls className="w-full"><source src={preview.url} /></audio>}
            {preview.type === 'file' && (
              <div className="text-emerald-700 text-sm">{preview.text ? <pre className="whitespace-pre-wrap">{preview.text}</pre> : 'Ready to send file.'}</div>
            )}
          </div>
        </div>
      )}
      <div className="flex items-end gap-2">
        <button type="button" onClick={() => addEmoji('🌱')} className="px-2 py-2 rounded-xl border border-emerald-300">🌱</button>
        <button type="button" onClick={() => addEmoji('😊')} className="px-2 py-2 rounded-xl border border-emerald-300">😊</button>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
          rows={1}
          className="flex-1 border border-emerald-200 rounded-xl px-3 py-2 bg-white text-emerald-900 resize-none"
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
        />
        <input ref={fileRef} type="file" onChange={onInputFile} className="hidden" id="attach-file" />
        <label htmlFor="attach-file" className="px-3 py-2 border border-emerald-300 rounded-xl text-emerald-900 cursor-pointer">Attach</label>
        <button onClick={submit} className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700">Send</button>
        <button onClick={toggleRecord} className={`px-3 py-2 rounded-xl border ${recording ? 'border-red-400 text-red-700' : 'border-emerald-300 text-emerald-900'}`}>{recording ? 'Stop' : 'Voice'}</button>
      </div>
      <div className="text-emerald-600 text-xs">Tip: Drag & drop files to send.</div>
    </div>
  )
}

export default Composer


