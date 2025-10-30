import React, { useEffect, useState } from 'react'
import GrassBlurCard from '../../components/GrassBlurCard'

function ReportsPage() {
  const [reports, setReports] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('ecoswarm_token')
        const res = await fetch('http://localhost:3001/api/admin/reports', { headers: { Authorization: `Bearer ${token}` } })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.message || 'Failed to fetch reports')
        setReports(Array.isArray(data) ? data : [])
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
        <h2 className="text-xl font-bold text-emerald-900 mb-4">All Reports</h2>
        {loading && <div className="text-emerald-700">Loading...</div>}
        {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl">{error}</div>}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border border-emerald-200 rounded-xl overflow-hidden">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-4 py-2 text-emerald-900">ID</th>
                  <th className="px-4 py-2 text-emerald-900">User</th>
                  <th className="px-4 py-2 text-emerald-900">Name</th>
                  <th className="px-4 py-2 text-emerald-900">Created</th>
                </tr>
              </thead>
              <tbody>
                {reports.map(r => (
                  <tr key={r.id} className="border-t border-emerald-100">
                    <td className="px-4 py-2 text-emerald-900">{r.id}</td>
                    <td className="px-4 py-2 text-emerald-900">{r.user_name} (#{r.user_id})</td>
                    <td className="px-4 py-2 text-emerald-900">{r.name}</td>
                    <td className="px-4 py-2 text-emerald-700">{new Date(r.created_at).toLocaleString()}</td>
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

export default ReportsPage


