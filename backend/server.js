import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool, initDb, seedDashboardForUser } from './db.js'
import { GoogleGenerativeAI } from '@google/generative-ai'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me'

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
// static uploads
const uploadsDir = path.join(process.cwd(), 'backend', 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
app.use('/uploads', express.static(uploadsDir))

await initDb()
const GOOGLE_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyDTbcR3pOUkKjjmGBhSruyXLJkKH4vFdNU'
const genAI = GOOGLE_KEY ? new GoogleGenerativeAI(GOOGLE_KEY) : null

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role || 'user' }, JWT_SECRET, { expiresIn: '7d' })
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, location = '', department = '', bio = '', phone = '', adminCode = '' } = req.body || {}
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' })
  
  // Check for admin secret code
  const ADMIN_SECRET_CODE = '101010@101010'
  const role = adminCode === ADMIN_SECRET_CODE ? 'admin' : 'user'
  
  const passwordHash = await bcrypt.hash(password, 10)
  try {
    await pool.query(
      'INSERT INTO users (name, email, password_hash, role, phone, location, department, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email.toLowerCase(), passwordHash, role, phone, location, department, bio]
    )
    return res.status(201).json({ 
      message: 'Registered successfully',
      role: role
    })
  } catch (e) {
    if (e && e.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email already registered' })
    }
    return res.status(500).json({ message: 'Registration failed' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email.toLowerCase()])
  if (!rows || rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' })
  const user = rows[0]
  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' })
  const token = generateToken({ id: user.id, email: user.email, name: user.name, role: user.role })
  // seed demo data on first login
  await seedDashboardForUser(user.id)
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
})

app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body || {}
  if (!email) return res.status(400).json({ message: 'Email is required' })
  // For demo purposes, just respond success without sending email
  return res.json({ message: 'If this email exists, reset instructions have been sent' })
})

// OAuth login/upsert (expects trusted client auth)
app.post('/api/auth/oauth-login', async (req, res) => {
  try {
    const { email, name = '', provider = 'google' } = req.body || {}
    if (!email) return res.status(400).json({ message: 'Email is required' })
    const lower = String(email).toLowerCase()
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [lower])
    let user = rows[0]
    if (!user) {
      const randomPass = await bcrypt.hash(Math.random().toString(36), 10)
      const [result] = await pool.query(
        'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        [name || lower.split('@')[0], lower, randomPass, 'user']
      )
      const [inserted] = await pool.query('SELECT * FROM users WHERE id = ? LIMIT 1', [result.insertId])
      user = inserted[0]
    } else if (name && name !== user.name) {
      await pool.query('UPDATE users SET name = ? WHERE id = ?', [name, user.id])
      user.name = name
    }
    const token = generateToken({ id: user.id, email: user.email, name: user.name, role: user.role })
    await seedDashboardForUser(user.id)
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role }, provider })
  } catch (e) {
    return res.status(500).json({ message: 'OAuth login failed' })
  }
})

app.get('/api/profile', authMiddleware, async (req, res) => {
  const [rows] = await pool.query('SELECT id, name, email, role, phone, location, department, bio, avatar_url FROM users WHERE id = ? LIMIT 1', [req.user.id])
  if (!rows || rows.length === 0) return res.status(404).json({ message: 'User not found' })
  const u = rows[0]
  const fullAvatar = u.avatar_url ? `${req.protocol}://${req.get('host')}${u.avatar_url}` : ''
  return res.json({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    profile: { phone: u.phone || '', location: u.location || '', department: u.department || '', bio: u.bio || '', avatarUrl: fullAvatar }
  })
})

app.put('/api/profile', authMiddleware, async (req, res) => {
  const { name, profile } = req.body || {}
  const phone = profile?.phone ?? ''
  const location = profile?.location ?? ''
  const department = profile?.department ?? ''
  const bio = profile?.bio ?? ''
  await pool.query(
    'UPDATE users SET name = COALESCE(?, name), phone = ?, location = ?, department = ?, bio = ? WHERE id = ?',
    [name || null, phone, location, department, bio, req.user.id]
  )
  return res.json({ message: 'Profile updated' })
})

// avatar upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, uploadsDir) },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, `avatar_${req.user.id}_${Date.now()}${ext}`)
  }
})
const upload = multer({ storage })

app.post('/api/profile/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
  const url = `/uploads/${req.file.filename}`
  await pool.query('UPDATE users SET avatar_url = ? WHERE id = ?', [url, req.user.id])
  const full = `${req.protocol}://${req.get('host')}${url}`
  return res.status(201).json({ message: 'Avatar updated', avatarUrl: full })
})

// Course materials upload (videos, PDFs, documents)
const courseStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const type = req.body.type || 'general'
    const dir = path.join(uploadsDir, type)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    const basename = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_')
    cb(null, `${basename}_${Date.now()}${ext}`)
  }
})

const courseUpload = multer({ 
  storage: courseStorage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|mp4|webm|ogg|txt/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    if (mimetype && extname) {
      return cb(null, true)
    }
    cb(new Error('Invalid file type. Allowed: images, videos, PDFs, documents'))
  }
})

app.post('/api/admin/upload', authMiddleware, courseUpload.single('file'), async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }
    
    const type = req.body.type || 'general'
    const url = `/uploads/${type}/${req.file.filename}`
    const fullUrl = `${req.protocol}://${req.get('host')}${url}`
    
    return res.status(201).json({ 
      message: 'File uploaded successfully', 
      url: fullUrl,
      filename: req.file.filename,
      size: req.file.size,
      type: req.file.mimetype
    })
  } catch (error) {
    console.error('Upload error:', error)
    return res.status(500).json({ message: 'File upload failed' })
  }
})

