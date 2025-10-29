import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-200 p-3 mb-6">
          <nav className="flex flex-wrap gap-2">
            {[
              { to: '/dashboard', label: 'Overview', end: true },
              { to: '/dashboard/profile', label: 'Profile' },
              { to: '/dashboard/settings', label: 'Settings' },
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

export default DashboardLayout