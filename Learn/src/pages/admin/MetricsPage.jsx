import React, { useEffect, useState } from 'react'
import GrassBlurCard from '../../components/GrassBlurCard'

function MetricsPage() {
  const [metrics, setMetrics] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('ecoswarm_token')
        const res = await fetch('http://localhost:3001/api/admin/metrics', { headers: { Authorization: `Bearer ${token}` } })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.message || 'Failed to fetch metrics')
        setMetrics(data)
      } catch (e) {
        setError(e.message)
      }
    }
    load()
  }, [])

  return (
    <div className="space-y-6">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GrassBlurCard>
          <div className="text-sm text-emerald-700">Users</div>
          <div className="text-3xl font-bold text-emerald-900">{metrics?.users ?? '—'}</div>
        </GrassBlurCard>
        <GrassBlurCard>
          <div className="text-sm text-emerald-700">Notifications</div>
          <div className="text-3xl font-bold text-emerald-900">{metrics?.notifications ?? '—'}</div>
        </GrassBlurCard>
        <GrassBlurCard>
          <div className="text-sm text-emerald-700">Sensor Messages</div>
          <div className="text-3xl font-bold text-emerald-900">{metrics?.sensorMessages ?? '—'}</div>
        </GrassBlurCard>
        <GrassBlurCard>
          <div className="text-sm text-emerald-700">Projects</div>
          <div className="text-3xl font-bold text-emerald-900">{metrics?.projects ?? '—'}</div>
        </GrassBlurCard>
        <GrassBlurCard>
          <div className="text-sm text-emerald-700">Activities</div>
          <div className="text-3xl font-bold text-emerald-900">{metrics?.activities ?? '—'}</div>
        </GrassBlurCard>
      </div>
    </div>
  )
}

export default MetricsPage