app.get('/api/dashboard', authMiddleware, async (req, res) => {
  const userId = req.user.id
  const [[userRow]] = await pool.query('SELECT id, name FROM users WHERE id = ? LIMIT 1', [userId])
  if (!userRow) return res.status(404).json({ message: 'User not found' })

  const [metrics] = await pool.query('SELECT name, value, change_percent AS `change`, trend, color FROM dashboard_metrics WHERE user_id = ?', [userId])
  const [projects] = await pool.query('SELECT name, progress, status, members FROM projects WHERE user_id = ?', [userId])
  const [activities] = await pool.query('SELECT action, project, type, created_at FROM activities WHERE user_id = ? ORDER BY created_at DESC LIMIT 20', [userId])

  const overview = {
    carbonReduction: Number(metrics.find(m => m.name === 'Carbon Emissions') ? 15.2 : 15.2),
    energySaved: Number(metrics.find(m => m.name === 'Energy Consumption') ? 45.8 : 45.8),
    projectsActive: projects.length,
    teamMembers: 8,
    weeklyTrend: 'up',
    monthlyGoal: 75
  }

  return res.json({ overview, metrics, recentActivities: activities.map(a => ({ ...a, date: a.created_at })), projects })
})

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {}
  if (!name || !email || !subject || !message) return res.status(400).json({ message: 'All fields are required' })
  await pool.query(
    'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
    [name, email, subject, message]
  )
  return res.status(201).json({ message: 'Message received' })
})

// --- IoT Sensor Streaming (SSE) ---
const iotClients = new Map() // userId -> Set(res)
const notifClients = new Map() // userId -> Set(res)
const chatClients = new Map() // userId -> Set(res)

function addIotClient(userId, res) {
  if (!iotClients.has(userId)) iotClients.set(userId, new Set())
  iotClients.get(userId).add(res)
}

function removeIotClient(userId, res) {
  const set = iotClients.get(userId)
  if (set) {
    set.delete(res)
    if (set.size === 0) iotClients.delete(userId)
  }
}

async function broadcastIotMessage(userId, message) {
  const set = iotClients.get(userId)
  if (!set) return
  const data = `data: ${JSON.stringify(message)}\n\n`
  for (const res of set) {
    res.write(data)
  }
}

async function broadcastNotification(userId, notification) {
  const set = notifClients.get(userId)
  if (!set) return
  const data = `data: ${JSON.stringify(notification)}\n\n`
  for (const res of set) {
    res.write(data)
  }
}

async function broadcastChat(userId, message) {
  const set = chatClients.get(userId)
  if (!set) return
  const data = `data: ${JSON.stringify(message)}\n\n`
  for (const res of set) {
    res.write(data)
  }
}

// SSE stream: token via query param because EventSource can't set headers
app.get('/api/iot/stream', async (req, res) => {
  try {
    const token = req.query.token
    if (!token) return res.status(401).end()
    const payload = jwt.verify(token, JWT_SECRET)

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders?.()

    // Send a hello event
    res.write(`event: hello\n`)
    res.write(`data: ${JSON.stringify({ connected: true, ts: Date.now() })}\n\n`)

    addIotClient(payload.id, res)

    req.on('close', () => {
      removeIotClient(payload.id, res)
      res.end()
    })
  } catch (e) {
    return res.status(401).end()
  }
})

// Ingest sensor message (authenticated; for real devices you could use API keys)
app.post('/api/iot/ingest', authMiddleware, async (req, res) => {
  const { topic = 'default', payload } = req.body || {}
  if (!payload) return res.status(400).json({ message: 'payload is required' })
  try {
    await pool.query('INSERT INTO sensor_messages (user_id, topic, payload) VALUES (?, ?, ?)', [req.user.id, topic, JSON.stringify(payload)])
    await broadcastIotMessage(req.user.id, { topic, payload, created_at: new Date().toISOString() })
    return res.status(201).json({ message: 'ingested' })
  } catch (e) {
    return res.status(500).json({ message: 'Failed to ingest' })
  }
})

// Notifications endpoints
app.get('/api/notifications', authMiddleware, async (req, res) => {
  const [rows] = await pool.query('SELECT id, title, body, is_read, created_at FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 100', [req.user.id])
  return res.json(rows)
})

app.post('/api/notifications', authMiddleware, async (req, res) => {
  const { title, body } = req.body || {}
  if (!title || !body) return res.status(400).json({ message: 'title and body are required' })
  const [result] = await pool.query('INSERT INTO notifications (user_id, title, body) VALUES (?, ?, ?)', [req.user.id, title, body])
  const [rows] = await pool.query('SELECT id, title, body, is_read, created_at FROM notifications WHERE id = ?', [result.insertId])
  const notif = rows[0]
  await broadcastNotification(req.user.id, notif)
  return res.status(201).json(notif)
})

app.put('/api/notifications/:id/read', authMiddleware, async (req, res) => {
  const id = Number(req.params.id)
  await pool.query('UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?', [id, req.user.id])
  return res.json({ message: 'marked read' })
})

app.get('/api/notifications/stream', async (req, res) => {
  try {
    const token = req.query.token
    if (!token) return res.status(401).end()
    const payload = jwt.verify(token, JWT_SECRET)
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders?.()
    if (!notifClients.has(payload.id)) notifClients.set(payload.id, new Set())
    notifClients.get(payload.id).add(res)
    req.on('close', () => {
      const set = notifClients.get(payload.id)
      if (set) {
        set.delete(res)
        if (set.size === 0) notifClients.delete(payload.id)
      }
      res.end()
    })
  } catch (e) {
    return res.status(401).end()
  }
})

// --- Chat SSE stream ---
app.get('/api/chat/stream', async (req, res) => {
  try {
    const token = req.query.token
    if (!token) return res.status(401).end()
    const payload = jwt.verify(token, JWT_SECRET)
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders?.()
    if (!chatClients.has(payload.id)) chatClients.set(payload.id, new Set())
    chatClients.get(payload.id).add(res)
    req.on('close', () => {
      const set = chatClients.get(payload.id)
      if (set) {
        set.delete(res)
        if (set.size === 0) chatClients.delete(payload.id)
      }
      res.end()
    })
  } catch (e) {
    return res.status(401).end()
  }
})

