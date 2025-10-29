import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import NotFound from './components/NotFound.jsx'
import Footer from './components/Footer.jsx'
import PricingPage from './pages/PricingPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import FeaturesPage from './pages/FeaturesPage.jsx'
import StartFreeTrial from './pages/StartFreeTrial.jsx'
import ScheduleDemo from './pages/ScheduleDemo.jsx'

// Dashboard Components
import DashboardLayout from './pages/dashboard/DashboardLayout.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import ProfilePage from './pages/dashboard/ProfilePage.jsx'
import SettingsPage from './pages/dashboard/SettingsPage.jsx'
import AssistantPage from './pages/dashboard/AssistantPage.jsx'

// Auth Context
import { useAuth } from './context/AuthContext.jsx'

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-lg animate-spin"></div>
          </div>
          <p className="text-emerald-700 font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Public Route Component (Redirect to dashboard if already authenticated)
function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-lg animate-spin"></div>
          </div>
          <p className="text-emerald-700 font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Navbar & Footer */}
        <Route path="/" element={
          <>
            <Navbar />
            <LandingPage />
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <AboutPage />
            <Footer />
          </>
        } />
        <Route path="/features" element={
          <>
            <Navbar />
            <FeaturesPage />
            <Footer />
          </>
        } />
        <Route path="/pricing" element={
          <>
            <Navbar />
            <PricingPage />
            <Footer />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <ContactPage />
            <Footer />
          </>
        } />
        <Route path="/free-trial" element={
          <>
            <Navbar />
            <StartFreeTrial />
            <Footer />
          </>
        } />
        <Route path="/schedule-demo" element={
          <>
            <Navbar />
            <ScheduleDemo />
            <Footer />
          </>
        } />

        {/* Auth Routes - Only accessible when NOT logged in */}
        <Route path="/login" element={
          <PublicRoute>
            <Navbar/> 
            <LoginPage />
            <Footer />
          </PublicRoute>
        } />

        {/* Protected Dashboard Routes - Only accessible when logged in */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="assistant" element={<AssistantPage />} />
          <Route path="settings" element={<SettingsPage />} />
          {/* Add other dashboard routes here as you create them */}
          <Route path="analytics" element={<div className="p-8"><h1 className="text-2xl font-bold text-emerald-900">Analytics Page - Coming Soon</h1></div>} />
          <Route path="projects" element={<div className="p-8"><h1 className="text-2xl font-bold text-emerald-900">Projects Page - Coming Soon</h1></div>} />
          <Route path="reports" element={<div className="p-8"><h1 className="text-2xl font-bold text-emerald-900">Reports Page - Coming Soon</h1></div>} />
          <Route path="team" element={<div className="p-8"><h1 className="text-2xl font-bold text-emerald-900">Team Page - Coming Soon</h1></div>} />
          <Route path="calendar" element={<div className="p-8"><h1 className="text-2xl font-bold text-emerald-900">Calendar Page - Coming Soon</h1></div>} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App