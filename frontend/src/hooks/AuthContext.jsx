// ================ Start AuthContext ================
// ? login() → authService → rokkru_token for mentor API

import { createContext, useContext, useState, useCallback } from 'react'
import { isApiEnabled } from '@/constants/env'
import { login as apiLogin, logout as apiLogout } from '@/services/authService'

const AuthContext = createContext(null)

const MOCK_USERS = {
  student: { id: '1', user_id: 1, name: 'Alex Johnson', email: 'student@rokkru.com', role: 'student', avatar: null },
  teacher: { id: '2', user_id: 2, name: 'Dr. Phe Sophy', email: 'teacher@rokkru.com', role: 'teacher', avatar: null },
  admin: { id: '3', user_id: 3, name: 'Super Admin', email: 'admin@rokkru.com', role: 'admin', avatar: null },
}

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('rokkru_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser())

  const login = useCallback(async (credentialsOrRole) => {
    if (typeof credentialsOrRole === 'string') {
      const role = credentialsOrRole
      if (isApiEnabled()) {
        throw new Error('Use email and password when API is enabled')
      }
      const u = MOCK_USERS[role] || MOCK_USERS.student
      setUser(u)
      localStorage.setItem('rokkru_user', JSON.stringify(u))
      localStorage.setItem('rokkru_token', 'mock-token')
      return u
    }

    if (isApiEnabled()) {
      const u = await apiLogin(credentialsOrRole)
      setUser(u)
      return u
    }

    const role = credentialsOrRole.role || 'student'
    const u = MOCK_USERS[role] || MOCK_USERS.student
    setUser(u)
    localStorage.setItem('rokkru_user', JSON.stringify(u))
    localStorage.setItem('rokkru_token', 'mock-token')
    return u
  }, [])

  const logout = useCallback(async () => {
    await apiLogout()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
