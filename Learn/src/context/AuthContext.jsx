import React, { createContext, useContext, useState, useEffect } from 'react'

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
    const token = localStorage.getItem('ecoswarm_token')
    const userData = localStorage.getItem('ecoswarm_user')
    
    if (token && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
    
    setIsLoading(false)
  }, [])

  const login = (userData, token) => {
    localStorage.setItem('ecoswarm_token', token)
    localStorage.setItem('ecoswarm_user', JSON.stringify(userData))
    setIsAuthenticated(true)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('ecoswarm_token')
    localStorage.removeItem('ecoswarm_user')
    setIsAuthenticated(false)
    setUser(null)
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