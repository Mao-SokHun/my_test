import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const MOCK_USERS = {
  student: { id: '1', name: 'Alex Johnson', email: 'student@rokkru.com', role: 'student', avatar: null },
  teacher: { id: '2', name: 'Dr. Phe Sophy',  email: 'teacher@rokkru.com', role: 'teacher', avatar: null },
  admin:   { id: '3', name: 'Super Admin',     email: 'admin@rokkru.com',   role: 'admin',   avatar: null },
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

  const login = useCallback((role) => {
    const u = MOCK_USERS[role] || MOCK_USERS.student
    setUser(u)
    localStorage.setItem('rokkru_user', JSON.stringify(u))
    return u
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('rokkru_user')
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
