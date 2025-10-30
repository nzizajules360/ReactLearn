import React, { useEffect, useState } from 'react'
import GrassBlurCard from '../../components/GrassBlurCard'

function UsersPage() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

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
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-t border-emerald-100">
                    <td className="px-4 py-2 text-emerald-900">{u.id}</td>
                    <td className="px-4 py-2 text-emerald-900">{u.name}</td>
                    <td className="px-4 py-2 text-emerald-700">{u.email}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${u.role === 'admin' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-lime-100 text-lime-800 border-lime-300'}`}>{u.role}</span>
                    </td>
                    <td className="px-4 py-2 text-emerald-700">{new Date(u.created_at).toLocaleString()}</td>
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