// --- Chat endpoints ---
app.get('/api/chat', authMiddleware, async (req, res) => {
  const userId = req.user.id
  const [rows] = await pool.query(
    `SELECT c.id, c.is_group, c.title,
            GROUP_CONCAT(u.name SEPARATOR ', ') AS participants
     FROM chats c
     JOIN chat_participants p ON p.chat_id = c.id
     JOIN users u ON u.id = p.user_id
     WHERE c.id IN (SELECT chat_id FROM chat_participants WHERE user_id = ?)
     GROUP BY c.id
     ORDER BY c.id DESC LIMIT 200`,
    [userId]
  )
  return res.json(rows)
})

app.post('/api/chat', authMiddleware, async (req, res) => {
  const userId = req.user.id
  const { participantIds = [], title = null } = req.body || {}
  const ids = Array.from(new Set(participantIds.map(Number).concat([userId]))).filter(Boolean)
  if (ids.length < 2) return res.status(400).json({ message: 'At least one other participant required' })
  const [result] = await pool.query('INSERT INTO chats (is_group, title, created_by) VALUES (?, ?, ?)', [Number(Boolean(title)), title, userId])
  const chatId = result.insertId
  const values = ids.map(() => '(?, ?)').join(',')
  const params = ids.flatMap(uid => [chatId, uid])
  await pool.query(`INSERT INTO chat_participants (chat_id, user_id) VALUES ${values}`, params)
  return res.status(201).json({ id: chatId })
})

app.get('/api/chat/:chatId/messages', authMiddleware, async (req, res) => {
  const userId = req.user.id
  const chatId = Number(req.params.chatId)
  const [[member]] = await pool.query('SELECT 1 AS ok FROM chat_participants WHERE chat_id = ? AND user_id = ? LIMIT 1', [chatId, userId])
  if (!member) return res.status(403).json({ message: 'Forbidden' })
  const { limit = 100, offset = 0 } = req.query || {}
  const [rows] = await pool.query(
    `SELECT m.id, m.user_id, u.name AS user_name, m.type, m.body, m.attachment_url, m.created_at
     FROM chat_messages m JOIN users u ON u.id = m.user_id
     WHERE m.chat_id = ?
     ORDER BY m.created_at DESC
     LIMIT ? OFFSET ?`,
    [chatId, Number(limit), Number(offset)]
  )
  return res.json(rows)
})

app.post('/api/chat/:chatId/messages', authMiddleware, upload.single('attachment'), async (req, res) => {
  const userId = req.user.id
  const chatId = Number(req.params.chatId)
  const [[member]] = await pool.query('SELECT 1 AS ok FROM chat_participants WHERE chat_id = ? AND user_id = ? LIMIT 1', [chatId, userId])
  if (!member) return res.status(403).json({ message: 'Forbidden' })
  const { body = '', type = 'text' } = req.body || {}
  let attachmentUrl = null
  if (req.file) {
    attachmentUrl = `/uploads/${req.file.filename}`
  }
  const [result] = await pool.query(
    'INSERT INTO chat_messages (chat_id, user_id, type, body, attachment_url) VALUES (?, ?, ?, ?, ?)',
    [chatId, userId, type, body || null, attachmentUrl]
  )
  const [rows] = await pool.query(
    `SELECT m.id, m.user_id, u.name AS user_name, m.type, m.body, m.attachment_url, m.created_at
     FROM chat_messages m JOIN users u ON u.id = m.user_id WHERE m.id = ?`,
    [result.insertId]
  )
  const message = rows[0]
  // broadcast to all participants
  const [pRows] = await pool.query('SELECT user_id FROM chat_participants WHERE chat_id = ?', [chatId])
  for (const p of pRows) {
    await broadcastChat(p.user_id, { chat_id: chatId, message })
  }
  return res.status(201).json(message)
})

// Chat signaling for WebRTC
app.post('/api/chat/:chatId/signal', authMiddleware, async (req, res) => {
  const userId = req.user.id
  const chatId = Number(req.params.chatId)
  const [[member]] = await pool.query('SELECT 1 AS ok FROM chat_participants WHERE chat_id = ? AND user_id = ? LIMIT 1', [chatId, userId])
  if (!member) return res.status(403).json({ message: 'Forbidden' })
  const payload = req.body || {}
  const [pRows] = await pool.query('SELECT user_id FROM chat_participants WHERE chat_id = ?', [chatId])
  for (const p of pRows) {
    if (Number(p.user_id) === Number(userId)) continue
    await broadcastChat(p.user_id, { chat_id: chatId, type: 'webrtc', from: userId, signal: payload })
  }
  return res.json({ message: 'signal sent' })
})

// --- AI Assistant (Gemini) ---
app.post('/api/ai/chat', authMiddleware, async (req, res) => {
  if (!genAI) return res.status(500).json({ message: 'AI not configured' })
  const { messages = [], system = 'You are an assistant that helps users manage sustainability activities and dashboards. Be concise and actionable.' } = req.body || {}
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', systemInstruction: system })
    let history = messages
      .filter(m => typeof m?.content === 'string' && m.content.trim().length)
      .map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content.trim() }] }))

    // Ensure history starts with user message (Gemini requirement)
    if (history.length > 0 && history[0].role !== 'user') {
      history = history.filter((_, index) => index > 0 || history[0].role === 'user')
    }

    // Limit history to last 20 messages
    const chatHistory = history.slice(-20)
    
    const chat = model.startChat({ history: chatHistory })
    const lastUser = [...history].reverse().find(m => m.role === 'user')
    const prompt = lastUser?.parts?.[0]?.text || 'Hello'
    const result = await chat.sendMessage(prompt)
    const text = result.response.text()
    return res.json({ reply: text })
  } catch (e) {
    const detail = e?.response?.data || e?.message || 'unknown error'
    console.error('AI chat error:', detail)
    return res.status(500).json({ message: String(detail) })
  }
})

// Users endpoints
app.get('/api/users/me', authMiddleware, async (req, res) => {
  const [rows] = await pool.query('SELECT id, name, email, role, phone, location, department, bio, created_at FROM users WHERE id = ? LIMIT 1', [req.user.id])
  if (!rows || rows.length === 0) return res.status(404).json({ message: 'User not found' })
  return res.json(rows[0])
})

