import React, { useEffect, useState } from 'react'
import GrassBlurCard from '../../components/GrassBlurCard'
import { useAuth } from '../../context/AuthContext'

function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ users: 0 })
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('ecoswarm_token')
        const res = await fetch('http://localhost:3001/api/users', { headers: { Authorization: `Bearer ${token}` } })
        if (!res.ok) throw new Error('Failed to fetch users')
        const list = await res.json()
        setStats({ users: Array.isArray(list) ? list.length : 0 })
      } catch (e) {
        setError(e.message)
      }
    }
    load()
  }, [])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GrassBlurCard>
          <div className="text-sm text-emerald-700">Total Users</div>
          <div className="text-3xl font-bold text-emerald-900">{stats.users}</div>
        </GrassBlurCard>
        <GrassBlurCard>
          <div className="text-sm text-emerald-700">Role</div>
          <div className="text-3xl font-bold text-emerald-900">{user?.role || 'user'}</div>
        </GrassBlurCard>
        <GrassBlurCard>
          <div className="text-sm text-emerald-700">System</div>
          <div className="text-3xl font-bold text-emerald-900">Healthy</div>
        </GrassBlurCard>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">{error}</div>
      )}

      <GrassBlurCard>
        <div className="flex flex-wrap gap-3">
          <a href="/admin/users" className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700">Manage Users</a>
          <a href="/dashboard/reports" className="px-4 py-2 bg-lime-500 text-emerald-900 rounded-xl hover:bg-lime-400">View Reports</a>
          <a href="/admin/notifications" className="px-4 py-2 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl hover:bg-emerald-50">Notifications</a>
        </div>
      </GrassBlurCard>
    </div>
  )
}

export default AdminDashboard


