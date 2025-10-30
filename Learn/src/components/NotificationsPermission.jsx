import React, { useEffect, useState } from 'react'
import GrassBlurCard from './GrassBlurCard'

function NotificationsPermission() {
  const [status, setStatus] = useState(Notification?.permission || 'default')

  useEffect(() => {
    setStatus(Notification?.permission || 'default')
  }, [])

  const request = async () => {
    try {
      if (!('Notification' in window)) return
      const result = await Notification.requestPermission()
      setStatus(result)
      if (result === 'granted') {
        new Notification('Notifications enabled', { body: 'You will receive alerts on this device.' })
      }
    } catch {}
  }

  if (!('Notification' in window) || status === 'granted') return null

  return (
    <div className="my-4">
      <GrassBlurCard>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-emerald-900 font-semibold">Enable Device Notifications</div>
            <div className="text-emerald-700 text-sm">Allow notifications to receive important updates.</div>
          </div>
          <button onClick={request} className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700">Enable</button>
        </div>
      </GrassBlurCard>
    </div>
  )
}

export default NotificationsPermission