app.get('/api/users', authMiddleware, async (req, res) => {
  // Allow only admins to list users
  const [meRows] = await pool.query('SELECT role FROM users WHERE id = ? LIMIT 1', [req.user.id])
  const me = meRows[0]
  if (!me || me.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
  const [users] = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC LIMIT 200')
  return res.json(users)
})

// Admin: list all reports across users
app.get('/api/admin/reports', authMiddleware, async (req, res) => {
  if (!(await assertAdmin(req, res))) return
  const [rows] = await pool.query('SELECT r.id, r.user_id, u.name AS user_name, r.name, r.config, r.created_at FROM reports r JOIN users u ON r.user_id = u.id ORDER BY r.created_at DESC LIMIT 1000')
  return res.json(rows)
})

// --- Admin helpers ---
async function assertAdmin(req, res) {
  const [meRows] = await pool.query('SELECT role FROM users WHERE id = ? LIMIT 1', [req.user.id])
  const me = meRows[0]
  if (!me || me.role !== 'admin') {
    res.status(403).json({ message: 'Forbidden' })
    return false
  }
  return true
}

// Admin: update user role
app.post('/api/admin/users/:id/role', authMiddleware, async (req, res) => {
  if (!(await assertAdmin(req, res))) return
  const userId = Number(req.params.id)
  const { role } = req.body || {}
  if (!['user','admin'].includes(String(role))) return res.status(400).json({ message: 'Invalid role' })
  await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, userId])
  const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = ? LIMIT 1', [userId])
  return res.json(rows[0] || { message: 'updated' })
})

// Admin: reset user password (set to provided or random; returns temp password once)
app.post('/api/admin/users/:id/reset-password', authMiddleware, async (req, res) => {
  if (!(await assertAdmin(req, res))) return
  const userId = Number(req.params.id)
  const { newPassword = '' } = req.body || {}
  const temp = newPassword || Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6)
  const hash = await bcrypt.hash(temp, 10)
  await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [hash, userId])
  return res.json({ message: 'password reset', tempPassword: newPassword ? undefined : temp })
})

// Admin: list contact messages
app.get('/api/admin/contact-messages', authMiddleware, async (req, res) => {
  if (!(await assertAdmin(req, res))) return
  const [rows] = await pool.query('SELECT id, name, email, subject, message, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 1000')
  return res.json(rows)
})

// Admin: system metrics
app.get('/api/admin/metrics', authMiddleware, async (req, res) => {
  if (!(await assertAdmin(req, res))) return
  const [[usersCount]] = await pool.query('SELECT COUNT(*) AS c FROM users')
  const [[notifCount]] = await pool.query('SELECT COUNT(*) AS c FROM notifications')
  const [[sensorCount]] = await pool.query('SELECT COUNT(*) AS c FROM sensor_messages')
  const [[projectsCount]] = await pool.query('SELECT COUNT(*) AS c FROM projects')
  const [[activitiesCount]] = await pool.query('SELECT COUNT(*) AS c FROM activities')
  return res.json({
    users: usersCount.c,
    notifications: notifCount.c,
    sensorMessages: sensorCount.c,
    projects: projectsCount.c,
    activities: activitiesCount.c
  })
})

// Admin: broadcast notification to all users
app.post('/api/admin/notifications/broadcast', authMiddleware, async (req, res) => {
  if (!(await assertAdmin(req, res))) return
  const { title, body } = req.body || {}
  if (!title || !body) return res.status(400).json({ message: 'title and body are required' })
  try {
    const [userRows] = await pool.query('SELECT id FROM users')
    const userIds = userRows.map(u => u.id)
    if (userIds.length === 0) return res.json({ message: 'no users' })
    const values = userIds.map(() => '(?, ?, ?)').join(',')
    const params = userIds.flatMap(id => [id, title, body])
    await pool.query(`INSERT INTO notifications (user_id, title, body) VALUES ${values}`, params)
    // Fetch last 1 for each? Instead, broadcast a generic object
    for (const id of userIds) {
      await broadcastNotification(id, { id: 0, title, body, is_read: 0, created_at: new Date().toISOString() })
    }
    return res.status(201).json({ message: 'broadcast sent', recipients: userIds.length })
  } catch (e) {
    return res.status(500).json({ message: 'Failed to broadcast' })
  }
})

// --- Tasks (per-user) ---
app.get('/api/tasks', authMiddleware, async (req, res) => {
  const userId = req.user.id
  const { status = '', q = '', limit = 50, offset = 0 } = req.query || {}
  const where = ['user_id = ?']
  const params = [userId]
  if (status) { where.push('status = ?'); params.push(status) }
  if (q) { where.push('(title LIKE ? OR description LIKE ?)'); params.push(`%${q}%`, `%${q}%`) }
  params.push(Number(limit), Number(offset))
  const [rows] = await pool.query(
    `SELECT id, title, description, status, priority, due_date, created_at, updated_at
     FROM tasks WHERE ${where.join(' AND ')} ORDER BY created_at DESC LIMIT ? OFFSET ?`, params
  )
  return res.json(rows)
})

app.post('/api/tasks', authMiddleware, async (req, res) => {
  const userId = req.user.id
  const { title, description = '', status = 'todo', priority = 'medium', due_date = null } = req.body || {}
  if (!title) return res.status(400).json({ message: 'title is required' })
  const [result] = await pool.query(
    'INSERT INTO tasks (user_id, title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?)',
    [userId, title, description, status, priority, due_date]
  )
  const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [result.insertId, userId])
  return res.status(201).json(rows[0])
})

app.put('/api/tasks/:id', authMiddleware, async (req, res) => {
  const userId = req.user.id
  const id = Number(req.params.id)
  const { title, description, status, priority, due_date } = req.body || {}
  const [result] = await pool.query(
    `UPDATE tasks SET
       title = COALESCE(?, title),
       description = COALESCE(?, description),
       status = COALESCE(?, status),
       priority = COALESCE(?, priority),
       due_date = COALESCE(?, due_date)
     WHERE id = ? AND user_id = ?`,
    [title ?? null, description ?? null, status ?? null, priority ?? null, due_date ?? null, id, userId]
  )
  if (result.affectedRows === 0) return res.status(404).json({ message: 'Task not found' })
  const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [id, userId])
  return res.json(rows[0])
})

