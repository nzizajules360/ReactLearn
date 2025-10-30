import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-200 p-3 mb-6">
          <div className="flex items-center justify-between mb-2 px-2">
            <h1 className="text-xl font-bold text-emerald-900">Admin</h1>
            <span className="text-sm text-emerald-700">Full access</span>
          </div>
          <nav className="flex flex-wrap gap-2">
            {[
              { to: '/admin', label: 'Overview', end: true },
              { to: '/admin/users', label: 'Users' },
              { to: '/admin/reports', label: 'Reports' },
              { to: '/admin/notifications', label: 'Notifications' },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-lime-500 to-emerald-600 text-white shadow-lg'
                      : 'text-emerald-700 hover:bg-emerald-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout


