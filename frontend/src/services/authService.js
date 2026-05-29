// ================ Start auth service ================
// ? Login sets localStorage rokkru_token → mentor protected routes (auth.js)

import { apiRequest, isApiEnabled } from './api'
import { ENDPOINTS as API_ENDPOINTS } from './endpoints'

const ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  me: '/auth/me',
}

function unwrapData(json) {
  if (json && json.success === true && json.data) return json.data
  return json
}

function mapAuthUser(data, roleHint = 'student') {
  const payload = unwrapData(data)
  const user = payload.user ?? payload
  const mentor = payload.mentor
  const name = mentor
    ? `${mentor.firstname || ''} ${mentor.lastname || ''}`.trim()
    : user.name || user.email?.split('@')[0] || 'User'

  let role = roleHint
  if (mentor) role = 'teacher'
  if (user.role) role = user.role

  const uid = user.user_id ?? user.id

  return {
    id: String(uid),
    user_id: uid,
    name,
    email: user.email,
    role,
    mentor,
  }
}

export async function login(credentials) {
  if (!isApiEnabled()) throw new Error('Backend API is required for authentication.')
  const raw = await apiRequest(ENDPOINTS.login, {
    method: 'POST',
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  })
  const data = unwrapData(raw)
  const token = data.token ?? raw.token
  if (token) localStorage.setItem('rokkru_token', token)
  const mapped = mapAuthUser(data, credentials.role)
  localStorage.setItem('rokkru_user', JSON.stringify(mapped))
  return mapped
}

export async function register(data) {
  if (!isApiEnabled()) throw new Error('Backend API is required for registration.')
  const body = {
    email: data.email,
    password: data.password,
    user_type_id: data.user_type_id,
  }
  if (data.role === 'teacher' || data.mentorProfile) {
    body.mentorProfile = data.mentorProfile ?? {
      firstname: data.firstName ?? data.firstname ?? 'Mentor',
      lastname: data.lastName ?? data.lastname ?? 'User',
      experience_years: 0,
    }
  }
  const raw = await apiRequest(ENDPOINTS.register, {
    method: 'POST',
    body: JSON.stringify(body),
  })
  const res = unwrapData(raw)
  const token = res.token ?? raw.token
  if (token) localStorage.setItem('rokkru_token', token)
  const mapped = mapAuthUser(res, data.role)
  localStorage.setItem('rokkru_user', JSON.stringify(mapped))
  return mapped
}

export async function fetchCurrentUser() {
  if (!isApiEnabled()) throw new Error('Backend API is required to fetch current user.')
  const raw = await apiRequest(ENDPOINTS.me)
  return mapAuthUser(unwrapData(raw))
}

export async function logout() {
  if (isApiEnabled()) {
    try { await apiRequest(ENDPOINTS.logout, { method: 'POST' }) } catch { /* ignore */ }
  }
  localStorage.removeItem('rokkru_token')
  localStorage.removeItem('rokkru_user')
}

export async function requestForgotPasswordOtp(email) {
  return apiRequest(API_ENDPOINTS.auth.forgotPasswordRequestOtp, {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

export async function verifyForgotPasswordOtp(payload) {
  return apiRequest(API_ENDPOINTS.auth.forgotPasswordVerifyOtp, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function resetPasswordWithOtp(payload) {
  return apiRequest(API_ENDPOINTS.auth.forgotPasswordReset, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
// ================ End auth service ================
