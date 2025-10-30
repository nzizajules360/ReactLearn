import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'ecoswarm'
} = process.env

export const pool = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export async function initDb() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD
  })

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``)
  await connection.end()

  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    phone VARCHAR(50) DEFAULT '',
    location VARCHAR(255) DEFAULT '',
    department VARCHAR(255) DEFAULT '',
    bio TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`)

  await pool.query(`CREATE TABLE IF NOT EXISTS dashboard_metrics (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    change_percent DECIMAL(10,2) NOT NULL,
    trend ENUM('up','down') NOT NULL,
    color VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`)

  await pool.query(`CREATE TABLE IF NOT EXISTS projects (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    progress INT NOT NULL DEFAULT 0,
    status ENUM('on-track','needs-attention','at-risk','completed') NOT NULL DEFAULT 'on-track',
    members INT NOT NULL DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`)

  await pool.query(`CREATE TABLE IF NOT EXISTS activities (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    action VARCHAR(255) NOT NULL,
    project VARCHAR(255) NOT NULL,
    type ENUM('success','info','warning') NOT NULL DEFAULT 'info',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`)

  await pool.query(`CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`)

  await pool.query(`CREATE TABLE IF NOT EXISTS sensor_messages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    topic VARCHAR(255) NOT NULL,
    payload JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_created_at (user_id, created_at)
  )`)

  await pool.query(`CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    is_read TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_read_created (user_id, is_read, created_at)
  )`)

  await pool.query(`CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    status ENUM('todo','in-progress','done') NOT NULL DEFAULT 'todo',
    priority ENUM('low','medium','high') NOT NULL DEFAULT 'medium',
    due_date DATE DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_status_due (user_id, status, due_date)
  )`)

  await pool.query(`CREATE TABLE IF NOT EXISTS dashboard_widgets (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    layout JSON NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uniq_user (user_id)
  )`)

  await pool.query(`CREATE TABLE IF NOT EXISTS reports (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    config JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_created (user_id, created_at)
  )`)

  // add avatar_url column if missing
  try {
    await pool.query(`ALTER TABLE users ADD COLUMN avatar_url VARCHAR(1024) DEFAULT NULL`)
  } catch (_) {}
}

export async function seedDashboardForUser(userId) {
  // Only seed if empty
  const [rows] = await pool.query('SELECT id FROM dashboard_metrics WHERE user_id = ? LIMIT 1', [userId])
  if (rows.length > 0) return

  await pool.query(
    `INSERT INTO dashboard_metrics (user_id, name, value, change_percent, trend, color) VALUES 
     (?, 'Carbon Emissions', '45.2 tCO₂e', -15.2, 'down', 'emerald'),
     (?, 'Energy Consumption', '12.8 MWh', -8.5, 'down', 'green'),
     (?, 'Waste Reduction', '28%', 12.3, 'up', 'lime'),
     (?, 'Water Usage', '45 m³', -5.7, 'down', 'teal')`,
    [userId, userId, userId, userId]
  )

  await pool.query(
    `INSERT INTO projects (user_id, name, progress, status, members) VALUES 
     (?, 'Office Energy Efficiency', 85, 'on-track', 5),
     (?, 'Supply Chain Optimization', 60, 'needs-attention', 8),
     (?, 'Renewable Energy Transition', 45, 'at-risk', 12),
     (?, 'Waste Management Program', 95, 'completed', 6)`,
    [userId, userId, userId, userId]
  )

  await pool.query(
    `INSERT INTO activities (user_id, action, project, type) VALUES 
     (?, 'Carbon offset purchased', 'Reforestation Brazil', 'success'),
     (?, 'Energy report generated', 'Monthly Analytics', 'info'),
     (?, 'New team member added', 'Sustainability Team', 'success'),
     (?, 'Carbon threshold alert', 'Manufacturing Plant', 'warning')`,
    [userId, userId, userId, userId]
  )
}