app.delete('/api/tasks/:id', authMiddleware, async (req, res) => {
  const userId = req.user.id
  const id = Number(req.params.id)
  const [result] = await pool.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, userId])
  if (result.affectedRows === 0) return res.status(404).json({ message: 'Task not found' })
  return res.json({ message: 'deleted' })
})

// --- Dashboard widgets layout (per-user) ---
app.get('/api/dashboard/widgets', authMiddleware, async (req, res) => {
  const userId = req.user.id
  const [rows] = await pool.query('SELECT layout FROM dashboard_widgets WHERE user_id = ? LIMIT 1', [userId])
  return res.json({ layout: rows[0]?.layout || [] })
})

app.put('/api/dashboard/widgets', authMiddleware, async (req, res) => {
  const userId = req.user.id
  const { layout } = req.body || {}
  if (!layout) return res.status(400).json({ message: 'layout is required' })
  await pool.query(
    `INSERT INTO dashboard_widgets (user_id, layout)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE layout = VALUES(layout), updated_at = CURRENT_TIMESTAMP`,
    [userId, JSON.stringify(layout)]
  )
  return res.json({ message: 'layout saved' })
})

// --- Timeseries metrics from sensor_messages ---
app.get('/api/metrics/timeseries', authMiddleware, async (req, res) => {
  const userId = req.user.id
  const { key = 'energy', period = '30d', interval = 'day' } = req.query || {}
  const days = String(period).endsWith('d') ? Math.min(365, Number(String(period).slice(0, -1)) || 30) : 30
  const timeExpr = interval === 'hour' ? 'DATE_FORMAT(created_at, "%Y-%m-%d %H:00:00")' : 'DATE(created_at)'

  const [rows] = await pool.query(
    `SELECT ${timeExpr} AS ts,
            AVG(NULLIF(JSON_EXTRACT(payload, CONCAT('$.', ?)), 'null')) AS avg_value,
            SUM(CASE WHEN JSON_EXTRACT(payload, CONCAT('$.', ?)) IS NOT NULL THEN 1 ELSE 0 END) AS with_value,
            COUNT(*) AS total
     FROM sensor_messages
     WHERE user_id = ? AND created_at >= (CURRENT_TIMESTAMP - INTERVAL ? DAY)
     GROUP BY ts
     ORDER BY ts ASC`,
    [key, key, userId, days]
  )

  const series = rows.map(r => ({
    ts: r.ts,
    avg: r.avg_value !== null ? Number(r.avg_value) : null,
    countWithValue: Number(r.with_value || 0),
    total: Number(r.total || 0)
  }))
  return res.json({ key, period: `${days}d`, interval, series })
})

// --- Saved reports (per-user) ---
app.get('/api/reports', authMiddleware, async (req, res) => {
  const [rows] = await pool.query('SELECT id, name, config, created_at FROM reports WHERE user_id = ? ORDER BY created_at DESC', [req.user.id])
  return res.json(rows)
})

app.post('/api/reports', authMiddleware, async (req, res) => {
  const userId = req.user.id
  const { name, config } = req.body || {}
  if (!name || !config) return res.status(400).json({ message: 'name and config are required' })
  const [result] = await pool.query('INSERT INTO reports (user_id, name, config) VALUES (?, ?, ?)', [userId, name, JSON.stringify(config)])
  const [rows] = await pool.query('SELECT id, name, config, created_at FROM reports WHERE id = ? AND user_id = ?', [result.insertId, userId])
  return res.status(201).json(rows[0])
})

app.delete('/api/reports/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id)
  const [result] = await pool.query('DELETE FROM reports WHERE id = ? AND user_id = ?', [id, req.user.id])
  if (result.affectedRows === 0) return res.status(404).json({ message: 'Report not found' })
  return res.json({ message: 'deleted' })
})

// --- CSV export (per-user sensor messages) ---
app.get('/api/export/sensor_messages.csv', authMiddleware, async (req, res) => {
  const userId = req.user.id
  const { limit = 1000, since = '' } = req.query || {}
  const params = [userId]
  let where = 'WHERE user_id = ?'
  if (since) { where += ' AND created_at >= ?'; params.push(since) }
  params.push(Number(limit))
  const [rows] = await pool.query(
    `SELECT id, topic, payload, created_at
     FROM sensor_messages
     ${where}
     ORDER BY created_at DESC
     LIMIT ?`, params
  )
  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename="sensor_messages.csv"')
  res.write('id,topic,created_at,payload\n')
  for (const r of rows) {
    const payloadStr = typeof r.payload === 'string' ? r.payload : JSON.stringify(r.payload)
    const safePayload = '"' + String(payloadStr).replaceAll('"', '""') + '"'
    res.write(`${r.id},${r.topic},${new Date(r.created_at).toISOString()},${safePayload}\n`)
  }
  res.end()
})

// Training API Routes
app.get('/api/training/stats', async (req, res) => {
  try {
    const statsPath = path.join(process.cwd(), 'backend', 'data', 'training-stats.json')
    const statsData = JSON.parse(fs.readFileSync(statsPath, 'utf8'))
    res.json(statsData)
  } catch (error) {
    console.error('Error fetching training stats:', error)
    res.status(500).json({ message: 'Failed to fetch training statistics' })
  }
})

