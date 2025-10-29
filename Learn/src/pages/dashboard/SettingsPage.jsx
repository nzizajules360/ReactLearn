import React, { useState } from 'react'

function SettingsPage() {
  const [telemetry, setTelemetry] = useState(true)
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-200">
        <h1 className="text-2xl font-bold text-emerald-900 mb-6">Settings</h1>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <div>
              <div className="font-semibold text-emerald-900">IoT Telemetry</div>
              <div className="text-sm text-emerald-600">Allow live IoT feed updates on dashboard</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={telemetry} onChange={(e) => setTelemetry(e.target.checked)} />
              <div className="w-11 h-6 bg-emerald-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-emerald-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <div>
              <div className="font-semibold text-emerald-900">Notifications</div>
              <div className="text-sm text-emerald-600">Receive alerts and updates</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
              <div className="w-11 h-6 bg-emerald-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-emerald-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage


