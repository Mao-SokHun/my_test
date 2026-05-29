// ================ Start AuthContext ================
// ? login() → authService → rokkru_token for mentor API

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { login as apiLogin, logout as apiLogout, fetchCurrentUser } from '@/services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const bootstrap = async () => {
      try {
        const token = localStorage.getItem('rokkru_token')
        if (!token) return
        const currentUser = await fetchCurrentUser()
        if (!cancelled) setUser(currentUser)
      } catch {
        localStorage.removeItem('rokkru_token')
        localStorage.removeItem('rokkru_user')
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setAuthLoading(false)
      }
    }

    bootstrap()
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (credentialsOrRole) => {
    if (typeof credentialsOrRole === 'string') throw new Error('Role-only login is not supported')

    const u = await apiLogin(credentialsOrRole)
    setUser(u)
    return u
  }, [])

  const logout = useCallback(async () => {
    await apiLogout()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