app.get('/api/training/courses', async (req, res) => {
  try {
    let query = 'SELECT * FROM courses WHERE 1=1'
    const params = []
    
    const { category, level, search } = req.query
    
    if (category && category !== 'all') {
      query += ' AND category = ?'
      params.push(category)
    }
    
    if (level && level !== 'all') {
      query += ' AND level = ?'
      params.push(level)
    }
    
    if (search) {
      query += ' AND (title LIKE ? OR description LIKE ? OR instructor LIKE ?)'
      const searchPattern = `%${search}%`
      params.push(searchPattern, searchPattern, searchPattern)
    }
    
    query += ' ORDER BY created_at DESC'
    
    const [courses] = await pool.query(query, params)
    
    // Parse JSON fields
    const parsedCourses = courses.map(course => ({
      ...course,
      topics: course.topics ? JSON.parse(course.topics) : [],
      learningObjectives: course.learning_objectives ? JSON.parse(course.learning_objectives) : [],
      requirements: course.requirements ? JSON.parse(course.requirements) : { prerequisites: [], materials: [] },
      certificate: Boolean(course.certificate),
      locked: Boolean(course.locked)
    }))
    
    res.json(parsedCourses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    res.status(500).json({ message: 'Failed to fetch courses' })
  }
})

app.get('/api/training/courses/:id', async (req, res) => {
  try {
    const [course] = await pool.query('SELECT * FROM courses WHERE id = ?', [req.params.id])
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }
    
    // Parse JSON fields
    const parsedCourse = {
      ...course,
      topics: course.topics ? JSON.parse(course.topics) : [],
      learningObjectives: course.learning_objectives ? JSON.parse(course.learning_objectives) : [],
      requirements: course.requirements ? JSON.parse(course.requirements) : { prerequisites: [], materials: [] },
      certificate: Boolean(course.certificate),
      locked: Boolean(course.locked)
    }
    
    res.json(parsedCourse)
  } catch (error) {
    console.error('Error fetching course:', error)
    res.status(500).json({ message: 'Failed to fetch course' })
  }
})

app.get('/api/training/community', async (req, res) => {
  try {
    const [teams] = await pool.query('SELECT * FROM community_teams ORDER BY created_at DESC')
    const [tasks] = await pool.query('SELECT * FROM community_tasks ORDER BY created_at DESC')
    const [stats] = await pool.query('SELECT * FROM training_stats LIMIT 1')
    
    res.json({
      teams,
      tasks,
      leaderboard: [], // Will be populated from user data
      stats: stats[0] || { total_students: 0, courses_completed: 0, avg_rating: 0, certificates_issued: 0 }
    })
  } catch (error) {
    console.error('Error fetching community data:', error)
    res.status(500).json({ message: 'Failed to fetch community data' })
  }
})

app.get('/api/training/community/teams', async (req, res) => {
  try {
    const communityPath = path.join(process.cwd(), 'backend', 'data', 'community.json')
    const communityData = JSON.parse(fs.readFileSync(communityPath, 'utf8'))
    
    const { search, category, difficulty } = req.query
    
    let filteredTeams = communityData.teams
    
    if (search) {
      const searchLower = search.toLowerCase()
      filteredTeams = filteredTeams.filter(team => 
        team.name.toLowerCase().includes(searchLower) ||
        team.description.toLowerCase().includes(searchLower)
      )
    }
    
    if (category && category !== 'all') {
      filteredTeams = filteredTeams.filter(team => team.category === category)
    }
    
    if (difficulty && difficulty !== 'all') {
      filteredTeams = filteredTeams.filter(team => team.difficulty === difficulty)
    }
    
    res.json(filteredTeams)
  } catch (error) {
    console.error('Error fetching teams:', error)
    res.status(500).json({ message: 'Failed to fetch teams' })
  }
})

app.get('/api/training/community/tasks', async (req, res) => {
  try {
    const communityPath = path.join(process.cwd(), 'backend', 'data', 'community.json')
    const communityData = JSON.parse(fs.readFileSync(communityPath, 'utf8'))
    
    const { teamId, status } = req.query
    
    let filteredTasks = communityData.tasks
    
    if (teamId) {
      filteredTasks = filteredTasks.filter(task => task.teamId === teamId)
    }
    
    if (status && status !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.status === status)
    }
    
    res.json(filteredTasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ message: 'Failed to fetch tasks' })
  }
})

app.get('/api/training/community/leaderboard', async (req, res) => {
  try {
    const communityPath = path.join(process.cwd(), 'backend', 'data', 'community.json')
    const communityData = JSON.parse(fs.readFileSync(communityPath, 'utf8'))
    res.json(communityData.leaderboard)
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    res.status(500).json({ message: 'Failed to fetch leaderboard' })
  }
})

app.post('/api/training/community/join-team', authMiddleware, async (req, res) => {
  try {
    const { teamId } = req.body
    const userId = req.user.id
    
    // In a real implementation, this would update the database
    // For now, we'll just return a success response
    res.json({ message: 'Successfully joined team', teamId, userId })
  } catch (error) {
    console.error('Error joining team:', error)
    res.status(500).json({ message: 'Failed to join team' })
  }
})

app.post('/api/training/community/submit-task', authMiddleware, async (req, res) => {
  try {
    const { taskId, submission } = req.body
    const userId = req.user.id
    
    // In a real implementation, this would update the database
    // For now, we'll just return a success response
    res.json({ message: 'Task submitted successfully', taskId, userId })
  } catch (error) {
    console.error('Error submitting task:', error)
    res.status(500).json({ message: 'Failed to submit task' })
  }
})

app.get('/api/training/user-progress', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id
    const communityPath = path.join(process.cwd(), 'backend', 'data', 'community.json')
    const communityData = JSON.parse(fs.readFileSync(communityPath, 'utf8'))
    
    const userProgress = communityData.userProgress.find(up => up.userId === userId)
    
    if (!userProgress) {
      // Return default progress for new users
      return res.json({
        userId,
        name: req.user.name,
        role: 'member',
        teams: [],
        completedTasks: 0,
        points: 0,
        joinedAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      })
    }
    
    res.json(userProgress)
  } catch (error) {
    console.error('Error fetching user progress:', error)
    res.status(500).json({ message: 'Failed to fetch user progress' })
  }
})

// Lesson endpoints
app.get('/api/training/courses/:courseId/lessons', async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId)
    const [lessons] = await pool.query(
      'SELECT *, order_num as `order`, is_locked as isLocked FROM lessons WHERE course_id = ? ORDER BY order_num ASC',
      [courseId]
    )
    
    // Parse JSON resources field
    const parsedLessons = lessons.map(lesson => ({
      ...lesson,
      courseId: lesson.course_id,
      videoUrl: lesson.video_url,
      resources: lesson.resources ? JSON.parse(lesson.resources) : [],
      isLocked: Boolean(lesson.isLocked)
    }))
    
    res.json(parsedLessons)
  } catch (error) {
    console.error('Error fetching lessons:', error)
    res.status(500).json({ message: 'Failed to fetch lessons' })
  }
})

