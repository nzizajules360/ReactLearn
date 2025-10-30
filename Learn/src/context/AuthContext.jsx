import React, { createContext, useContext, useState, useEffect } from 'react'
import { authCookies } from '../utils/cookies'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in on app start
    // Try cookies first, then localStorage for backward compatibility
    let token = authCookies.getToken() || localStorage.getItem('ecoswarm_token') || localStorage.getItem('token')
    let userData = authCookies.getUser()
    
    if (!userData) {
      const localData = localStorage.getItem('ecoswarm_user') || localStorage.getItem('user')
      if (localData) {
        try {
          userData = JSON.parse(localData)
        } catch (error) {
          console.error('Error parsing user data:', error)
        }
      }
    }
    
    if (token && userData) {
      setIsAuthenticated(true)
      setUser(userData)
      console.log('User authenticated from storage/cookies:', userData)
    }
    
    setIsLoading(false)
  }, [])

  const login = (userData, token) => {
    // Store in both localStorage and cookies for maximum compatibility
    localStorage.setItem('ecoswarm_token', token)
    localStorage.setItem('ecoswarm_user', JSON.stringify(userData))
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    
    // Also store in cookies
    authCookies.setToken(token)
    authCookies.setUser(userData)
    
    setIsAuthenticated(true)
    setUser(userData)
    console.log('User logged in successfully:', userData)
  }

  const logout = () => {
    // Clear both localStorage and cookies
    localStorage.removeItem('ecoswarm_token')
    localStorage.removeItem('ecoswarm_user')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    authCookies.clearAuth()
    
    setIsAuthenticated(false)
    setUser(null)
    console.log('User logged out successfully')
  }

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}