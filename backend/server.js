import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool, initDb, seedDashboardForUser } from './db.js'
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me'

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

await initDb()
const genAI = process.env.GOOGLE_API_KEY ? new GoogleGenerativeAI(process.env.GOOGLE_API_KEY) : null

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
  const { name, email, password, location = '', department = '', bio = '', phone = '' } = req.body || {}
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' })
  const passwordHash = await bcrypt.hash(password, 10)
  try {
    await pool.query(
      'INSERT INTO users (name, email, password_hash, role, phone, location, department, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email.toLowerCase(), passwordHash, 'user', phone, location, department, bio]
    )
    return res.status(201).json({ message: 'Registered successfully' })
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
  const [rows] = await pool.query('SELECT id, name, email, role, phone, location, department, bio FROM users WHERE id = ? LIMIT 1', [req.user.id])
  if (!rows || rows.length === 0) return res.status(404).json({ message: 'User not found' })
  const u = rows[0]
  return res.json({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    profile: { phone: u.phone || '', location: u.location || '', department: u.department || '', bio: u.bio || '' }
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

// --- AI Assistant (Gemini) ---
app.post('/api/ai/chat', authMiddleware, async (req, res) => {
  if (!genAI) return res.status(500).json({ message: 'AI not configured' })
  const { messages = [], system = 'You are an assistant that helps users manage sustainability activities and dashboards. Be concise and actionable.' } = req.body || {}
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const history = messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content || '' }] }))
    const promptParts = [
      { text: `User: ${JSON.stringify({ id: req.user.id, email: req.user.email, name: req.user.name })}` },
      { text: `Instruction: ${system}` },
    ]
    const result = await model.generateContent({ contents: [...promptParts, ...history] })
    const text = result.response.text()
    return res.json({ reply: text })
  } catch (e) {
    return res.status(500).json({ message: 'AI request failed' })
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

