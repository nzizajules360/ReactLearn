import React from 'react'
import { Outlet } from 'react-router-dom'
import ChatSidebar from '../../components/chat/ChatSidebar'
import Navbar from '../../components/Navbar'

function ChatLayout() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white rounded-2xl shadow-lg border border-emerald-200 h-[75vh] overflow-hidden">
            <ChatSidebar />
          </div>
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg border border-emerald-200 h-[75vh] overflow-hidden p-3">
            <Outlet />
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default ChatLayout