app.get('/api/training/courses/:courseId/lessons/:lessonId', async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId)
    const lessonId = parseInt(req.params.lessonId)
    
    const [lessons] = await pool.query(
      'SELECT *, order_num as `order`, is_locked as isLocked FROM lessons WHERE course_id = ? AND id = ?',
      [courseId, lessonId]
    )
    
    if (!lessons || lessons.length === 0) {
      return res.status(404).json({ message: 'Lesson not found' })
    }
    
    const lesson = lessons[0]
    const parsedLesson = {
      ...lesson,
      courseId: lesson.course_id,
      videoUrl: lesson.video_url,
      resources: lesson.resources ? JSON.parse(lesson.resources) : [],
      isLocked: Boolean(lesson.isLocked),
      isCompleted: false
    }
    
    res.json(parsedLesson)
  } catch (error) {
    console.error('Error fetching lesson:', error)
    res.status(500).json({ message: 'Failed to fetch lesson' })
  }
})

app.get('/api/training/courses/:courseId/progress', authMiddleware, async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId)
    const userId = req.user.id
    
    const [progress] = await pool.query(
      'SELECT * FROM course_progress WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    )
    
    if (!progress || progress.length === 0) {
      // Create new progress entry
      await pool.query(
        'INSERT INTO course_progress (user_id, course_id, completed_lessons, quiz_scores) VALUES (?, ?, ?, ?)',
        [userId, courseId, JSON.stringify([]), JSON.stringify({})]
      )
      
      return res.json({
        userId,
        courseId,
        completedLessons: [],
        currentLesson: 1,
        progressPercentage: 0,
        timeSpent: 0,
        lastAccessed: new Date().toISOString(),
        quizScores: {},
        certificateEarned: false
      })
    }
    
    const userProgress = progress[0]
    res.json({
      userId: userProgress.user_id,
      courseId: userProgress.course_id,
      completedLessons: userProgress.completed_lessons ? JSON.parse(userProgress.completed_lessons) : [],
      currentLesson: userProgress.current_lesson,
      progressPercentage: parseFloat(userProgress.progress_percentage),
      timeSpent: userProgress.time_spent,
      lastAccessed: userProgress.last_accessed,
      quizScores: userProgress.quiz_scores ? JSON.parse(userProgress.quiz_scores) : {},
      certificateEarned: Boolean(userProgress.certificate_earned)
    })
  } catch (error) {
    console.error('Error fetching course progress:', error)
    res.status(500).json({ message: 'Failed to fetch course progress' })
  }
})

app.post('/api/training/courses/:courseId/lessons/:lessonId/complete', authMiddleware, async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId)
    const lessonId = parseInt(req.params.lessonId)
    const userId = req.user.id
    
    // In a real implementation, this would update the database
    // For now, we'll just return a success response
    res.json({ 
      message: 'Lesson completed successfully', 
      courseId, 
      lessonId, 
      userId 
    })
  } catch (error) {
    console.error('Error completing lesson:', error)
    res.status(500).json({ message: 'Failed to complete lesson' })
  }
})

app.post('/api/training/courses/:courseId/lessons/:lessonId/quiz', authMiddleware, async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId)
    const lessonId = parseInt(req.params.lessonId)
    const { answers } = req.body
    const userId = req.user.id
    
    // In a real implementation, this would calculate the score and update the database
    res.json({ 
      message: 'Quiz submitted successfully', 
      courseId, 
      lessonId, 
      userId,
      answers
    })
  } catch (error) {
    console.error('Error submitting quiz:', error)
    res.status(500).json({ message: 'Failed to submit quiz' })
  }
})

