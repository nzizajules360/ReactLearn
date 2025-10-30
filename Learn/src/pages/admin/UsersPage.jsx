import React, { useEffect, useState } from 'react'
import GrassBlurCard from '../../components/GrassBlurCard'

function UsersPage() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(0)

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('ecoswarm_token')
        const res = await fetch('http://localhost:3001/api/users', { headers: { Authorization: `Bearer ${token}` } })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.message || 'Failed to fetch users')
        setUsers(Array.isArray(data) ? data : [])
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const updateRole = async (id, role) => {
    try {
      setSavingId(id)
      const token = localStorage.getItem('ecoswarm_token')
      const res = await fetch(`http://localhost:3001/api/admin/users/${id}/role`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Failed to update role')
      setUsers(prev => prev.map(u => u.id === id ? { ...u, role: data.role || role } : u))
    } catch (e) {
      setError(e.message)
    } finally {
      setSavingId(0)
    }
  }

  const resetPassword = async (id) => {
    const newPassword = window.prompt('Enter a new temporary password (leave blank to auto-generate):', '')
    try {
      setSavingId(id)
      const token = localStorage.getItem('ecoswarm_token')
      const res = await fetch(`http://localhost:3001/api/admin/users/${id}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ newPassword: newPassword || undefined })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Failed to reset password')
      const shown = newPassword || data?.tempPassword
      if (shown) alert(`Temporary password: ${shown}`)
    } catch (e) {
      setError(e.message)
    } finally {
      setSavingId(0)
    }
  }

  return (
    <div className="space-y-6">
      <GrassBlurCard>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-emerald-900">Users</h2>
          <div className="text-sm text-emerald-700">{users.length} total</div>
        </div>
        {loading && <div className="text-emerald-700">Loading...</div>}
        {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl">{error}</div>}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border border-emerald-200 rounded-xl overflow-hidden">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-4 py-2 text-emerald-900">ID</th>
                  <th className="px-4 py-2 text-emerald-900">Name</th>
                  <th className="px-4 py-2 text-emerald-900">Email</th>
                  <th className="px-4 py-2 text-emerald-900">Role</th>
                  <th className="px-4 py-2 text-emerald-900">Created</th>
                  <th className="px-4 py-2 text-emerald-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-t border-emerald-100">
                    <td className="px-4 py-2 text-emerald-900">{u.id}</td>
                    <td className="px-4 py-2 text-emerald-900">{u.name}</td>
                    <td className="px-4 py-2 text-emerald-700">{u.email}</td>
                    <td className="px-4 py-2">
                      <select
                        className="border border-emerald-200 rounded-lg px-2 py-1 text-emerald-900 bg-white"
                        value={u.role}
                        onChange={(e) => updateRole(u.id, e.target.value)}
                        disabled={savingId === u.id}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 text-emerald-700">{new Date(u.created_at).toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => resetPassword(u.id)}
                        disabled={savingId === u.id}
                        className="px-3 py-1 rounded-lg border border-emerald-300 text-emerald-900 hover:bg-emerald-50"
                      >
                        Reset Password
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GrassBlurCard>
    </div>
  )
}

export default UsersPage