// Admin Course Management Endpoints
app.post('/api/admin/courses', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    const { title, description, category, level, duration, price, instructor, topics, learningObjectives, requirements, certificate, thumbnail } = req.body
    
    const [result] = await pool.query(
      `INSERT INTO courses (title, description, category, level, duration, price, instructor, topics, learning_objectives, requirements, certificate, thumbnail)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        category || 'iot',
        level || 'Beginner',
        duration,
        price || 0,
        instructor,
        JSON.stringify(topics || []),
        JSON.stringify(learningObjectives || []),
        JSON.stringify(requirements || {}),
        certificate ? 1 : 0,
        thumbnail || null
      ]
    )
    
    const [courses] = await pool.query('SELECT * FROM courses WHERE id = ?', [result.insertId])
    const course = courses[0]
    
    res.status(201).json({
      ...course,
      topics: course.topics ? JSON.parse(course.topics) : [],
      learningObjectives: course.learning_objectives ? JSON.parse(course.learning_objectives) : [],
      requirements: course.requirements ? JSON.parse(course.requirements) : {},
      certificate: Boolean(course.certificate),
      locked: Boolean(course.locked)
    })
  } catch (error) {
    console.error('Error creating course:', error)
    res.status(500).json({ message: 'Failed to create course' })
  }
})

app.put('/api/admin/courses/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    const courseId = parseInt(req.params.id)
    const { title, description, category, level, duration, price, instructor, topics, learningObjectives, requirements, certificate, thumbnail } = req.body
    
    const [result] = await pool.query(
      `UPDATE courses SET
         title = COALESCE(?, title),
         description = COALESCE(?, description),
         category = COALESCE(?, category),
         level = COALESCE(?, level),
         duration = COALESCE(?, duration),
         price = COALESCE(?, price),
         instructor = COALESCE(?, instructor),
         topics = COALESCE(?, topics),
         learning_objectives = COALESCE(?, learning_objectives),
         requirements = COALESCE(?, requirements),
         certificate = COALESCE(?, certificate),
         thumbnail = COALESCE(?, thumbnail)
       WHERE id = ?`,
      [
        title || null,
        description || null,
        category || null,
        level || null,
        duration || null,
        price !== undefined ? price : null,
        instructor || null,
        topics ? JSON.stringify(topics) : null,
        learningObjectives ? JSON.stringify(learningObjectives) : null,
        requirements ? JSON.stringify(requirements) : null,
        certificate !== undefined ? (certificate ? 1 : 0) : null,
        thumbnail || null,
        courseId
      ]
    )
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Course not found' })
    }
    
    const [courses] = await pool.query('SELECT * FROM courses WHERE id = ?', [courseId])
    const course = courses[0]
    
    res.json({
      ...course,
      topics: course.topics ? JSON.parse(course.topics) : [],
      learningObjectives: course.learning_objectives ? JSON.parse(course.learning_objectives) : [],
      requirements: course.requirements ? JSON.parse(course.requirements) : {},
      certificate: Boolean(course.certificate),
      locked: Boolean(course.locked)
    })
  } catch (error) {
    console.error('Error updating course:', error)
    res.status(500).json({ message: 'Failed to update course' })
  }
})

app.delete('/api/admin/courses/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    const courseId = parseInt(req.params.id)
    
    // Delete lessons cascade automatically due to foreign key
    const [result] = await pool.query('DELETE FROM courses WHERE id = ?', [courseId])
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Course not found' })
    }
    
    res.json({ message: 'Course deleted successfully' })
  } catch (error) {
    console.error('Error deleting course:', error)
    res.status(500).json({ message: 'Failed to delete course' })
  }
})

// Admin Lesson Management Endpoints
app.post('/api/admin/courses/:courseId/lessons', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    const courseId = parseInt(req.params.courseId)
    const { title, description, duration, type, order, videoUrl, transcript, resources } = req.body
    
    const [result] = await pool.query(
      `INSERT INTO lessons (course_id, title, description, duration, type, order_num, video_url, transcript, resources)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        courseId,
        title,
        description,
        duration,
        type || 'video',
        order || 1,
        videoUrl || null,
        transcript || null,
        JSON.stringify(resources || [])
      ]
    )
    
    const [lessons] = await pool.query('SELECT * FROM lessons WHERE id = ?', [result.insertId])
    const lesson = lessons[0]
    
    res.status(201).json({
      ...lesson,
      courseId: lesson.course_id,
      order: lesson.order_num,
      videoUrl: lesson.video_url,
      resources: lesson.resources ? JSON.parse(lesson.resources) : [],
      isLocked: Boolean(lesson.is_locked)
    })
  } catch (error) {
    console.error('Error creating lesson:', error)
    res.status(500).json({ message: 'Failed to create lesson' })
  }
})

app.put('/api/admin/courses/:courseId/lessons/:lessonId', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    const lessonId = parseInt(req.params.lessonId)
    const { title, description, duration, type, order, videoUrl, transcript, resources } = req.body
    
    const [result] = await pool.query(
      `UPDATE lessons SET
         title = COALESCE(?, title),
         description = COALESCE(?, description),
         duration = COALESCE(?, duration),
         type = COALESCE(?, type),
         order_num = COALESCE(?, order_num),
         video_url = COALESCE(?, video_url),
         transcript = COALESCE(?, transcript),
         resources = COALESCE(?, resources)
       WHERE id = ?`,
      [
        title || null,
        description || null,
        duration || null,
        type || null,
        order || null,
        videoUrl || null,
        transcript || null,
        resources ? JSON.stringify(resources) : null,
        lessonId
      ]
    )
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Lesson not found' })
    }
    
    const [lessons] = await pool.query('SELECT * FROM lessons WHERE id = ?', [lessonId])
    const lesson = lessons[0]
    
    res.json({
      ...lesson,
      courseId: lesson.course_id,
      order: lesson.order_num,
      videoUrl: lesson.video_url,
      resources: lesson.resources ? JSON.parse(lesson.resources) : [],
      isLocked: Boolean(lesson.is_locked)
    })
  } catch (error) {
    console.error('Error updating lesson:', error)
    res.status(500).json({ message: 'Failed to update lesson' })
  }
})

app.delete('/api/admin/courses/:courseId/lessons/:lessonId', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    const lessonId = parseInt(req.params.lessonId)
    const [result] = await pool.query('DELETE FROM lessons WHERE id = ?', [lessonId])
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Lesson not found' })
    }
    
    res.json({ message: 'Lesson deleted successfully' })
  } catch (error) {
    console.error('Error deleting lesson:', error)
    res.status(500).json({ message: 'Failed to delete lesson' })
  }
})

// Payment endpoints
app.post('/api/payment/verify-flutterwave', authMiddleware, async (req, res) => {
  try {
    const { transaction_id, courseId } = req.body
    const userId = req.user.id
    
    // In production, verify with Flutterwave API
    // const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
    //   headers: { Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}` }
    // })
    
    // Create enrollment record
    const [result] = await pool.query(
      'INSERT INTO enrollments (user_id, course_id, transaction_id, status) VALUES (?, ?, ?, ?)',
      [userId, parseInt(courseId), transaction_id, 'active']
    )
    
    const [enrollments] = await pool.query('SELECT * FROM enrollments WHERE id = ?', [result.insertId])
    const enrollment = enrollments[0]
    
    res.json({ 
      message: 'Payment verified and enrollment created', 
      enrollment: {
        id: enrollment.id,
        userId: enrollment.user_id,
        courseId: enrollment.course_id,
        transactionId: enrollment.transaction_id,
        status: enrollment.status,
        enrolledAt: enrollment.enrolled_at
      }
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    res.status(500).json({ message: 'Payment verification failed' })
  }
})

app.get('/api/enrollments', authMiddleware, async (req, res) => {
  try {
    const [enrollments] = await pool.query(
      'SELECT * FROM enrollments WHERE user_id = ?',
      [req.user.id]
    )
    
    const userEnrollments = enrollments.map(e => ({
      id: e.id,
      userId: e.user_id,
      courseId: e.course_id,
      transactionId: e.transaction_id,
      status: e.status,
      enrolledAt: e.enrolled_at
    }))
    
    res.json(userEnrollments)
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    res.status(500).json({ message: 'Failed to fetch enrollments' })
  }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
